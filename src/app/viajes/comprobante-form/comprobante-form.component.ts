import { Component, Output, EventEmitter, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { ViajesService } from '../../services/viajes.service';
import { SessionService } from '../../services/session.service';
import { UtilService } from '../../services/util.service';
import { Usuario } from '../../../model/usuario';
import { MatDialog } from '@angular/material/dialog';
import { DialogoSimpleComponent } from '../../common/dialogo-simple/dialogo-simple.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CuentasContablesService } from 'src/app/services/cuentas-contables.service';
import { Subcuenta } from 'src/model/subcuenta';
import { Comprobante } from 'src/model/comprobante';
import { Cfdi } from 'src/model/cfdi';
import { ActivatedRoute } from '@angular/router';
import { CFDI } from 'src/util/cfdi';

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

    @Output("tieneXML")
    tieneXML : EventEmitter<boolean> = new EventEmitter();

    @Output()
    onCancelar: EventEmitter<any> = new EventEmitter();

    @Output()
    onEnviar: EventEmitter<any> = new EventEmitter();

    @Input('creando')
    creando: boolean;

    segregacionesManuales = false;
    segregaciones = [];

    loading = false;

    cecos: string[] = [];
    cuentasContables: Subcuenta[] = [];
    estatusSolicitud:string = '';
    comprobante: Comprobante = {
        aprobacionContador: false,
        aprobacionGerente: false,
        aprobacionNoAplica: false,
        aprobacionPrestador: false,
        cfdi: new Cfdi(),
        estatusComprobante: '',
        fecha: '',
        idComprobanteViatico: 0,
        ieps: null,
        impuesto: null,
        isr: null,
        iva: null,
        noAplica: 0,
        numeroFactura: '',
        numeroSolicitud: '',
        observaciones: '',
        propina: null,
        rfc: '',
        rutaPdf: '',
        rutaXml: '',
        seleccionado: false,
        subCuenta: new Subcuenta(),
        subCuentaContable: 0,
        subTotal: null,
        total: null
    }

    usuario: Usuario;

    xmlFile: File = null;
    pdfFile: File = null;

    inputs:boolean = false;
    conXML:boolean = true;
    conPDF:boolean = true;

    formatoSubtotal: string;
    formatoImpuesto: string;
    formatoTotal: string;
    formatoPropina: string;

    ediandoCamposDeComprobante: boolean = false;

    constructor(
        private dialog: MatDialog,
        private sessionService: SessionService,
        private cuentasService: CuentasContablesService,
        private usuariosService: UsuariosService,
        private viajesService: ViajesService,
        public utilService: UtilService,
        private activatedRoute: ActivatedRoute,
    ) {

        this.obtenerCuentasContables();
    }

    ngOnInit(): void {}

    obtenerCuentasContables() {
        this.loading = true;
        if (this.activatedRoute.routeConfig && this.activatedRoute.routeConfig.path == 'comprobaciones-contador/:id/comprobantes/:jd') {
            this.cuentasService.obtenerSubcuentas()
                .subscribe(result => {
                    this.cuentasContables = result;
                    this.loading = false;
                },
                error => {
                    this.utilService.manejarError(error);
                    this.loading = false;
                });
        } else {
            this.cuentasService.obtenerSubcuentasPorEmpresaYCeco()
                .subscribe(result => {
                    this.cuentasContables = result;
                    this.loading = false;
                },
                error => {
                    this.utilService.manejarError(error);
                    this.loading = false;
                });
        }
    }

    cuentaContableSelected() {
        this.comprobante.subCuentaContable = this.comprobante.subCuenta.id; // -----------------------------------------------------------------
        this.limpiarValoresPorCambioDeCuentaContable();
    }

    currencyPattern() {
        this.formatoSubtotal = this.utilService.formatoMoneda(this.comprobante.subTotal || 0);
        this.formatoImpuesto = this.utilService.formatoMoneda(this.comprobante.impuesto || 0);
        this.formatoTotal = this.utilService.formatoMoneda(this.comprobante.total || 0);
        this.formatoPropina = this.utilService.formatoMoneda(this.comprobante.propina || 0);
    }

    limpiarValoresPorCambioDeCuentaContable() {
        this.comprobante.subTotal = null;
        this.comprobante.impuesto = 0;
        this.xmlFile = null;
        this.pdfFile = null;
        this.actualizarTotal();
    }

    actualizarTotal() {
        this.comprobante.total
            = parseFloat((this.comprobante.subTotal || '0').toString())
            + parseFloat((this.comprobante.impuesto || '0').toString());
    }

    cambiarANumber() {
        this.comprobante.ieps = parseFloat((this.comprobante.ieps || '0').toString());
        this.comprobante.impuesto = parseFloat((this.comprobante.impuesto || '0').toString());
        this.comprobante.isr = parseFloat((this.comprobante.isr || '0').toString());
        this.comprobante.iva = parseFloat((this.comprobante.iva || '0').toString());
        this.comprobante.propina = parseFloat((this.comprobante.propina || '0').toString());
        this.comprobante.subTotal = parseFloat((this.comprobante.subTotal || '0').toString());
    }

    // onXmlFileSelected(files: FileList) {
    //     this.loading = true;
    //     this.xmlFile = files.length ? files.item(0) : null;
        
    //     this.comprobante.subTotal = null;
    //     this.comprobante.impuesto = 0;
    //     this.actualizarTotal();

    //     this.viajesService
    //         .validarXML(this.xmlFile)
    //         .then(response => {
                
    //             this.readFileAsText(this.xmlFile).then(result => {
    //                 var parser = new DOMParser();
    //                 var xmlDoc = parser.parseFromString(result,"text/xml");
    //                 this.comprobante.subTotal = parseFloat(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute('SubTotal')); // Subtotal
    //                 this.comprobante.total = parseFloat(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute('Total')); // Total
        
    //                 // let impuesto = (this.comprobante.total - this.comprobante.subTotal).toFixed(2);
    //                 // this.comprobante.impuesto = parseFloat(impuesto); //Impuesto
    //                 console.log(xmlDoc.getElementsByTagName("cfdi:Impuestos"))
    //                 this.comprobante.impuesto = parseFloat(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute('Total')); //Impuesto
    //             });

    //         }).catch(reason => {
    //             this.xmlFile = null;
    //             this.utilService.manejarError(reason);
    //         }).then(() => this.loading = false)
    // }

    onXmlFileSelected(files: FileList) {
        this.xmlFile = files.length ? files.item(0) : null;

        this.loading = true;
        this.viajesService
            .validarXML(this.xmlFile)
            .then(response => {
                CFDI.parseFile(this.xmlFile)
                    .then(cfdi => {
                        this.comprobante.total = cfdi.Total;
                        this.comprobante.subTotal = cfdi.SubTotal;
                        this.comprobante.impuesto = cfdi.TotalImpuestosTrasladados;
                    })
                    .catch(err => {
                        this.xmlFile = null;
                        this.utilService.manejarError(err);
                    })
                    .then(e => this.loading = false)
            }).catch(reason => {
                this.xmlFile = null;
                this.utilService.manejarError(reason);
            }).then(() => this.loading = false);
    }

    async readFileAsText(file) {
        let result_base64 = await new Promise<string>((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result.toString());
            fileReader.readAsText(file);
        });
    
        return result_base64;
    }

    onPdfFileSelected(files: FileList) { this.pdfFile = files.length ? files.item(0) : null; }

    cancelar() { this.onCancelar.emit(); }

    actualizar() {
        this.loading = true;
        this.obtenerCuentasContables();
        this.viajesService.obtenerViaje(this.noTrayecto.toString()).then(comprobante => {
            let solicitud = comprobante;
            this.estatusSolicitud = solicitud.estatus;
            this.comprobante = solicitud.comprobantes.find(x => x.idComprobanteViatico.toString() === this.idComprobante.toString());
            
            // para que la subcuenta del comprobante corresponda a un ELEMENTO del ARREGLO de subcuentas contables
            if (this.comprobante.subCuenta && this.comprobante.subCuenta.id)
                this.comprobante.subCuenta = this.cuentasContables.find(e => e.id == this.comprobante.subCuenta.id);
            if(!this.creando) {
                this.conXML = (this.comprobante.rutaXml == "") ? false : true;
                this.tieneXML.emit(this.conXML);
            }
            this.descargar(this.comprobante.idComprobanteViatico.toString(), this.comprobante.rutaPdf, 'pdf', false);
        }).catch(reason => {
            this.utilService.manejarError(reason)
        }).then(() => this.loading = false);
    }

    descargar(idComprobanteViatico:string, ruta: string, formato: string, descargar: boolean) {
        var filenameWithExtension = ruta.replace(/^.*[\\\/]/, '');
        var filename = filenameWithExtension.split('.')[0];
        
        this.viajesService
            .descargar(idComprobanteViatico, formato)
            .then(response => {
                if (descargar) {
                    this.saveByteArray(filename, response, formato);
                }
                else {
                    this.showPdf(response, filenameWithExtension);
                }
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false);
    }

    descargarPdfXml(formato: string) {
        this.descargar(this.comprobante.idComprobanteViatico.toString(), this.comprobante.rutaPdf, formato, true);
    }

    showPdf(byte: ArrayBuffer, filenameWithExtension: string) {
        var file = new Blob([byte], {type: 'application/pdf'});
        var rutaPDF = URL.createObjectURL(file);
        
        let visualizador: any = window.document.getElementById('viewer');
        visualizador.data = rutaPDF + '#zoom=scale';
        visualizador.type="application/pdf";
        visualizador.width="680px";
        visualizador.height="480px";
        visualizador.title=filenameWithExtension;
    }

    saveByteArray(reportName: string, byte, formato: string) {
        var file = formato === 'pdf' ? new Blob([byte], {type: 'application/pdf'}) : new Blob([byte], {type: 'application/xml'});
        var fileURL = URL.createObjectURL(file);
        let link: any = window.document.createElement('a');
        link.href = fileURL;
        link.download = reportName;
        link.click();
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
                this.viajesService.eliminarComprobante(this.idComprobante).then(response => {
                    this.onCancelar.emit();
                }).catch(reason => {
                    this.utilService.manejarError(reason)
                }).then(() => this.loading = false);
            }
        });
    }

    guardar() {
        this.cambiarANumber();
        this.loading = true;
        this.viajesService
            .actualizarComprobante(this.idComprobante.toString(), this.comprobante)
            .then(comprobante => {
                this.ediandoCamposDeComprobante = false;
                this.actualizar();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false);
    }

    validarCamposRequeridos(): boolean {
        let camposLlenos = false;
        let xmlLleno = false;
        let pdfLleno = false;
        if(this.comprobante.subCuenta && this.comprobante.subCuenta.id) {
            if(this.comprobante.fecha !== "") {
                if(this.comprobante.subTotal !== null) {
                    camposLlenos = true;
                }
            }
        }

        if(this.conXML) {
            if(this.xmlFile !== null) {
                xmlLleno = true;
            }
        }
        else {
            if(this.xmlFile === null) {
                xmlLleno = true;
            }
        }

        if(this.conPDF) {
            if(this.pdfFile !== null) {
                pdfLleno = true;
            }
        }
        else {
            if(this.pdfFile === null) {
                pdfLleno = true;
            }
        }

        return camposLlenos && xmlLleno && pdfLleno;
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
            if (result == 'ok') {
                this.cambiarANumber();
                this.loading = true;
                this.viajesService.crearComprobante(
                    this.noTrayecto,
                    this.comprobante,
                    this.pdfFile,
                    this.xmlFile
                ).then(response => {
                    if (response.status == 200) {
                        this.onEnviar.emit();
                    }
                }).catch(reason => {
                    this.utilService.manejarError(reason)
                }).then(() => this.loading = false);
            }
        });
    }
}
