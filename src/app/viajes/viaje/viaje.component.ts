import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../services/viajes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { UtilService } from '../../services/util.service';
import { DialogoSimpleComponent } from '../../common/dialogo-simple/dialogo-simple.component';
import { DialogoComprobanteComponent } from '../dialogo-comprobante/dialogo-comprobante.component';
import { Solicitud } from './../../../model/solicitud';
import { Alerta } from 'src/model/alerta';
import { Comprobante } from 'src/model/comprobante';
import { UsuariosService } from 'src/app/services/usuarios.service';

interface Alert {
    title: string;
    content: string;
    type: any;
}

@Component({
    selector: 'app-viaje',
    templateUrl: './viaje.component.html',
    styleUrls: ['./viaje.component.scss']
})
export class ViajeComponent {

    // alerts: Alert[] = [];
    alertas: Alerta[] = [];
    contadorAlertas: number = 0;

    noTrayecto: string = null;
    titulo: string = null;
    solicitud: Solicitud = new Solicitud();
    loading = false;
    mostrarCamposOcultos: boolean = false;

    creando = false;
    editando = false;
    cerrado = false;

    ediandoCamposDeCabecera = false;

    totalgv: Comprobante = new Comprobante();

    formatoMonto: string;

    constructor(
        activatedRoute: ActivatedRoute,
        public utilService: UtilService,
        private viajesService: ViajesService,
        private usuarios: UsuariosService,
        private router: Router,
        private location: Location,
        private dialog: MatDialog
    ) {
        this.solicitud.departamento = {id:'', descripcion:''}; // marca error sino se inicializa
        this.solicitud.grupo = {id:'', nombre:''}; // marca error sino se inicializa

        if (activatedRoute.routeConfig.path == 'nuevo-viaje') {
            this.titulo = 'Nueva solicitud';
            this.creando = true;
            this.ediandoCamposDeCabecera = true;
            this.solicitud.estatus = '1';
            this.solicitud.estatusDescripcion = 'Solicitud inicial';
            this.solicitud.concepto = '003';
            this.solicitud.motivo = '';
            this.solicitud.totalAnticipo = null;
            this.solicitud.fechaInicio = '';
            this.solicitud.fechaFin = '';
            this.obtenerDatosDeUsuario();
        }

        if (activatedRoute.routeConfig.path == 'viajes-abiertos/:id' ||
            activatedRoute.routeConfig.path == 'viajes-cerrados/:id') {
            this.editando = true;
        }

        if (activatedRoute.routeConfig.path == 'viajes-cerrados/:id') {
            this.cerrado = true;
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

    agregarComprobante() {
        this.dialog.open(DialogoComprobanteComponent, {
            data: { noTrayecto: this.noTrayecto },
            disableClose: false,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'creado') this.actualizarViaje();
        }).catch(reason => this.utilService.manejarError(reason));
    }

    solicitarAutorizacion() {
        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Solicitar aprobación',
                texto: 'Está a punto de enviar la solicitud ' + this.noTrayecto + 
                ' para su aprobación. Mientras la solicitud está siendo aprobada no podrá editarla.',
                botones: [
                    { texto: 'No enviar ahora', color: '', valor: '' },
                    { texto: 'Enviar la solicitud a aprobación', color: 'accent', valor: 'enviar' },
                ]
            },
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'enviar') {
                this.loading = true;
                this.viajesService
                    .solicitarAutorizacion(this.noTrayecto)
                    .then(() => {
                        this.actualizarViaje();
                    })
                    .catch(reason => this.utilService.manejarError(reason))
                    .then(() => this.loading = false);
            }
        }).catch(reason => this.utilService.manejarError(reason));
    }

    solicitarAutorizacionDeComprobacion() {
        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Solicitar aprobación de la comprobación',
                texto: 'Está a punto de enviar la comprobación de la solicitud ' + this.noTrayecto + 
                ' para su aprobación. Mientras la comprobación está siendo aprobada no podrá editarla ni agregar comprobantes.',
                botones: [
                    { texto: 'No enviar ahora', color: '', valor: '' },
                    { texto: 'Enviar la comprobación a aprobación', color: 'accent', valor: 'enviar' },
                ]
            },
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'enviar') {
                this.loading = true;
                this.viajesService
                    .solicitarAutorizacionDeComprobacionPorContador(this.noTrayecto)
                    .then(() => {
                        this.actualizarViaje();
                    })
                    .catch(reason => this.utilService.manejarError(reason))
                    .then(() => this.loading = false);
            }
        }).catch(reason => this.utilService.manejarError(reason));
    }

    obtenerDatosDeUsuario() {
        let usuario = JSON.parse(localStorage.getItem('objUsuario'));
        
        this.solicitud.departamento = usuario.departamentos[0];
        this.solicitud.grupo = usuario.grupo01[0];
        this.solicitud.empresa = this. solicitud.grupo.id;
    }

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
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false)
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
        this.totalgv.propina = c.map(e => e.propina).reduce((a, b) => a + b, 0);
    }

    descargar(id:string, ruta: string, formato: string) {
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

    eliminar() {
        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Eliminar solicitud',
                texto: 'Está a punto de eliminar la solicitud con número de trayecto ' + this.noTrayecto + 
                '. Esta operación no es reversible.',
                botones: [
                    { texto: 'No eliminar', color: '', valor: '' },
                    { texto: 'Eliminar solicitud permanentemente', color: 'primary', valor: 'eliminar' },
                ]
            },
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'eliminar') {
                this.loading = true;
                this.viajesService
                    .eliminarViaje(this.noTrayecto)
                    .then(viaje => this.cancelar())
                    .catch(reason => this.utilService.manejarError(reason))
                    .then(() => this.loading = false);
            }
        }).catch(reason => this.utilService.manejarError(reason));
    }

    cancelar() { this.location.back(); }

    crear() {
        this.loading = true;
        this.viajesService
            .crearViaje(this.solicitud)
            .then(solicitud => {
                this.noTrayecto = '' + solicitud.numeroSolicitud;
                window.history.replaceState({}, 'no se para que es este parametro',
                    '/viajes/viajes-abiertos/' + this.noTrayecto); // '/viajes/viajes-abiertos/'
                this.editando = true;
                this.ediandoCamposDeCabecera = false;
                this.creando = false;
                this.actualizarViaje();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false);
    }

    guardar() {
        this.loading = true;
        this.viajesService
            .actualizarViaje(this.noTrayecto, this.solicitud)
            .then(solicitud => {
                this.ediandoCamposDeCabecera = false;
                this.solicitud = solicitud; // este viaje no trae gastos, por eso invocamos actualizar aqui abajo
                this.actualizarViaje();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false);
    }

    currentPattern() {
        this.formatoMonto = this.utilService.formatoMoneda(this.solicitud.totalAnticipo || 0);
    }

    validarCamposRequeridos(): boolean {
        if(this.solicitud.motivo !== '' &&
            this.solicitud.totalAnticipo !== null &&
            this.solicitud.fechaInicio !== '' &&
            this.solicitud.fechaFin !== '') {
            return true;
        }
        return false;
    }
}
