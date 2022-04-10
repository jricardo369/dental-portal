import { Component, Output, EventEmitter, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { ClaseGasto } from '../../../model/clase-gasto';
import { TipoGasto } from '../../../model/tipo-gasto';
import { SessionService } from '../../services/session.service';
import { UtilService } from '../../services/util.service';
import { Usuario } from '../../../model/usuario';
import { MatDialog } from '@angular/material/dialog';
import { DialogoSimpleComponent } from '../../common/dialogo-simple/dialogo-simple.component';
import { GastoCaja } from '../../../model/gasto-caja';
import { CajasChicasService } from '../../services/cajas-chicas.service';
import { GastosCajasService } from '../../services/gastos-cajas.service';
import { GastoDeSolicitudDeContabilizacionDeCajaChica } from '../../../model/gasto-de-solicitud-de-contabilizacion-de-caja-chica';
import { CFDI } from '../../../util/cfdi';

@Component({
    selector: 'app-gasto-solicitud-caja-chica-form',
    templateUrl: './gasto-solicitud-caja-chica-form.component.html',
    styleUrls: ['./gasto-solicitud-caja-chica-form.component.scss']
})
export class GastoSolicitudCajaChicaFormComponent implements OnInit {

    @Input("id")
    id: number = null;

    @Input("sociedad")
    sociedad: string = null;

    @Input("creando")
    creando: boolean = false;

    usuario: Usuario;
    gastosCaja: GastoCaja[] = [];

    operacion: GastoCaja = null;

    gasto = new GastoDeSolicitudDeContabilizacionDeCajaChica();

    constructor(
        private dialog: MatDialog,
        private sessionService: SessionService,
        private gastosCajasService: GastosCajasService,
        private cajasChicasService: CajasChicasService,
        private utilService: UtilService,
    ) {

        // this.gasto.moneda = 'MXN'; // por default no?
        this.gasto.subtotal = 0;
        this.gasto.totalFactura = 0;
        this.gasto.ieps = 0;
        this.gasto.iva = 0;
        this.gasto.isr = 0;
        this.gasto.ish = 0;
        this.gasto.tua = 0;

        this.sessionService
            .getUsuario()
            .then(usuario => {
                this.usuario = usuario;
                this.actualizarGastosCaja()
            }).catch(reason => this.utilService.manejarError(reason))

        console.log("ONINIT: " + this.noTrayecto);
    }

    // -------------------------------------------------------------------------------------------------

    operacionContableSeleccionada() {
        if (!this.operacion) return;
        if (!(this.operacion.deducibleImpuestos)) this.gasto.iva = 0;
        if (!(this.operacion.deducibleImpuestos && this.operacion.cuentaContableISR)) this.gasto.isr = 0;
        if (!(this.operacion.deducibleImpuestos && this.operacion.cuentaContableISH)) this.gasto.ish = 0;
        if (!(this.operacion.deducibleImpuestos && this.operacion.cuentaContableTUA)) this.gasto.tua = 0;
        if (!(this.operacion.deducibleImpuestos && this.operacion.cuentaContableIEPS)) this.gasto.ieps = 0;
        if (!(this.operacion.deducibleImpuestos)) this.xmlFile = null;
        this.actualizarTotal();
    }

    actualizarGastosCaja() {
        this.loading = true;
        this.gastosCajasService
            .obtenerGastosCajas(this.sociedad, true)
            .then(gastos => this.gastosCaja = gastos)
            .catch(err => this.utilService.manejarError(err))
            .then(e => this.loading = false);
    }

    puedeEnviarse() {
        if (this.loading) return false;

        // OBLIGATORIOS
        if (!this.operacion) return false;

        if (!this.gasto.texto) return false;
        if (!this.gasto.asignacion) return false;

        // SOLO UNO DE LOS TRES
        if (!this.soloUnoDeCecoPepGrafo()) return false;

        // EL GRAFO DEBE VENIR CON SU OPERACION GRAFO
        if (!this.isEmptyOrNull(this.gasto.grafo) && this.isEmptyOrNull(this.gasto.operacionGrafo)) return false;

        // DEDUCIBLE OBLIGA XML
        if (this.operacion.deducibleImpuestos && !this.xmlFile) return false;

        // PDF SIEMPRE
        return this.pdfFile;
    }

    soloUnoDeCecoPepGrafo() {
        let cecoPepGrafo = 0;
        if (!this.isEmptyOrNull(this.gasto.centroDeCosto)) cecoPepGrafo += 1;
        if (!this.isEmptyOrNull(this.gasto.elementoPep)) cecoPepGrafo += 1;
        if (!this.isEmptyOrNull(this.gasto.grafo)) cecoPepGrafo += 1;
        return cecoPepGrafo == 1;
    }

    isEmptyOrNull(text: string) {
        if (!text) return true;
        return ("" + text.trim()).length == 0;
    }

    onXmlFileSelected(files: FileList) {
        this.xmlFile = files.length ? files.item(0) : null;
        if (this.xmlFile) {
            this.loading = true;
            CFDI.parseFile(this.xmlFile)
                .then(cfdi => {
                    this.gasto.importe = cfdi.Total;
                    this.gasto.totalFactura = cfdi.Total;
                    this.gasto.subtotal = cfdi.SubTotal;
                    this.gasto.iva = cfdi.TotalIvaTrasladado;
                    // this.gasto.ieps = cfdi.
                    // this.gasto.isr = cfdi.
                    // this.gasto.tua = cfdi.
                    // this.gasto.ish = cfdi.
                })
                .catch(err => this.utilService.manejarError(err))
                .then(e => this.loading = false);
        }
    }

    onPdfFileSelected(files: FileList) { this.pdfFile = files.length ? files.item(0) : null; }

    // -------------------------------------------------------------------------------------------------


    @Input("noTrayecto")
    noTrayecto: number;

    @Input("idComprobante")
    idComprobante: number;

    @Input('readOnly')
    readOnly: boolean;

    @Input('disableLoading')
    disableLoading: boolean;

    @Input("ocultarSeccionesDeDialogo")
    ocultarSeccionesDeDialogo: boolean = false;

    @Input("autorizando")
    autorizando: boolean = false;

    @Output()
    onCancelar: EventEmitter<any> = new EventEmitter();

    @Output()
    onEnviar: EventEmitter<any> = new EventEmitter();

    // @ViewChild('selectDeTipoGasto')   selectDeTipoGasto: ElementRef<HTMLSelectElement>;

    loading = false;

    tiposDeGasto: TipoGasto[] = [];
    clasesDeGasto: ClaseGasto[] = [];



    xmlFile: File;
    pdfFile: File;

    ngOnInit(): void {
        console.log("ONINIT: " + this.noTrayecto);
    }

    actualizarTotal() {
        this.gasto.totalFactura
            = this.gasto.subtotal
            + this.gasto.iva
            + this.gasto.isr
            + this.gasto.ieps
            + this.gasto.tua
            + this.gasto.ish
            ;

        this.gasto.totalFactura = Math.floor(this.gasto.totalFactura * 100) / 100;
    }

    cancelar() { this.onCancelar.emit(); }

    autorizar() { this.actualizarEstatus('Aprobado'); }

    rechazar() { this.actualizarEstatus('Rechazado') }

    actualizarEstatus(estatus: string) {

        let verbo = (estatus == 'Aprobado' ? 'Aprobar' : 'Rechazar');

        let dialogRef = this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: verbo + ' comprobante',
                texto: 'Esta a punto de cambiar el estatus del viaje y cualquier valor que haya cambiado del comprobante',
                botones: [
                    { texto: 'Cancelar' },
                    { texto: verbo + ' comprobante', color: verbo == 'Aprobar' ? 'accent' : 'primary', valor: 'ok' },
                ]
            },
            disableClose: false,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'ok') {
                /*
                                this.loading = true;
                                this.viajesService.actualizarEstatusComprobante(this.noTrayecto, this.idComprobante, estatus, this.gasto.subtotal,
                                    this.gasto.iva, this.gasto.isr, this.gasto.ish, this.gasto.ieps, this.gasto.tua, this.gasto.total)
                                    .then(response => {
                                        this.cancelar();
                                    }).catch(reason => {
                                        this.utilService.manejarError(reason)
                                    }).then(() => this.loading = false);
                */
            }
        });
    }

    eliminar(): any {
        let dialogRef = this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Eliminar comprobante',
                texto: 'Esta acción no puede deshacerce ¿Desea eliminar el comprobante ' + this.idComprobante + '?',
                botones: [
                    { texto: 'Cancelar' },
                    { texto: 'Eliminar comprobante', color: 'primary', valor: 'ok' },
                ]
            },
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'ok') {
                /*
                this.loading = true;
                this.viajesService.eliminarComprobante(this.noTrayecto, this.idComprobante).then(response => {
                    this.onCancelar.emit();
                }).catch(reason => {
                    this.utilService.manejarError(reason)
                }).then(() => this.loading = false);
                */
            }
        });
    }

    enviar() {
        let dialogRef = this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Enviar comprobante',
                texto: 'Esta acción no puede deshacerce ¿Desea enviar el comprobante tal como está?',
                botones: [
                    { texto: 'Cancelar' },
                    { texto: 'Enviar comprobante', color: 'accent', valor: 'ok' },
                ]
            },
            disableClose: false,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'ok') {

                this.loading = true;
                this.cajasChicasService.crearGastoDeSolicitud(
                    this.id,
                    {
                        archivopdf: this.pdfFile,
                        archivoxml: this.xmlFile,
                        asignacionGastoCaja: this.gasto.asignacion,
                        cebeGastoCaja: this.gasto.centroDeBeneficio,
                        ceco: this.gasto.centroDeCosto,
                        grafoGastoCaja: this.gasto.grafo,
                        operacionGrafo: this.gasto.operacionGrafo,

                        ieps: this.gasto.ieps,
                        ish: this.gasto.ish,
                        isr: this.gasto.isr,
                        iva: this.gasto.iva,
                        subtotal: this.gasto.subtotal,
                        total: this.gasto.totalFactura,
                        tua: this.gasto.tua,

                        operacionContable: this.operacion.operacion,
                        ordenGastoCaja: this.gasto.orden,
                        pepGastoCaja: this.gasto.elementoPep,
                        textoGastoCaja: this.gasto.texto

                    }
                ).then(response => {
                    this.onEnviar.emit();
                }).catch(reason => {
                    this.utilService.manejarError(reason)
                }).then(() => this.loading = false);

            }
        });
    }

}
