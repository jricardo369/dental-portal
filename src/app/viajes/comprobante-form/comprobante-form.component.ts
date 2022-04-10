import { Component, Output, EventEmitter, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { ClaseGasto } from '../../../model/clase-gasto';
import { TipoGasto } from '../../../model/tipo-gasto';
import { ViajesService } from '../../services/viajes.service';
import { SessionService } from '../../services/session.service';
import { UtilService } from '../../services/util.service';
import { Usuario } from '../../../model/usuario';
import { GastoViaje } from '../../../model/gasto-viaje';
import { MatDialog } from '@angular/material/dialog';
import { DialogoSimpleComponent } from '../../common/dialogo-simple/dialogo-simple.component';
import { Segregacion } from 'src/model/segregacion';

@Component({
    selector: 'app-comprobante-form',
    templateUrl: './comprobante-form.component.html',
    styleUrls: ['./comprobante-form.component.css']
})
export class ComprobanteFormComponent implements OnInit {

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

    @Input('creando')
    creando: boolean;

    segregacionesManuales = false;
    segregaciones = [];

    // @ViewChild('selectDeTipoGasto')   selectDeTipoGasto: ElementRef<HTMLSelectElement>;

    loading = false;

    tiposDeGasto: TipoGasto[] = [];
    clasesDeGasto: ClaseGasto[] = [];
    cecos: string[] = [];

    usuario: Usuario;
    tipoGasto: TipoGasto;
    claseGasto: ClaseGasto;

    gasto: GastoViaje = new GastoViaje();
    xmlFile: File;
    pdfFile: File;

    constructor(
        private dialog: MatDialog,
        private sessionService: SessionService,
        private viajesService: ViajesService,
        private utilService: UtilService,
    ) {

        this.gasto.moneda = 'MXN'; // por default no?
        this.gasto.subtotal = 0;
        this.gasto.total = 0;
        this.gasto.ieps = 0;
        this.gasto.iva = 0;
        this.gasto.isr = 0;
        this.gasto.ish = 0;
        this.gasto.tua = 0;

        this.sessionService
            .getUsuario()
            .then(usuario => {
                this.usuario = usuario;
                this.actualizarCatalogos();
            }).catch(reason => this.utilService.manejarError(reason))

        console.log("CONSTRUCTOR: " + this.noTrayecto);
    }

    ngOnInit(): void {
        console.log("ONINIT: " + this.noTrayecto);
    }

    agregarSegregacion() {
        let options = this.cecos.map(e => {
            return {
                value: e,
                display: e
            };
        });
        let campos = [
            { label: "Centro de costo", placeholder: "Centro de costo", value: "", type: "select", options: options },
            { label: "Importe", placeholder: "Importe", value: 0, type: "number" },
        ];
        this.utilService
            .mostrarDialogoConFormulario("Agregar segregación", "Agregar segregación", "Agregar segregación", "Cancelar", campos)
            .then(e => {
                if (e != 'ok') return;
                let s = {
                    centroCosto: campos[0].value,
                    importeSegregado: campos[1].value
                };
                this.segregaciones.push(s);
            })
            .catch(e => this.utilService.manejarError(e));
    }

    eliminarSegregacion(s) {
        let index = this.segregaciones.findIndex(e => e === s);
        if (index >= 0) this.segregaciones.splice(index, 1);
    }

    sumaDeSegregaciones() {
        return this.segregaciones.map(e => e.importeSegregado).reduce((v0, v1) => v0 + v1, 0);
    }

    actualizarCatalogos() {



        this.loading = true;
        Promise.all([
            this.viajesService.obtenerTiposDeGasto(this.usuario.area.idarea),
            this.viajesService.obtenerCentrosDeCosto()
        ]).then(values => {

            this.tiposDeGasto = values[0];
            this.tiposDeGasto.sort((oa, ob) => {
                let a = oa.id;
                let b = ob.id;
                return b - a;
            });

            this.cecos = values[1];
            this.cecos.sort();

        }).catch(reason => this.utilService.manejarError(reason)).then(() => this.loading = false);

    }

    actualizarClasesDeGasto() {
        this.loading = true;
        this.viajesService
            .obtenerClasesDeGasto(this.tipoGasto.id)
            .then(clasesDeGasto => {
                this.claseGasto = null;
                this.clasesDeGasto = clasesDeGasto;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false);
    }

    seleccionarClaseDeGastoViaje(claseGasto: ClaseGasto) {
        this.claseGasto = claseGasto;
    }

    limpiarValoresDeGastoPorCambioDeClase() {
        if (!this.claseGasto) return;
        if (!(this.claseGasto.deducibleImpuestos)) this.gasto.iva = 0;
        if (!(this.claseGasto.deducibleImpuestos && this.claseGasto.cuentaContableISR)) this.gasto.isr = 0;
        if (!(this.claseGasto.deducibleImpuestos && this.claseGasto.cuentaContableISH)) this.gasto.ish = 0;
        if (!(this.claseGasto.deducibleImpuestos && this.claseGasto.cuentaContableTUA)) this.gasto.tua = 0;
        if (!(this.claseGasto.deducibleImpuestos && this.claseGasto.cuentaContableIEPS)) this.gasto.ieps = 0;
        if (!(this.claseGasto.deducibleImpuestos)) this.xmlFile = null;
        this.actualizarTotal();
    }

    actualizarTotal() {
        this.gasto.total
            = this.gasto.subtotal
            + this.gasto.iva
            + this.gasto.isr
            + this.gasto.ieps
            + this.gasto.tua
            + this.gasto.ish
            ;
    }

    onXmlFileSelected(files: FileList) { this.xmlFile = files.length ? files.item(0) : null; }
    onPdfFileSelected(files: FileList) { this.pdfFile = files.length ? files.item(0) : null; }

    puedeEnviarse() {
        if (this.loading) return false;
        if (!this.claseGasto) return false;
        if (!(this.gasto.moneda && this.claseGasto && this.tipoGasto)) return false;
        if (this.claseGasto.deducibleImpuestos) return this.pdfFile && this.xmlFile;
        return this.pdfFile
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
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'ok') {

                this.loading = true;
                this.viajesService.actualizarEstatusComprobante(this.noTrayecto, this.idComprobante, estatus, this.gasto.subtotal,
                    this.gasto.iva, this.gasto.isr, this.gasto.ish, this.gasto.ieps, this.gasto.tua, this.gasto.total)
                    .then(response => {
                        this.cancelar();
                    }).catch(reason => {
                        this.utilService.manejarError(reason)
                    }).then(() => this.loading = false);

            }
        });
    }

    actualizar() {
        this.loading = true;
        this.viajesService.obtenerComprobante(this.noTrayecto, this.idComprobante).then(gasto => {
            this.gasto = gasto;
        }).catch(reason => {
            this.utilService.manejarError(reason)
        }).then(() => this.loading = false);
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
                this.loading = true;
                this.viajesService.eliminarComprobante(this.noTrayecto, this.idComprobante).then(response => {
                    this.onCancelar.emit();
                }).catch(reason => {
                    this.utilService.manejarError(reason)
                }).then(() => this.loading = false);
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
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe(result => {
            let segregaciones = this.segregaciones.map(e => {
                let e1 = new Segregacion();
                e1.centroCosto = e.centroCosto;
                e1.importeSegregado = e.importeSegregado;
                return e1;
            })
            if (result == 'ok') {
                this.loading = true;
                this.viajesService.crearComprobante(
                    this.noTrayecto,
                    this.claseGasto.deducibleImpuestos,
                    this.claseGasto.id,
                    this.gasto.moneda,
                    this.gasto.total,
                    this.gasto.subtotal,
                    this.gasto.fecha,
                    this.gasto.iva,
                    this.gasto.isr,
                    this.gasto.ish,
                    this.gasto.ieps,
                    this.gasto.tua,
                    segregaciones,
                    this.segregacionesManuales,
                    this.usuario.centro_costo,
                    this.pdfFile,
                    this.xmlFile,
                ).then(response => {
                    if (response.status == "") {
                        this.onEnviar.emit();
                    }
                }).catch(reason => {
                    this.utilService.manejarError(reason)
                }).then(() => this.loading = false);
            }
        });
    }


}
