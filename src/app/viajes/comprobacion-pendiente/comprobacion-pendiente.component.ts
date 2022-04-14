import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../services/viajes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { UtilService } from '../../services/util.service';
import { Solicitud } from './../../../model/solicitud';
import { Alerta } from 'src/model/alerta';
import { Comprobante } from 'src/model/comprobante';

interface Alert {
    title: string;
    content: string;
    type: any;
}

@Component({
    selector: 'app-comprobacion-pendiente',
    templateUrl: './comprobacion-pendiente.component.html',
    styleUrls: ['./comprobacion-pendiente.component.scss']
})
export class ComprobacionPendienteComponent {

    // alerts: Alert[] = [];
    alertas: Alerta[] = [];
    contadorAlertas: number = 0;

    noTrayecto: string = null;
    titulo: string = null;
    solicitud: Solicitud = new Solicitud();
    loading = false;
    noComprobantesAprobados: number;
    mostrarCamposOcultos: boolean = false;
    esDirector: boolean = false;
    esAprobador: boolean = false;
    esContador: boolean = false;
    esGerente: boolean = false;
    esPrestador: boolean = false;
    voboDirector: boolean = false;

    creando = false;
    editando = false;

    ediandoCamposDeCabecera = false;

    totalgv: Comprobante = new Comprobante();

    formatoMonto: string;

    constructor(
        activatedRoute: ActivatedRoute,
        public utilService: UtilService,
        private viajesService: ViajesService,
        private router: Router,
        private location: Location,
        private dialog: MatDialog
    ) {
        this.solicitud.departamento = {id:'', descripcion:''}; // marca error sino se inicializa
        this.solicitud.grupo = {id:'', nombre:''}; // marca error sino se inicializa

        if (activatedRoute.routeConfig.path == 'comprobaciones-contador/:id') {
            this.editando = true;
        }
        if (this.editando) {
            activatedRoute.params.forEach(data => {
                this.noTrayecto = data.id;

                this.actualizarViaje();
            })
        }
    }

    debug(event) {
        console.log(event);
    }

    // -----------------------------------------------------------------------

    comprobantesSeleccionados: Comprobante[] = [];

    seleccionar(e: Comprobante) {
        (e as any).seleccionado = !(e as any).seleccionado;
        this.actualizarComprobantesSeleccionados();
    }

    actualizarComprobantesSeleccionados() {
        this.noComprobantesAprobados = 0;
        if (!this.solicitud) return 0;
        if (!this.solicitud.comprobantes) return 0;
        this.comprobantesSeleccionados.length = 0;
        this.solicitud.comprobantes.forEach(e => {
            if ((e as any).seleccionado) {
                this.comprobantesSeleccionados.push(e);
            }
            if (e.estatusComprobante == 'AUTORIZAR') {
                this.noComprobantesAprobados = this.noComprobantesAprobados + 1;
            }
        })
        return this.comprobantesSeleccionados.length;
    }

    limpiarSeleccionDeComprobantes() {
        if (!this.solicitud || !this.solicitud.comprobantes) return;
        this.solicitud.comprobantes.forEach(e => (e as any).seleccionado = false);
        this.comprobantesSeleccionados.length = 0;
    }

    aprobarSolicitud() {
        let campos = [];
        campos.push({ label: "¿Desea agregar algún comentario?", type: "textarea", placeholder: "Comentario ...", value: "" , maxLength:"45"});
        this.utilService
            .mostrarDialogoConFormulario(
                "Aprobar comprobación",
                "Está a punto de aprobar la comprobación "+ this.noTrayecto+ ","+
                " esta operación es irreversible.",
                "Aprobar comprobación " + this.noTrayecto,
                "Cancelar",
                campos,
                'accent')
            .then(o => {
                if (o != "ok") return;
                this.loading = true;
                this.viajesService
                .autorizarRechazarSolicitudPorContador(this.solicitud.numeroSolicitud.toString(), 'AUTORIZAR',campos[0].value)
                .then(() => {
                    /*if (this.esDirector) {
                        if(this.voboDirector) {
                            this.cancelar();
                        }
                        else {
                            this.actualizarViaje();
                            this.limpiarSeleccionDeComprobantes();
                        }
                    }
                    else {
                        this.cancelar();
                    }*/
                    this.cancelar();
                })
                .catch(reason => this.utilService.manejarError(reason))
                .then(() => this.loading = false);
            });
    }

    voBoSolicitud() {
        let campos = [];
        campos.push({ label: "¿Desea agregar algún comentario?", type: "textarea", placeholder: "Comentario ...", value: "" , maxLength:"45"});
        this.utilService
            .mostrarDialogoConFormulario(
                "Vobo. a la comprobación",
                "Está a punto de dar el vobo. a la comprobación "+ this.noTrayecto+ ","+
                " esta operación es irreversible.",
                "Dar vobo. a la comprobación " + this.noTrayecto,
                "Cancelar",
                campos,
                'accent')
            .then(o => {
                if (o != "ok") return;
                this.loading = true;
                this.viajesService
                .autorizarRechazarSolicitudPorContador(this.solicitud.numeroSolicitud.toString(), 'AUTORIZAR',campos[0].value)
                .then(() => {
                    /*if (this.solicitud.estatus == '5' || this.solicitud.estatus == '8' || this.solicitud.estatus == '11') {
                        this.voboDirector = true;
                    }
                    else {
                        this.cancelar();
                    }*/
                    this.cancelar();
                })
                .catch(reason => this.utilService.manejarError(reason))
                .then(() => this.loading = false);
            });
    }

    rechazarSolicitud() {

        let campos = [];
        campos.push({ label: "Comentarios", type: "textarea", placeholder: "El motivo del rechazo de la comprobación es ...", value: "", maxLength: "200" });

        this.utilService
            .mostrarDialogoConFormulario(
                "Rechazar comprobación",
                "Está a punto de rechazar la comprobación con número de trayecto " + this.noTrayecto + 
                ". Por favor, escriba el motivo del rechazo.",
                "Rechazar comprobación " + this.noTrayecto, 
                "No rechazar ahora",
                campos, 
                'accent'
            ).then(valor => {
                if (valor != 'ok') return;

                this.loading = true;
                this.viajesService
                .autorizarRechazarSolicitudPorContador(this.solicitud.numeroSolicitud.toString(), 'RECHAZAR', campos[0].value)
                .then(() => {
                    /*this.actualizarViaje();
                    this.limpiarSeleccionDeComprobantes();*/
                    this.cancelar();
                })
                .catch(reason => this.utilService.manejarError(reason))
                .then(() => this.loading = false);

            }).catch(e => this.utilService.manejarError(e));
    }
    
    aprobarComprobantesSeleccionados() {
        this.comprobantesSeleccionados.forEach(comprobante => {
            this.loading = true;
            this.viajesService
            .autorizarRechazarComprobantePorContador(comprobante.idComprobanteViatico.toString(), 'AUTORIZAR')
            .then(() => {
                this.actualizarViaje();
                this.limpiarSeleccionDeComprobantes();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false);
        });
    }

    // -----------------------------------------------------------------------

    actualizarViaje() {

        this.loading = true;
        this.viajesService.obtenerViaje(this.noTrayecto)
            .then(viaje => {
                this.titulo = 'Solicitud ' + this.noTrayecto;
                this.solicitud = viaje;
                if(this.solicitud.comprobantes.length > 0) {
                    this.actualizarAlertas();
                }
                this.actualizarSumaDeComprobantes();

                this.limpiarSeleccionDeComprobantes();

                var roles = localStorage.getItem('rolAprobador').split(",");

                if (roles.some(r => r === 'CONTABILIDAD')) this.esContador = true;
                if (roles.some(r => r === 'GERENTES')) this.esGerente = true;
                if (roles.some(r => r === 'CONTADOR PRESTADORA')) this.esPrestador = true;
                if (roles.some(r => r === 'DIRECTOR')) this.esDirector = true;
                if (this.esContador || this.esGerente || this.esPrestador) this.esAprobador = true;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false)
    }

    actualizarSumaDeComprobantes() {
        let c = this.solicitud.comprobantes;
        if (!c) return;
        this.totalgv = new Comprobante();
        this.totalgv.total = c.map(e => e.total).reduce((a, b) => a + b, 0);
        this.totalgv.subTotal = c.map(e => e.subTotal).reduce((a, b) => a + b, 0);
        this.totalgv.impuesto = c.map(e => e.impuesto).reduce((a, b) => a + b, 0);
        this.totalgv.iva = c.map(e => e.iva).reduce((a, b) => a + b, 0);
        this.totalgv.isr = c.map(e => e.isr).reduce((a, b) => a + b, 0);
        this.totalgv.ieps = c.map(e => e.ieps).reduce((a, b) => a + b, 0);
        this.totalgv.noAplica = c.map(e => e.noAplica).reduce((a, b) => a + b, 0);
        this.totalgv.propina = c.map(e => e.propina).reduce((a, b) => a + b, 0);
    }

    actualizarAlertas() {
        this.viajesService
            .obtenerAlertasPorSolicitud(this.noTrayecto)
            .then(alertas => {
                this.contadorAlertas = 0;
                alertas.forEach(alerta => {
                    if (alerta.tipo === 'W' || alerta.tipo === 'E') {
                        this.contadorAlertas++;
                    }
                    alerta.tipo = alerta.tipo === 'S'? 'alert-success' : 
                                    (alerta.tipo === 'W'? 'alert-warning' : 
                                    (alerta.tipo === 'E'? 'alert-danger' : 'alert-info'));
                });
                this.alertas = alertas;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false);
    }

    descargar(id: string, ruta: string, formato: string) {
        this.loading = true;
        var filenameWithExtension = ruta.replace(/^.*[\\\/]/, '');
        var filename = filenameWithExtension.split('.')[0];
        
        this.viajesService
            .descargar(id, formato)
            .then(response => {
                this.saveByteArray(filename, response, formato);
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false);
    }

    saveByteArray(reportName: string, byte: ArrayBuffer, formato: string) {
        var file = (formato === 'pdf' ? new Blob([byte], {type: 'application/pdf'}) 
                        : (formato === 'xml' ? new Blob([byte], {type: 'application/xml'}) 
                        : new Blob([byte], {type: 'application/zip'}))
                    );
        var fileURL = URL.createObjectURL(file);
        let link: any = window.document.createElement('a');
        link.href = fileURL;
        link.download = reportName;
        link.click();
    }

    descargaFactura() {
        this.viajesService
            .getDescargaFactura(this.solicitud.numeroSolicitud)
            .subscribe(
                data => {
                const file = new Blob([data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
                }
            );
    }

    cancelar() { this.location.back(); }

    poliza() {
        this.router.navigate(['/poliza/' + this.noTrayecto]);
    }

    eventoNoAplica(comprobante: Comprobante): boolean {
        let respuesta: boolean = false;
        this.loading = true;
        this.viajesService
            .eventoNoAplica(comprobante.idComprobanteViatico, !comprobante.aprobacionNoAplica)
            .then(() => {
                respuesta = !comprobante.aprobacionNoAplica;
            }).catch(reason => {
                respuesta = comprobante.aprobacionNoAplica;
                this.utilService.manejarError(reason)
            }).then(() => this.loading = false);
        return respuesta;
    }
}
