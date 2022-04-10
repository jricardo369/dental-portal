import { Component, OnInit } from '@angular/core';
import { Viaje } from '../../../model/viaje';
import { ViajesService } from '../../services/viajes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { safeYYYY_MM_DD } from 'src/app/app.config';
import { UtilService } from '../../services/util.service';
import { DialogoSimpleComponent } from '../../common/dialogo-simple/dialogo-simple.component';
import { GastoViaje } from '../../../model/gasto-viaje';
import { DialogoComprobanteComponent } from '../dialogo-comprobante/dialogo-comprobante.component';
import { TiposDeViaje } from 'src/model/tipos-de-viaje';


@Component({
    selector: 'app-viaje',
    templateUrl: './viaje.component.html',
    styleUrls: ['./viaje.component.scss']
})
export class ViajeComponent {

    safeYYYYMMDD = safeYYYY_MM_DD; // un horrible workaround porque angular, xD, y no había AngularMaterial cuando comenzó el proyecto

    noTrayecto: string = null;
    titulo: string = null;
    viaje: Viaje = new Viaje();
    loading = false;

    creando = false;
    editando = false;
    autorizandoPorSociedad = false;
    autorizandoPorCentroDeCosto = false;
    autorizandoAutorizador = false;

    ediandoCamposDeCabecera = false;

    totalgv: GastoViaje = new GastoViaje();

    tiposViaje: TiposDeViaje[] = [];

    constructor(
        activatedRoute: ActivatedRoute,
        private utilService: UtilService,
        private viajesService: ViajesService,
        private router: Router,
        private location: Location,
        private dialog: MatDialog
    ) {

        if (activatedRoute.routeConfig.path == 'nuevo-viaje') {
            this.titulo = 'Nuevo viaje';
            this.creando = true;
            this.ediandoCamposDeCabecera = true;

            this.loading = true;
            this.actualizarTiposDeViaje()
                .then(e => { })
                .catch(err => this.utilService.manejarError(err))
                .then(() => this.loading = false);
        }

        if (activatedRoute.routeConfig.path == 'viajes-abiertos/:id' ||
            activatedRoute.routeConfig.path == 'viajes-cerrados/:id') {
            this.editando = true;
        }

        if (activatedRoute.routeConfig.path == 'autorizaciones/:id') {
            this.autorizandoPorSociedad = true;
        }

        if (activatedRoute.routeConfig.path == 'autorizaciones-ceco/:id') {
            this.autorizandoPorCentroDeCosto = true;
        }

        if (activatedRoute.routeConfig.path == 'autorizaciones-aut-cc/:id') {
            this.autorizandoAutorizador = true;
        }

        if (this.editando || this.autorizandoPorSociedad || this.autorizandoPorCentroDeCosto || this.autorizandoAutorizador) {
            activatedRoute.params.forEach(data => {
                this.noTrayecto = data.id;

                this.loading = true;
                this.actualizarTiposDeViaje()
                    .then(e => this.actualizarViaje())
                    .catch(err => {
                        this.utilService.manejarError(err)
                        this.loading = false;
                    });
            })
        }

    }

    actualizarTiposDeViaje() {
        return new Promise((ok, no) => {
            this
                .viajesService
                .obtenerTiposDeViaje()
                .then(tipos => {
                    this.tiposViaje = tipos;
                    ok();
                })
                .catch(err => {
                    no();
                });
        })
    }

    debug(event) {
        console.log(event);
    }

    // -----------------------------------------------------------------------

    comprobantesSeleccionados: GastoViaje[] = [];

    seleccionar(e: GastoViaje) {

        if (!this.editando && !this.autorizandoPorSociedad && !this.autorizandoPorCentroDeCosto) return;

        if (this.editando && !(this.viaje.estatus == 'Abierto' || this.viaje.estatus == 'Rechazado')) return;
        if (this.autorizandoPorSociedad && this.viaje.estatus != 'Por Autorizar') return;
        if (this.autorizandoPorCentroDeCosto && this.viaje.estatus != 'En Autorización') return;

        (e as any).seleccionado = !(e as any).seleccionado;
        this.actualizarComprobantesSeleccionados();
    }

    actualizarComprobantesSeleccionados() {
        if (!this.viaje) return 0;
        if (!this.viaje.comprobantes) return 0;
        this.comprobantesSeleccionados.length = 0;
        this.viaje.comprobantes.forEach(e => {
            if ((e as any).seleccionado) {
                this.comprobantesSeleccionados.push(e);
            }
        })
        return this.comprobantesSeleccionados.length;
    }

    limpiarSeleccionDeComprobantes() {
        if (!this.viaje || !this.viaje.comprobantes) return;
        this.viaje.comprobantes.forEach(e => (e as any).seleccionado = false);
        this.comprobantesSeleccionados.length = 0;
    }

    aprobarSegregacionesDeComprobantesSeleccionados = () => this.cambiarEstatusDeSegregacionesDeComprobantesSeleccionados("Aprobado");
    rechazarSegregacionesDeComprobantesSeleccionados = () => this.cambiarEstatusDeSegregacionesDeComprobantesSeleccionados("Rechazado");

    cambiarEstatusDeSegregacionesDeComprobantesSeleccionados(estatus: string) {
        this.loading = true;
        let promises = this.comprobantesSeleccionados.map(e =>
            this.viajesService.actualizarEstatusComprobanteCeco(e.idComprobante, estatus))
        Promise
            .all(promises)
            .then(e => { })
            .catch(err => this.utilService.manejarError(err))
            .then(() => { this.loading = false; this.actualizarViaje(); });
    }

    aprobarComprobantesSeleccionados() { this.cambiarEstatusDeComprobantesSeleccionados('Aprobado'); }
    rechazarComprobantesSeleccionados() { this.cambiarEstatusDeComprobantesSeleccionados('Rechazado'); }

    cambiarEstatusDeComprobantesSeleccionados(estatus: string) {
        this.loading = true;
        let promises = this.comprobantesSeleccionados.map(e => {
            return this.viajesService.actualizarEstatusComprobante(
                Number.parseInt(this.noTrayecto), e.idComprobante, estatus,
                e.subtotal, e.iva, e.isr, e.ish, e.ieps, e.tua, e.total);
        })
        Promise
            .all(promises)
            .then(e => { })
            .catch(err => this.utilService.manejarError(err))
            .then(() => { this.loading = false; this.actualizarViaje(); });
    }

    eliminarComprobantesSeleccionados() {
        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Eliminar comprobantes',
                texto: 'Está a punto de eliminar los comprobantes seleccionados. Esta operación no es reversible.',
                botones: [
                    { texto: 'No eliminar', color: '', valor: '' },
                    { texto: 'Eliminar comprobantes permanentemente', color: 'primary', valor: 'eliminar' },
                ]
            },
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'eliminar') {
                this.loading = true;
                let promises = this.comprobantesSeleccionados.map(e => {
                    return this.viajesService.eliminarComprobante(Number.parseInt(this.noTrayecto), e.idComprobante);
                })
                Promise
                    .all(promises)
                    .then(results => { })
                    .catch(reasons => { })
                    .then(() => { this.loading = false; this.actualizarViaje(); });
            }
        }).catch(reason => this.utilService.manejarError(reason));
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
                titulo: 'Solicitar autorización',
                texto: 'Está a punto de enviar el viaje ' + this.noTrayecto + ' con destino a '
                    + this.viaje.destino + ' para su autorización. Mientras el viaje está siendo autorizado no podrá agregar más comprobantes.',
                botones: [
                    { texto: 'No enviar ahora', color: '', valor: '' },
                    { texto: 'Enviar el viaje a autorización', color: 'accent', valor: 'enviar' },
                ]
            },
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'enviar') {
                this.loading = true;
                this.viajesService
                    .solicitarAutorizacion(this.noTrayecto)
                    .then(viaje => {
                        this.actualizarViaje();
                    })
                    .catch(reason => this.utilService.manejarError(reason))
                    .then(() => this.loading = false);
            }
        }).catch(reason => this.utilService.manejarError(reason));
    }

    terminarAprobacionCeco() {

        // DECIDIR SI SE APRUEBA O RECHAZA DEBERÍA OCURRIR DEL LADO DEL API

        let aprobar = !this.viaje.comprobantes
            .map(gasto => gasto.segregacions)
            .reduce((a, b) => a.concat(b), [])
            .map(s => s.estatus == 'Aprobado')
            .includes(false);

        let campos = [];
        if (!aprobar) campos.push({ label: "Comentarios", type: "textarea", placeholder: "El motivo del rechazo del viaje es ...", value: "" });

        this.utilService
            .mostrarDialogoConFormulario(

                aprobar ? "Aprobar viaje" : "Rechazar viaje",
                aprobar ? "Está a punto de terminar la aprobación de las segregaciones del viaje, esta operación es irreversible."
                    : "Está a punto de terminar la aprobación de las segregaciones del viaje, esta operación es irreversible.",
                aprobar ? "Aprobar viaje" : "Rechazar viaje",
                "Cancelar", campos, 
                aprobar ? 'accent' : undefined

            ).then(o => {

                if (o != 'ok') return;

                let promise = null;
                if (aprobar) promise = this.viajesService.aprobarViajePorCeco(this.noTrayecto);
                else promise = this.viajesService.rechazarViajePorCeco(this.noTrayecto, campos[0].value);

                this.loading = true;
                promise
                    .then(response => {
                        let e = response.body as any;
                        console.log(e);
                        this.utilService.mostrarDialogoSimple(e.status, e.message)
                        this.cancelar();
                    })
                    .catch(err => this.utilService.manejarError(err))
                    .then(e => this.loading = false);

            }).catch(e => this.utilService.manejarError(e))


    }

    terminarAprobacion() {

        if (this.autorizandoPorCentroDeCosto) {
            this.terminarAprobacionCeco();
            return;
        }

        let estatus = null;
        if (this.autorizandoPorSociedad) estatus = 'En Autorización';
        else if (this.autorizandoPorCentroDeCosto) estatus = 'Cerrado';
        this.viaje.comprobantes.forEach(e => {
            if (e.estatus == 'Rechazado')
                estatus = 'Rechazado';
        })

        let aprobado = true;
        let rechazado = false;
        let pendiente = false;
        for (let i = 0; i < this.viaje.comprobantes.length; i++) {
            if (this.viaje.comprobantes[i].estatus != 'Aprobado') aprobado = false;
            if (this.viaje.comprobantes[i].estatus == 'Rechazado') rechazado = true;
            if (this.viaje.comprobantes[i].estatus == 'Pendiente') pendiente = true;
        }

        if (pendiente && !rechazado) {
            this.dialog.open(DialogoSimpleComponent, {
                data: {
                    titulo: 'Quedan comprobantes pendientes de aprobar',
                    texto: 'No puede terminar aprobación si tiene comprobantes pendientes de aprobar, apruebe o rechace los comprobantes pendientes',
                    botones: [{ texto: 'Entendido', color: 'primary' },]
                },
            })
            return;
        }

        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Terminar aprobación',
                texto: (aprobado ? 'Está a punto de aprobar' : 'Esta a punto de rechazar') + ' el viaje ' + this.noTrayecto + ' con destino a '
                    + this.viaje.destino + (aprobado ? '. Está operación es irreversible.' : '. El viajero podrá revisar los comprobanes que subió '
                        + ' y hacer los ajustes necesarios antes de solicitar aprobación de nuevo.'),
                botones: [
                    { texto: 'No terminar ahora', color: '', valor: '' },
                    {
                        texto: aprobado ? 'Aprobar gastos de viaje' : 'Rechazar gastos de viaje',
                        color: aprobado ? 'accent' : 'primary',
                        valor: 'enviar'
                    },
                ]
            },
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'enviar') {
                this.loading = true;
                this.viajesService
                    .terminarAprobacion(this.noTrayecto, estatus)
                    .then(result => {
                        if (result.status == '') this.cancelar();
                        else {

                            this.dialog.open(DialogoSimpleComponent, {
                                data: {
                                    titulo: result.status,
                                    texto: result.message,
                                    botones: [{ texto: 'Entendido', color: 'primary' }]
                                }
                            });
                            this.actualizarViaje();

                        }
                    })
                    .catch(reason => this.utilService.manejarError(reason))
                    .then(() => this.loading = false);
            }
        }).catch(reason => this.utilService.manejarError(reason));
    }

    aprobarViajeAutCC() {
        this.utilService
            .mostrarDialogoSimple(
                "Aprobar viaje",
                "Está a punto de aprobar el viaje del autorizador de centro de costos, " +
                "esta operación es irreversible y resultará en la contabilización del viaje",
                "Aprobar y contabilizar viaje",
                "Cancelar", 'accent')
            .then(o => {
                if (o != "ok") return;
                this.loading = true;
                this.viajesService
                    .aprobarViajeAutCC(this.noTrayecto)
                    .then(e => {
                        let json = e.body as any;
                        if (json.result && json.result.status) {
                            this.actualizarViaje();
                            this.utilService
                                .mostrarDialogoSimple(json.result.status, json.result.message);
                        } else {
                            this.utilService
                                .mostrarDialogoSimple("Éxito", "Se contabilizó el viaje")
                                .then(e => this.cancelar());
                        }
                    })
                    .catch(err => this.utilService.manejarError(err))
                    .then(e => this.loading = false);
            });
    }

    rechazarViajeAutCC() {

        let campos = [
            { label: "Comentarios", type: "textarea", placeholder: "El motivo del rechazo del viaje es ...", value: "" }
        ];

        this.utilService
            .mostrarDialogoConFormulario(
                "Rechazar viaje",
                "Está a punto de rechazar el viaje del autorizador de centro de costos, esta operación es irreversible",
                "Rechazar viaje",
                "Cancelar", campos)
            .then(o => {
                if (o != "ok") return;
                this.loading = true;
                this.viajesService
                    .rechazarViajeAutCC(this.noTrayecto, campos[0].value)
                    .then(e => {
                        this.utilService.mostrarDialogoSimple("Éxito", "Se rechazó el viaje");
                        this.cancelar();
                    })
                    .catch(err => this.utilService.manejarError(err))
                    .then(e => this.loading = false);
            });
    }

    actualizarViaje() {

        let promise = null;

        if (this.autorizandoPorCentroDeCosto) promise = this.viajesService.obtenerViajePendientesDeAutorizacionPorCeco(this.noTrayecto)
        else promise = this.viajesService.obtenerViaje(this.noTrayecto);

        this.loading = true;
        promise
            .then(viaje => {
                this.titulo = 'Viaje ' + this.noTrayecto;
                this.viaje = viaje;
                this.actualizarSumaDeComprobantes();

                // para que tipo viaje del viaje corresponda a un ELEMENTO del ARREGLO de tipos viaje
                if (this.viaje.tipoViaje && this.viaje.tipoViaje.id)
                    this.viaje.tipoViaje = this.tiposViaje.find(e => e.id == this.viaje.tipoViaje.id);

                if (this.viaje.comprobantes && this.autorizandoPorCentroDeCosto)
                    this.viaje.comprobantes.forEach(gv => (gv as any).expandido = true);

                if (this.viaje.estatus != 'Abierto')
                    this.titulo += ' (' + this.viaje.estatus + ')';

                this.limpiarSeleccionDeComprobantes();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false)
    }

    actualizarSumaDeComprobantes() {
        let c = this.viaje.comprobantes;
        if (!c) return;
        this.totalgv = new GastoViaje();
        this.totalgv.total = c.map(e => e.total).reduce((a, b) => a + b, 0);
        this.totalgv.subtotal = c.map(e => e.subtotal).reduce((a, b) => a + b, 0);
        this.totalgv.iva = c.map(e => e.iva).reduce((a, b) => a + b, 0);
        this.totalgv.isr = c.map(e => e.isr).reduce((a, b) => a + b, 0);
        this.totalgv.ish = c.map(e => e.ish).reduce((a, b) => a + b, 0);
        this.totalgv.tua = c.map(e => e.tua).reduce((a, b) => a + b, 0);
        this.totalgv.ieps = c.map(e => e.ieps).reduce((a, b) => a + b, 0);
    }

    eliminar() {
        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Eliminar viaje',
                texto: 'Está a punto de eliminar el viaje con número de trayecto ' + this.noTrayecto + ' con destino a '
                    + this.viaje.destino + '. Esta operación no es reversible.',
                botones: [
                    { texto: 'No eliminar', color: '', valor: '' },
                    { texto: 'Eliminar viaje permanentemente', color: 'primary', valor: 'eliminar' },
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
            .crearViaje(this.viaje)
            .then(viaje => {
                this.noTrayecto = '' + viaje.noTrayecto;
                window.history.replaceState({}, 'no se para que es este parametro',
                    '/viajes/viajes-abiertos/' + this.noTrayecto);
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
            .actualizarViaje(this.noTrayecto, this.viaje)
            .then(viaje => {
                this.ediandoCamposDeCabecera = false;
                this.viaje = viaje; // este viaje no trae gastos, por eso invocamos actualizar aqui abajo
                this.actualizarViaje();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false);
    }
}
