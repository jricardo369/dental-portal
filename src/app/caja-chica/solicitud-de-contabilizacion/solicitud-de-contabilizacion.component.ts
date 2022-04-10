import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { safeYYYY_MM_DD, API_URL } from 'src/app/app.config';
import { UtilService } from '../../services/util.service';
import { DialogoSimpleComponent } from '../../common/dialogo-simple/dialogo-simple.component';
import { SolicitudDeContabilizacionDeCajaChica } from '../../../model/solicitud-de-contabilizacion-de-caja-chica';
import { CajasChicasService } from '../../services/cajas-chicas.service';
import { GastoDeSolicitudDeContabilizacionDeCajaChica } from '../../../model/gasto-de-solicitud-de-contabilizacion-de-caja-chica';
import { SessionService } from '../../services/session.service';
import { Usuario } from '../../../model/usuario';
import { SapSociedad } from '../../../model/sap-sociedad';
import { CajaChica } from '../../../model/caja-chica';
import { DialogoGastoSolicitudCajaChicaComponent } from '../dialogo-gasto-solicitud-caja-chica/dialogo-gasto-solicitud-caja-chica';
import { Viaje } from 'src/model/viaje';
import { CustomI18nService } from 'src/app/custom-i18n.service';
import { EventoSolicitudCajaChica } from 'src/model/evento-solicitud-caja-chica';

@Component({
    selector: 'app-solicitud-de-contabilizacion',
    templateUrl: './solicitud-de-contabilizacion.component.html',
    styleUrls: ['./solicitud-de-contabilizacion.component.scss']
})
export class SolicitudDeContabilizacionComponent {

    api = API_URL;

    id: number = null;
    titulo: string = null;

    editando: boolean = false;
    autorizando: boolean = false;
    contabilizando: boolean = false;

    loading = false;
    nuevaSolicitud = false;
    mostrarBotonAgregarGasto = false;
    mostrarBotonSolicitarAprobacion = false;
    mostrarBotonRefresh = false;
    mostrarBotonImprimir = false;
    mostrarBotonEliminar = false;
    mostrarTablaDeGastos = false;
    mostrarBotonTerminarAprobacion = false;

    permitirSeleccionar = false;
    mostrarBotonEliminarGastosSeleccionados = false;
    mostrarBotonesAprobarRechazarGastosSeleccionados = false;

    mostrarTodasLasColumnas = false;

    usuario: Usuario = null;
    cajasChicasDeUsuario: CajaChica[] = [];
    sapSociedades: SapSociedad[] = [];

    solicitud: SolicitudDeContabilizacionDeCajaChica = new SolicitudDeContabilizacionDeCajaChica();
    gastos: GastoDeSolicitudDeContabilizacionDeCajaChica[] = [];
    bitacora: EventoSolicitudCajaChica[] = [];

    totalg = new GastoDeSolicitudDeContabilizacionDeCajaChica();
    mc = new GastoDeSolicitudDeContabilizacionDeCajaChica();

    constructor(
        private activatedRoute: ActivatedRoute,
        public utilService: UtilService,
        private cajaChicaService: CajasChicasService,
        private sessionService: SessionService,
        private router: Router,
        private location: Location,
        private dialog: MatDialog,
        private i18n: CustomI18nService
    ) {

        let activatedPath = this.activatedRoute.routeConfig.path;

        // ESTAMOS VIENDO UNA NUEVA SOLICITUD
        if (activatedPath == 'nueva-solicitud-de-contabilizacion') {
            this.titulo = i18n.get('Nueva solicitud de contabilización');
            this.nuevaSolicitud = true;
            this.editando = true;

            this.loading = true;
            this.sessionService
                .getUsuario()
                .then(usuario => {
                    this.usuario = usuario;
                    this.refresh();
                })
                .catch(err => {
                    this.utilService.manejarError(err);
                    this.loading = false;
                })
        }

        // ESTAMOS VIENDO UNA SOLICITUD NO CONTABILIZADA
        if (activatedPath == 'solicitudes-pendientes/:id') {
            this.permitirSeleccionar = true;
            this.mostrarBotonEliminarGastosSeleccionados = true;
            this.editando = true;
        }

        // ESTAMOS VIENDO UNA SOLICITUD PENDIENTE DE AUTORIZACION
        if (activatedPath == 'autorizaciones-pendientes/:id') {
            this.permitirSeleccionar = true;
            this.mostrarBotonEliminarGastosSeleccionados = false;
            this.mostrarBotonesAprobarRechazarGastosSeleccionados = true;
            this.mostrarBotonTerminarAprobacion = true;
            this.autorizando = true;
        }

        // ESTAMOS VIENDO UNA SOLICITUD PENDIENTE DE CONTABILIZAR
        if (activatedPath == 'contabilizaciones-pendientes/:id') {
            this.permitirSeleccionar = true;
            this.mostrarBotonEliminarGastosSeleccionados = false;
            this.mostrarBotonesAprobarRechazarGastosSeleccionados = true;
            this.mostrarBotonTerminarAprobacion = true;
            this.contabilizando = true;
        }

        // ESTAMOS VIENDO UNA SOLICITUD EXISTENTE
        if (activatedPath == 'solicitudes-pendientes/:id' ||
            activatedPath == 'solicitudes-contabilizadas/:id' ||
            activatedPath == 'autorizaciones-pendientes/:id' ||
            activatedPath == 'contabilizaciones-pendientes/:id'
        ) {

            this.mostrarBotonImprimir = true;
            this.mostrarBotonRefresh = true;
            this.mostrarTablaDeGastos = true;

            this.activatedRoute.params
                .forEach(params => {
                    this.id = params.id;
                    this.titulo = 'Solicitud ' + this.id;

                    this.loading = true;
                    this.sessionService
                        .getUsuario()
                        .then(usuario => {
                            this.usuario = usuario;
                            this.refresh();
                        })
                        .catch(err => {
                            this.utilService.manejarError(err);
                            this.loading = false;
                        })
                });
        }
    }

    // -----------------------------------------------------------------------------------------------------------------------------

    isCabeceraVisible = false;

    mostrarCabecera() {
        this.isCabeceraVisible = !this.isCabeceraVisible;
    }

    cancelar() { this.location.back(); }

    agregarGasto() {
        this.dialog.open(DialogoGastoSolicitudCajaChicaComponent, {
            maxWidth: 'calc(100% - 24px)',
            data: { id: this.id, sociedad: this.solicitud.sociedad.soc },
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'creado') this.refresh();
        }).catch(reason => this.utilService.manejarError(reason));
    }

    solicitarAprobacion() {
        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Solicitar aprobación',
                texto: 'Está a punto de enviar la solicitud de contabilización de caja chica con id ' + this.id + ' y referencia "'
                    + this.solicitud.referencia + '" a ser aprobada. Mientras la solicitud está siendo aprobada no podrá agregar más gastos.',
                botones: [
                    { texto: 'No enviar ahora', color: '', valor: '' },
                    { texto: 'Enviar la solicitud para ser aprobada', color: 'accent', valor: 'enviar' },
                ]
            },
            disableClose: false,
        }).afterClosed().toPromise().then(valor => {
            if (valor != 'enviar') return;
            this.loading = true;
            this.cajaChicaService
                .solicitarAprobacion(this.id)
                .then(viaje => this.refresh())
                .catch(reason => this.utilService.manejarError(reason))
                .then(() => this.loading = false);
        }).catch(reason => this.utilService.manejarError(reason));
    }

    refresh() {


        if (!this.nuevaSolicitud) {

            this.loading = true;
            this.cajaChicaService
                .obtenerSolicitudDeContabilizacionDeCajachica(this.id, true, true)
                .then(result => {

                    this.solicitud = result;

                    this.bitacora = this.solicitud.bitacora;
                    if (!this.bitacora) this.bitacora = [];

                    // this.bitacora = this.bitacora.filter(e => e.motivo);
                    if (this.bitacora) {
                        this.bitacora.sort((a, b) => {
                            if (a.fecha < b.fecha) return +1;
                            if (a.fecha > b.fecha) return -1;
                            return 0;
                        });
                    }

                    this.gastos = this.solicitud.gastos;
                    if (!this.gastos) this.gastos = [];

                    if (this.solicitud.referencia && (''+this.solicitud.referencia).trim().length) this.titulo = this.solicitud.referencia;
                    else this.titulo = 'Solicitud ' + this.id;

                    this.mostrarBotonAgregarGasto = this.solicitud.estatus == 'Abierto' || this.solicitud.estatus == 'Rechazado';
                    this.mostrarBotonSolicitarAprobacion = (this.solicitud.estatus == 'Abierto' || this.solicitud.estatus == 'Rechazado');
                    this.mostrarBotonEliminar = this.solicitud.estatus == 'Abierto' || this.solicitud.estatus == 'Rechazado';

                    // CONTABILIZADOR NO HACE NADA DE ESTO
                    if (this.contabilizando) {
                        this.mostrarBotonAgregarGasto = false;
                        this.mostrarBotonSolicitarAprobacion = false;
                        this.mostrarBotonEliminar = false;
                    }

                    if (!(this.solicitud.estatus == 'Abierto' || this.solicitud.estatus == 'Rechazado'))
                        this.permitirSeleccionar = false;

                    if (this.solicitud.estatus == 'Por Autorizar' && this.mostrarBotonTerminarAprobacion)
                        this.permitirSeleccionar = true;

                    if (this.solicitud.estatus == 'Aprobado' && this.mostrarBotonTerminarAprobacion)
                        this.permitirSeleccionar = true;

                    this.limpiarSeleccionDeComprobantes();
                    this.calcularTotales();
                    this.corregirRuta();
                    this.calcularColumnasEnBlanco();
                })
                .catch(err => this.utilService.manejarError(err))
                .then(e => this.loading = false);

        } else {

            this.loading = true;
            this.cajaChicaService
                .obtenerCajasChicas(this.usuario.usuario)
                .then(result => {
                    this.cajasChicasDeUsuario = result;
                    if (this.cajasChicasDeUsuario.length) {
                        this.solicitud.cajaChica = this.cajasChicasDeUsuario[0];
                        this.actualizarSociedades();
                        this.calcularTotales();
                        this.corregirRuta();
                        this.calcularColumnasEnBlanco();
                    }
                })
                .catch(err => this.utilService.manejarError(err))
                .then(e => this.loading = false);
        }

    }

    imprimir() {
        let url = API_URL + 'contabilizacion-caja-chica/' + this.id + '/reporte';
        window.open(url, "_blank");
    }

    eliminar() {
        console.log("wtf?")
        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Eliminar solicitud',
                texto: 'Está a punto de eliminar la solicitud de contabilización de caja chica con id ' + this.id
                    + ' con referencia ' + this.solicitud.referencia + '. Esta operación no es reversible.',
                botones: [
                    { texto: 'No eliminar', color: '', valor: '' },
                    { texto: 'Eliminar solicitud permanentemente', color: 'primary', valor: 'eliminar' },
                ]
            }, disableClose: false,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'eliminar') {
                this.loading = true;
                this.cajaChicaService
                    .eliminarSolicitud(this.id)
                    .then(e => this.cancelar())
                    .catch(reason => this.utilService.manejarError(reason))
                    .then(() => this.loading = false);
            }
        }).catch(reason => this.utilService.manejarError(reason));
    }

    obtenerErrorAlValidarCabecera() {
        if (!this.solicitud.referencia || (''+this.solicitud.referencia).trim().length == 0) return 'Falta campo referencia';
        if (!this.solicitud.fechaDocumento) return 'Falta fecha del documento';
        if (!this.solicitud.fechaContabilizacion) return 'Falta fecha de contabilización';
        return null;
    }

    crear() {

        let errorCabecera = this.obtenerErrorAlValidarCabecera();
        if (errorCabecera) {
            this.utilService.mostrarDialogoSimple('Error al validar cabecera', errorCabecera);
            return;
        }

        this.loading = true;
        this.cajaChicaService
            .crearSolicitud(this.solicitud)
            .then(solicitud => {
                let id = solicitud.id;
                this.router.navigateByUrl('/caja-chica/solicitudes-pendientes/' + id);
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false);
    }

    // -----------------------------------------------------------------------------------------------------------------------------

    calcularColumnasEnBlanco() {
        ['id', 'estatus', 'documentoContable', 'descripcionGasto', 'totalFactura', 'importe', 'subtotal', 'descuento', 'iva', 'isr', 'ish', 'tua', 'ieps',
            'texto', 'centroDeCosto', 'orden', 'centroDeBeneficio', 'elementoPep', 'grafo', 'operacionGrafo', 'rutaPdf', 'rutaXml'
        ].forEach(col => {
            if (this.mostrarTodasLasColumnas) {
                this.mc[col] = true;
            } else {
                let visible = false;
                if (this.gastos) {
                    this.gastos.forEach(e => {
                        if (e[col]) {
                            visible = true;
                        }
                        if (col == 'descripcionGasto') {
                            visible = (e as any).gastoCaja && (e as any).gastoCaja.descripcionGasto;
                        }
                    });
                }
                this.mc[col] = visible;
            }
        });
    }

    calcularTotales(): any {
        ['totalFactura', 'subtotal', 'importe', 'descuento', 'iva', 'isr', 'ieps', 'tua', 'ish'].forEach(impuesto => {
            let sum = 0;
            if (this.gastos) this.gastos.forEach(e => sum += e[impuesto]);
            this.totalg[impuesto] = sum;
        })
    }

    corregirRuta() {

        let activatedPath = this.activatedRoute.routeConfig.path;

        // solo no contabilizadas en pendientes
        if (activatedPath == 'solicitudes-pendientes/:id' &&
            this.solicitud.estatus == 'Contabilizado') {
            this.router.navigateByUrl('/caja-chica/solicitudes-contabilizadas/' + this.id);
        }

        // solo contabilizadas en contabilizadas
        if (activatedPath == 'solicitudes-contabilizadas/:id' &&
            this.solicitud.estatus != 'Contabilizado') {
            this.router.navigateByUrl('/caja-chica/solicitudes-pendientes/' + this.id);
        }

        // solo contabilizadas en contabilizadas
        if (activatedPath == 'autorizaciones-pendientes/:id' &&
            this.solicitud.estatus != 'Por Autorizar') {
            this.cancelar();
        }
    }

    actualizarSociedades() {
        this.loading = true;
        this.solicitud.sociedad = null;
        this.cajaChicaService
            .obtenerSociedadesDeCajaChica(this.solicitud.cajaChica.noCaja)
            .then(sociedades => {
                this.sapSociedades = sociedades;
                if (this.sapSociedades.length)
                    this.solicitud.sociedad = this.sapSociedades[0];
                this.sapSociedades.forEach(e => e.soc = e.sociedad);
            })
            .catch(err => this.utilService.manejarError(err))
            .then(e => this.loading = false);
    }

    // -----------------------------------------------------------------------------------------------------------------------------

    safeYYYYMMDD = safeYYYY_MM_DD; // un horrible workaround porque angular, xD, y no había AngularMaterial cuando comenzó el proyecto

    // -----------------------------------------------------------------------------------------------------------------------------

    ediandoCamposDeCabecera = false;

    debug(event) {
        console.log(event);
    }

    // -----------------------------------------------------------------------

    comprobantesSeleccionados: GastoDeSolicitudDeContabilizacionDeCajaChica[] = [];

    seleccionar(e: GastoDeSolicitudDeContabilizacionDeCajaChica) {
        if (!this.permitirSeleccionar) return;

        // Seguramente es mas mantenible colocar que estados SI son permitidos de manipular por el contabilizador
        // Pero quien soy yo sin una EF para decidir
        if (e.estatus == 'Contabilizado' || (e.estatus == 'Rechazado' && this.contabilizando)) return;

        (e as any).seleccionado = !(e as any).seleccionado;
        this.actualizarComprobantesSeleccionados();
    }

    seleccionarTodos() {
        if (this.permitirSeleccionar) {
            this.gastos.forEach(g => this.seleccionar(g));
            this.actualizarComprobantesSeleccionados();
        }
    }

    actualizarComprobantesSeleccionados() {
        if (!this.solicitud) return 0;
        if (!this.gastos) return 0;
        this.comprobantesSeleccionados.length = 0;
        this.gastos.forEach(e => {
            if ((e as any).seleccionado) {
                this.comprobantesSeleccionados.push(e);
            }
        })
        return this.comprobantesSeleccionados.length;
    }

    limpiarSeleccionDeComprobantes() {
        this.gastos.forEach(e => (e as any).seleccionado = false);
        this.comprobantesSeleccionados.length = 0;
    }

    aprobarComprobantesSeleccionados() {
        if (this.autorizando) this.cambiarEstatusDeComprobantesSeleccionados('Aprobado');
        else if (this.contabilizando) this.cambiarEstatusDeComprobantesSeleccionados('Aprobado Cont.');
    }

    rechazarComprobantesSeleccionados() {
        if (this.autorizando) this.cambiarEstatusDeComprobantesSeleccionados('Rechazado');
        else if (this.contabilizando) this.cambiarEstatusDeComprobantesSeleccionados('Rechazado Cont.');
    }

    cambiarEstatusDeComprobantesSeleccionados(estatus: string) {
        this.loading = true;
        let promises = this.comprobantesSeleccionados.map(e => {
            return this.cajaChicaService.actualizarEstatusGasto(this.id, e.id, estatus);
        })
        Promise
            .all(promises)
            .then(results => { })
            .catch(reasons => { })
            .then(() => { this.loading = false; this.refresh(); });
    }

    eliminarComprobantesSeleccionados() {
        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Eliminar gastos',
                texto: 'Está a punto de eliminar los gastos seleccionados. Esta operación no es reversible.',
                botones: [
                    { texto: 'No eliminar', color: '', valor: '' },
                    { texto: 'Eliminar gastos permanentemente', color: 'primary', valor: 'eliminar' },
                ]
            },
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'eliminar') {
                this.loading = true;
                let promises = this.comprobantesSeleccionados.map(e => {
                    return this.cajaChicaService.eliminarGasto(this.id, e.id);
                })
                Promise
                    .all(promises)
                    .then(results => { })
                    .catch(reasons => { })
                    .then(() => { this.loading = false; this.refresh(); });
            }
        }).catch(reason => this.utilService.manejarError(reason));
    }

    // -----------------------------------------------------------------------

    terminarAprobacion() {

        let estatus = 'Terminar Aprobación';

        let aprobado = true;
        let rechazado = false;
        let pendiente = false;
        for (let i = 0; i < this.gastos.length; i++) {
            if (this.gastos[i].estatus == 'Contabilizado') continue;
            if (this.gastos[i].estatus == 'Por Contabilizar' && this.autorizando) continue;
            if (this.gastos[i].estatus != 'Aprobado') aprobado = false;
            if (this.gastos[i].estatus == 'Rechazado') rechazado = true;
            if (this.gastos[i].estatus == 'Pendiente') pendiente = true;
        }

        if (pendiente && !rechazado) {
            this.dialog.open(DialogoSimpleComponent, {
                data: {
                    titulo: 'Quedan gastos pendientes de aprobar',
                    texto: 'No puede terminar aprobación si tiene comprobantes pendientes de aprobar, apruebe o rechace los comprobantes pendientes',
                    botones: [{ texto: 'Entendido', color: 'primary' },]
                },
            })
            return;
        }

        let textarea = {
            label: 'Motivo de rechazo',
            placeholder: 'Detalle el motivo del rechazo',
            sublabel: 'Será enviado al responsable por correo para que haga las correcciones necesarias',
            text: ''
        };

        let texto = (aprobado ? 'Está a punto de aprobar y enviar al contabilizador' : 'Esta a punto de rechazar') + ' la solicitud de contabilización de caja chica '
            + this.id + '. ' + (aprobado ? 'Está operación es irreversible.' : 'El responsable de la caja chica podrá revisar los comprobantes que subió '
                + ' y hacer los ajustes necesarios antes de solicitar aprobación de nuevo.');

        // MENSAJES DE CONTABILIZADOR
        if (this.contabilizando) {
            // let outOfScope = 0; // PARA QUE MEDIR ESTOS? COMENTADO
            let aprobadosCount = 0;
            let rechazadosCount = 0;
            let porContabilizarCount = 0;
            for (let i = 0; i < this.gastos.length; i++) {
                if (this.gastos[i].estatus == 'Aprobado Cont.') aprobadosCount++;
                else if (this.gastos[i].estatus == 'Rechazado Cont.') rechazadosCount++;
                else if (this.gastos[i].estatus == 'Por Contabilizar') porContabilizarCount++;
                // else outOfScope++;
            }
            if (porContabilizarCount) {
                this.dialog.open(DialogoSimpleComponent, {
                    data: {
                        titulo: 'Quedan gastos por contabilizar',
                        texto: 'No puede terminar aprobación si tiene comprobantes por contabilizar, apruebe o rechace los comprobantes pendientes',
                        botones: [{ texto: 'Entendido', color: 'primary' },]
                    },
                })
                return;
            }

            console.log('banana');

            aprobado = aprobadosCount > 0 && rechazadosCount == 0; // muy raro, hay que ver si lo hacemos mas claro

            if (aprobadosCount && rechazadosCount) {
                texto = aprobadosCount == 1 ? 'Se contabilizará un comprobante ' : 'Se contabilizarán ' + aprobadosCount + ' comprobantes ';
                texto += ' y se ' + (rechazadosCount == 1 ? 'rechazará un comprobante.' : 'rechazarán ' + rechazadosCount + ' comprobantes.');
                texto += ' El responsable de la caja chica podrá revisar los comprobantes rechazados y hacer los ajustes necesarios antes de solicitar aprobación de nuevo.';
                texto += ' Los comprobantes aprobados se contabilizaran.';
            } else if (aprobadosCount) {
                texto = aprobadosCount == 1 ? 'Se contabilizará un comprobante.' : 'Se contabilizarán ' + aprobadosCount + ' comprobantes.';
            } else if (rechazadosCount) {
                texto = 'Se ' + (rechazadosCount == 1 ? 'rechazará un comprobante.' : 'rechazarán ' + rechazadosCount + ' comprobantes.');
                texto += ' El responsable de la caja chica podrá revisar los comprobantes rechazados y hacer los ajustes necesarios antes de solicitar aprobación de nuevo.';
            } else {
                this.dialog.open(DialogoSimpleComponent, {
                    data: {
                        titulo: 'Error',
                        texto: 'No hay comprobantes aprobados o rechazados, no hay nada que hacer como contabilizador',
                        botones: [{ texto: 'Entendido', color: 'primary' },]
                    },
                })
            }
        }

        if (aprobado) textarea = null;

        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Terminar aprobación',
                texto: texto,
                textarea: textarea,
                botones: [
                    { texto: 'No terminar ahora', color: '', valor: '' },
                    {
                        texto: aprobado ? 'Aprobar solicitud' : 'Rechazar solicitud',
                        color: aprobado ? 'accent' : 'primary',
                        valor: 'enviar'
                    },
                ]
            },
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'enviar') {
                this.loading = true;
                this.cajaChicaService
                    .terminarAprobacion(this.id, textarea ? textarea.text : '', this.autorizando, this.contabilizando)
                    .then(result => {
                        if (result) {
                            let title = "Resultado";
                            let message = result;
                            try {
                                let json = JSON.parse(result);
                                title = json.messageDialogDto.title;
                                message = json.messageDialogDto.message;
                            } catch (e) {
                            }
                            this.utilService.mostrarDialogoSimple(title, message)
                                .then(v => this.cancelar())
                                .catch(e => this.utilService.manejarError(e));
                        } else {
                            this.cancelar();
                        }
                    })
                    .catch(reason => this.utilService.manejarError(reason))
                    .then(() => this.loading = false);
            }
        }).catch(reason => this.utilService.manejarError(reason));
    }

    /*
    actualizar() {
        this.loading = true;
        this.viajesService
            .obtenerViaje(this.noTrayecto)
            .then(viaje => {
                this.titulo = 'Viaje ' + this.noTrayecto;
                this.viaje = viaje;
                let c = this.viaje.comprobantes;
                if (c) {
                    this.totalgv = new GastoViaje();
                    this.totalgv.total = c.map(e => e.total).reduce((a, b) => a + b, 0);
                    this.totalgv.subtotal = c.map(e => e.subtotal).reduce((a, b) => a + b, 0);
                    this.totalgv.iva = c.map(e => e.iva).reduce((a, b) => a + b, 0);
                    this.totalgv.isr = c.map(e => e.isr).reduce((a, b) => a + b, 0);
                    this.totalgv.ish = c.map(e => e.ish).reduce((a, b) => a + b, 0);
                    this.totalgv.tua = c.map(e => e.tua).reduce((a, b) => a + b, 0);
                    this.totalgv.ieps = c.map(e => e.ieps).reduce((a, b) => a + b, 0);
                }
                if (this.viaje.estatus != 'Abierto') { this.titulo += ' (' + this.viaje.estatus + ')'; }
                this.limpiarSeleccionDeComprobantes();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false)
    }

    */
    guardarCabecera() {

        let errorCabecera = this.obtenerErrorAlValidarCabecera();
        if (errorCabecera) {
            this.utilService.mostrarDialogoSimple('Error al validar cabecera', errorCabecera);
            return;
        }

        this.loading = true;
        this.cajaChicaService
            .actualizarSolicitudDeContabilizacionDeCajaChica(this.id, this.solicitud)
            .then(solicitud => {
                this.ediandoCamposDeCabecera = false;
                this.solicitud = solicitud; // esta solicitud no trae gastos, por eso invocamos refresh aqui abajo
                this.refresh();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false);
    }

    verPdf(id, jd) {
        let src = API_URL + "contabilizacion-caja-chica/" + id + "/gastos/" + jd + "/pdf";
        this.utilService.mostrarDialogoFrame(src);

    }
}