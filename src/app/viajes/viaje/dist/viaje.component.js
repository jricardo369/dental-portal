"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViajeComponent = void 0;
var core_1 = require("@angular/core");
var viaje_1 = require("../../../model/viaje");
var app_config_1 = require("src/app/app.config");
var dialogo_simple_component_1 = require("../../common/dialogo-simple/dialogo-simple.component");
var dialogo_comprobante_component_1 = require("../dialogo-comprobante/dialogo-comprobante.component");
var solicitud_1 = require("./../../../model/solicitud");
var comprobante_1 = require("src/model/comprobante");
var ViajeComponent = /** @class */ (function () {
    function ViajeComponent(activatedRoute, utilService, viajesService, usuarios, router, location, dialog) {
        var _this = this;
        this.utilService = utilService;
        this.viajesService = viajesService;
        this.usuarios = usuarios;
        this.router = router;
        this.location = location;
        this.dialog = dialog;
        this.alerts = [];
        this.alertas = [];
        this.contadorAlertas = 0;
        this.safeYYYYMMDD = app_config_1.safeYYYY_MM_DD; // un horrible workaround porque angular, xD, y no había AngularMaterial cuando comenzó el proyecto
        this.noTrayecto = null;
        this.titulo = null;
        this.viaje = new viaje_1.Viaje();
        this.solicitud = new solicitud_1.Solicitud();
        this.loading = false;
        this.mostrarCamposOcultos = false;
        this.creando = false;
        this.editando = false;
        this.autorizandoPorSociedad = false;
        this.autorizandoPorCentroDeCosto = false;
        this.autorizandoAutorizador = false;
        this.ediandoCamposDeCabecera = false;
        this.totalgv = new comprobante_1.Comprobante();
        this.tiposViaje = [];
        this.comprobantesSeleccionados = [];
        this.aprobarSegregacionesDeComprobantesSeleccionados = function () { return _this.cambiarEstatusDeSegregacionesDeComprobantesSeleccionados("Aprobado"); };
        this.rechazarSegregacionesDeComprobantesSeleccionados = function () { return _this.cambiarEstatusDeSegregacionesDeComprobantesSeleccionados("Rechazado"); };
        this.solicitud.departamento = { id: '', descripcion: '' }; // marca error sino se inicializa
        this.solicitud.grupo = { id: '', nombre: '' }; // marca error sino se inicializa
        if (activatedRoute.routeConfig.path == 'nuevo-viaje') {
            this.titulo = 'Nueva solicitud';
            this.creando = true;
            this.ediandoCamposDeCabecera = true;
            this.solicitud.estatus = '1';
            //this.solicitud.departamento = {id:'', descripcion:''}; // marca error sino se inicializa
            //this.solicitud.grupo = {id:'', nombre:''}; // marca error sino se inicializa
            this.solicitud.estatusDescripcion = 'Solicitud inicial';
            // this.solicitud.empresa = {id:'4MS   ', nombre:'MULTISERVICIOS 2001 SA DE CV'};
            this.solicitud.concepto = '003';
            this.solicitud.motivo = '';
            this.solicitud.totalAnticipo = null;
            this.solicitud.fechaInicio = '';
            this.solicitud.fechaFin = '';
            this.obtenerDatosDeUsuario();
            /*this.loading = true;
            this.actualizarTiposDeViaje()
                .then(e => { })
                .catch(err => this.utilService.manejarError(err))
                .then(() => this.loading = false);*/
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
            activatedRoute.params.forEach(function (data) {
                _this.noTrayecto = data.id;
                // localStorage.setItem('auth_token', "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJuVTNLIiwic3ViIjoiMTQ2NCIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2MDk3ODAwMDUsImV4cCI6MTYwOTgxODAwNX0.zzHpdkO57XZkOhlIs9nO0RS9irp3VLys_TaeFoFaXo0DXbP3_lUCNKxqF-ZBvPOzocZNnQx4rc1RVIvNg3reAg");
                _this.actualizarViaje();
                /*this.loading = true;
                this.actualizarTiposDeViaje()
                    .then(e => this.actualizarViaje())
                    .catch(err => {
                        this.utilService.manejarError(err)
                        this.loading = false;
                    });*/
            });
        }
    }
    ViajeComponent.prototype.actualizarTiposDeViaje = function () {
        /*return new Promise((ok, no) => {
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
        })*/
    };
    ViajeComponent.prototype.debug = function (event) {
        console.log(event);
    };
    // -----------------------------------------------------------------------
    ViajeComponent.prototype.toInt = function (cadena) {
        return parseInt(cadena);
    };
    ViajeComponent.prototype.seleccionar = function (e) {
        if (!this.editando && !this.autorizandoPorSociedad && !this.autorizandoPorCentroDeCosto)
            return;
        if (this.editando && !(this.viaje.estatus == 'Abierto' || this.viaje.estatus == 'Rechazado'))
            return;
        if (this.autorizandoPorSociedad && this.viaje.estatus != 'Por Autorizar')
            return;
        if (this.autorizandoPorCentroDeCosto && this.viaje.estatus != 'En Autorización')
            return;
        e.seleccionado = !e.seleccionado;
        this.actualizarComprobantesSeleccionados();
    };
    ViajeComponent.prototype.actualizarComprobantesSeleccionados = function () {
        var _this = this;
        if (!this.solicitud)
            return 0;
        if (!this.solicitud.comprobantes)
            return 0;
        this.comprobantesSeleccionados.length = 0;
        this.solicitud.comprobantes.forEach(function (e) {
            if (e.seleccionado) {
                _this.comprobantesSeleccionados.push(e);
            }
        });
        return this.comprobantesSeleccionados.length;
    };
    ViajeComponent.prototype.limpiarSeleccionDeComprobantes = function () {
        if (!this.solicitud || !this.solicitud.comprobantes)
            return;
        this.solicitud.comprobantes.forEach(function (e) { return e.seleccionado = false; });
        this.comprobantesSeleccionados.length = 0;
    };
    ViajeComponent.prototype.cambiarEstatusDeSegregacionesDeComprobantesSeleccionados = function (estatus) {
        var _this = this;
        this.loading = true;
        var promises = this.comprobantesSeleccionados.map(function (e) {
            return _this.viajesService.actualizarEstatusComprobanteCeco(e.idComprobanteViatico, estatus);
        });
        Promise
            .all(promises)
            .then(function (e) { })["catch"](function (err) { return _this.utilService.manejarError(err); })
            .then(function () { _this.loading = false; _this.actualizarViaje(); });
    };
    ViajeComponent.prototype.aprobarComprobantesSeleccionados = function () { this.cambiarEstatusDeComprobantesSeleccionados('Aprobado'); };
    ViajeComponent.prototype.rechazarComprobantesSeleccionados = function () { this.cambiarEstatusDeComprobantesSeleccionados('Rechazado'); };
    ViajeComponent.prototype.cambiarEstatusDeComprobantesSeleccionados = function (estatus) {
        /*this.loading = true;
        let promises = this.comprobantesSeleccionados.map(e => {
            return this.viajesService.actualizarEstatusComprobante(
                Number.parseInt(this.noTrayecto), e.idComprobanteViatico, estatus,
                e.subTotal, e.impuesto, e.isr, e.ish, e.ieps, e.tua, e.total);
        })
        Promise
            .all(promises)
            .then(e => { })
            .catch(err => this.utilService.manejarError(err))
            .then(() => { this.loading = false; this.actualizarViaje(); });*/
    };
    ViajeComponent.prototype.eliminarComprobantesSeleccionados = function () {
        var _this = this;
        this.dialog.open(dialogo_simple_component_1.DialogoSimpleComponent, {
            data: {
                titulo: 'Eliminar comprobantes',
                texto: 'Está a punto de eliminar los comprobantes seleccionados. Esta operación no es reversible.',
                botones: [
                    { texto: 'No eliminar', color: '', valor: '' },
                    { texto: 'Eliminar comprobantes permanentemente', color: 'primary', valor: 'eliminar' },
                ]
            },
            disableClose: true
        }).afterClosed().toPromise().then(function (valor) {
            if (valor == 'eliminar') {
                _this.loading = true;
                var promises = _this.comprobantesSeleccionados.map(function (e) {
                    return _this.viajesService.eliminarComprobante(Number.parseInt(_this.noTrayecto), e.idComprobanteViatico);
                });
                Promise
                    .all(promises)
                    .then(function (results) { })["catch"](function (reasons) { })
                    .then(function () { _this.loading = false; _this.actualizarViaje(); });
            }
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); });
    };
    // -----------------------------------------------------------------------
    ViajeComponent.prototype.agregarComprobante = function () {
        var _this = this;
        this.dialog.open(dialogo_comprobante_component_1.DialogoComprobanteComponent, {
            data: { noTrayecto: this.noTrayecto },
            disableClose: false
        }).afterClosed().toPromise().then(function (valor) {
            if (valor == 'creado')
                _this.actualizarViaje();
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); });
    };
    ViajeComponent.prototype.solicitarAutorizacion = function () {
        var _this = this;
        this.dialog.open(dialogo_simple_component_1.DialogoSimpleComponent, {
            data: {
                titulo: 'Solicitar autorización',
                texto: 'Está a punto de enviar la solicitud ' + this.noTrayecto +
                    ' para su autorización. Mientras la solicitud está siendo autorizada no podrá editarla ni agregar comprobantes.',
                botones: [
                    { texto: 'No enviar ahora', color: '', valor: '' },
                    { texto: 'Enviar la solicitud a autorización', color: 'accent', valor: 'enviar' },
                ]
            },
            disableClose: true
        }).afterClosed().toPromise().then(function (valor) {
            if (valor == 'enviar') {
                _this.loading = true;
                _this.viajesService
                    .solicitarAutorizacion(_this.noTrayecto)
                    .then(function () {
                    _this.actualizarViaje();
                })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                    .then(function () { return _this.loading = false; });
            }
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); });
    };
    ViajeComponent.prototype.solicitarAutorizacionDeComprobacion = function () {
        var _this = this;
        this.dialog.open(dialogo_simple_component_1.DialogoSimpleComponent, {
            data: {
                titulo: 'Solicitar autorización de la comprobación',
                texto: 'Está a punto de enviar la comprobación de la solicitud ' + this.noTrayecto +
                    ' para su autorización. Mientras la comprobación está siendo autorizada no podrá editarla ni agregar comprobantes.',
                botones: [
                    { texto: 'No enviar ahora', color: '', valor: '' },
                    { texto: 'Enviar la comprobación a autorización', color: 'accent', valor: 'enviar' },
                ]
            },
            disableClose: true
        }).afterClosed().toPromise().then(function (valor) {
            if (valor == 'enviar') {
                _this.loading = true;
                _this.viajesService
                    .solicitarAutorizacionDeComprobacionPorContador(_this.noTrayecto)
                    .then(function () {
                    _this.actualizarViaje();
                })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                    .then(function () { return _this.loading = false; });
            }
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); });
    };
    ViajeComponent.prototype.terminarAprobacionCeco = function () {
        // DECIDIR SI SE APRUEBA O RECHAZA DEBERÍA OCURRIR DEL LADO DEL API
        var _this = this;
        var aprobar = !this.viaje.comprobantes
            .map(function (gasto) { return gasto.segregacions; })
            .reduce(function (a, b) { return a.concat(b); }, [])
            .map(function (s) { return s.estatus == 'Aprobado'; })
            .includes(false);
        var campos = [];
        if (!aprobar)
            campos.push({ label: "Comentarios", type: "textarea", placeholder: "El motivo del rechazo del viaje es ...", value: "" });
        this.utilService
            .mostrarDialogoConFormulario(aprobar ? "Aprobar viaje" : "Rechazar viaje", aprobar ? "Está a punto de terminar la aprobación de las segregaciones del viaje, esta operación es irreversible."
            : "Está a punto de terminar la aprobación de las segregaciones del viaje, esta operación es irreversible.", aprobar ? "Aprobar viaje" : "Rechazar viaje", "Cancelar", campos, aprobar ? 'accent' : undefined).then(function (o) {
            if (o != 'ok')
                return;
            var promise = null;
            if (aprobar)
                promise = _this.viajesService.aprobarViajePorCeco(_this.noTrayecto);
            else
                promise = _this.viajesService.rechazarViajePorCeco(_this.noTrayecto, campos[0].value);
            _this.loading = true;
            promise
                .then(function (response) {
                var e = response.body;
                console.log(e);
                _this.utilService.mostrarDialogoSimple(e.status, e.message);
                _this.cancelar();
            })["catch"](function (err) { return _this.utilService.manejarError(err); })
                .then(function (e) { return _this.loading = false; });
        })["catch"](function (e) { return _this.utilService.manejarError(e); });
    };
    ViajeComponent.prototype.terminarAprobacion = function () {
        var _this = this;
        if (this.autorizandoPorCentroDeCosto) {
            this.terminarAprobacionCeco();
            return;
        }
        var estatus = null;
        if (this.autorizandoPorSociedad)
            estatus = 'En Autorización';
        else if (this.autorizandoPorCentroDeCosto)
            estatus = 'Cerrado';
        this.viaje.comprobantes.forEach(function (e) {
            if (e.estatus == 'Rechazado')
                estatus = 'Rechazado';
        });
        var aprobado = true;
        var rechazado = false;
        var pendiente = false;
        for (var i = 0; i < this.viaje.comprobantes.length; i++) {
            if (this.viaje.comprobantes[i].estatus != 'Aprobado')
                aprobado = false;
            if (this.viaje.comprobantes[i].estatus == 'Rechazado')
                rechazado = true;
            if (this.viaje.comprobantes[i].estatus == 'Pendiente')
                pendiente = true;
        }
        if (pendiente && !rechazado) {
            this.dialog.open(dialogo_simple_component_1.DialogoSimpleComponent, {
                data: {
                    titulo: 'Quedan comprobantes pendientes de aprobar',
                    texto: 'No puede terminar aprobación si tiene comprobantes pendientes de aprobar, apruebe o rechace los comprobantes pendientes',
                    botones: [{ texto: 'Entendido', color: 'primary' },]
                }
            });
            return;
        }
        this.dialog.open(dialogo_simple_component_1.DialogoSimpleComponent, {
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
            }
        }).afterClosed().toPromise().then(function (valor) {
            if (valor == 'enviar') {
                _this.loading = true;
                _this.viajesService
                    .terminarAprobacion(_this.noTrayecto, estatus)
                    .then(function (result) {
                    if (result.status == '')
                        _this.cancelar();
                    else {
                        _this.dialog.open(dialogo_simple_component_1.DialogoSimpleComponent, {
                            data: {
                                titulo: result.status,
                                texto: result.message,
                                botones: [{ texto: 'Entendido', color: 'primary' }]
                            }
                        });
                        _this.actualizarViaje();
                    }
                })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                    .then(function () { return _this.loading = false; });
            }
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); });
    };
    ViajeComponent.prototype.aprobarViajeAutCC = function () {
        var _this = this;
        this.utilService
            .mostrarDialogoSimple("Aprobar viaje", "Está a punto de aprobar el viaje del autorizador de centro de costos, " +
            "esta operación es irreversible y resultará en la contabilización del viaje", "Aprobar y contabilizar viaje", "Cancelar", 'accent')
            .then(function (o) {
            if (o != "ok")
                return;
            _this.loading = true;
            _this.viajesService
                .aprobarViajeAutCC(_this.noTrayecto)
                .then(function (e) {
                var json = e.body;
                if (json.result && json.result.status) {
                    _this.actualizarViaje();
                    _this.utilService
                        .mostrarDialogoSimple(json.result.status, json.result.message);
                }
                else {
                    _this.utilService
                        .mostrarDialogoSimple("Éxito", "Se contabilizó el viaje")
                        .then(function (e) { return _this.cancelar(); });
                }
            })["catch"](function (err) { return _this.utilService.manejarError(err); })
                .then(function (e) { return _this.loading = false; });
        });
    };
    ViajeComponent.prototype.rechazarViajeAutCC = function () {
        var _this = this;
        var campos = [
            { label: "Comentarios", type: "textarea", placeholder: "El motivo del rechazo del viaje es ...", value: "" }
        ];
        this.utilService
            .mostrarDialogoConFormulario("Rechazar viaje", "Está a punto de rechazar el viaje del autorizador de centro de costos, esta operación es irreversible", "Rechazar viaje", "Cancelar", campos)
            .then(function (o) {
            if (o != "ok")
                return;
            _this.loading = true;
            _this.viajesService
                .rechazarViajeAutCC(_this.noTrayecto, campos[0].value)
                .then(function (e) {
                _this.utilService.mostrarDialogoSimple("Éxito", "Se rechazó el viaje");
                _this.cancelar();
            })["catch"](function (err) { return _this.utilService.manejarError(err); })
                .then(function (e) { return _this.loading = false; });
        });
    };
    ViajeComponent.prototype.obtenerDatosDeUsuario = function () {
        var _this = this;
        this.loading = true;
        this.usuarios.obtenerUsuario(localStorage.getItem('usuario'))
            .then(function (usuario) {
            _this.solicitud.departamento = usuario.departamentos[0];
            _this.solicitud.grupo = usuario.grupo01[0];
            _this.solicitud.empresa = _this.solicitud.grupo.id;
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ViajeComponent.prototype.actualizarViaje = function () {
        var _this = this;
        var promise = null;
        if (this.autorizandoPorCentroDeCosto)
            promise = this.viajesService.obtenerViajePendientesDeAutorizacionPorCeco(this.noTrayecto);
        else
            promise = this.viajesService.obtenerViaje(this.noTrayecto);
        this.loading = true;
        promise
            .then(function (viaje) {
            _this.titulo = 'Solicitud ' + _this.noTrayecto;
            _this.solicitud = viaje;
            if (_this.toInt(_this.solicitud.estatus) > 2) {
                //this.actualizarAlertas();
            }
            console.log(_this.solicitud);
            _this.actualizarSumaDeComprobantes();
            // para que tipo viaje del viaje corresponda a un ELEMENTO del ARREGLO de tipos viaje
            if (_this.viaje.tipoViaje && _this.viaje.tipoViaje.id)
                _this.viaje.tipoViaje = _this.tiposViaje.find(function (e) { return e.id == _this.viaje.tipoViaje.id; });
            if (_this.viaje.comprobantes && _this.autorizandoPorCentroDeCosto)
                _this.viaje.comprobantes.forEach(function (gv) { return gv.expandido = true; });
            /*if (this.solicitud.estatus != '1' && this.solicitud.estatus != '15')
                this.titulo += ' (' + this.solicitud.estatusDescripcion + ')';*/
            _this.limpiarSeleccionDeComprobantes();
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ViajeComponent.prototype.actualizarAlertas = function () {
        var _this = this;
        this.viajesService
            //.obtenerAlertasPorSolicitud('1')
            .obtenerAlertasPorSolicitud(this.noTrayecto)
            .then(function (alertas) {
            _this.contadorAlertas = 0;
            alertas.forEach(function (alerta) {
                if (alerta.tipo === 'E') {
                    _this.contadorAlertas++;
                }
                alerta.tipo = alerta.tipo === 'S' ? 'alert-success' :
                    (alerta.tipo === 'W' ? 'alert-warning' :
                        (alerta.tipo === 'E' ? 'alert-danger' : 'alert-info'));
            });
            _this.alertas = alertas;
            // console.log(this.alertas);
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ViajeComponent.prototype.actualizarSumaDeComprobantes = function () {
        var c = this.solicitud.comprobantes;
        if (!c)
            return;
        this.totalgv = new comprobante_1.Comprobante();
        this.totalgv.total = c.map(function (e) { return e.total; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalgv.subTotal = c.map(function (e) { return e.subTotal; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalgv.impuesto = c.map(function (e) { return e.impuesto; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalgv.iva = c.map(function (e) { return e.iva; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalgv.isr = c.map(function (e) { return e.isr; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalgv.ieps = c.map(function (e) { return e.ieps; }).reduce(function (a, b) { return a + b; }, 0);
    };
    ViajeComponent.prototype.descargar = function (id, ruta, formato) {
        var _this = this;
        this.loading = true;
        console.log(id + ' ' + formato);
        var filenameWithExtension = ruta.replace(/^.*[\\\/]/, '');
        var filename = filenameWithExtension.split('.')[0];
        console.log(filenameWithExtension);
        console.log(filename);
        this.viajesService
            .descargar(id, formato)
            .then(function (response) {
            console.log(response);
            _this.saveByteArray(filename, response, formato);
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ViajeComponent.prototype.descargarZip = function () {
        alert('Descargando ZIP...');
    };
    ViajeComponent.prototype.saveByteArray = function (reportName, byte, formato) {
        var file = (formato === 'pdf' ? new Blob([byte], { type: 'application/pdf' })
            : (formato === 'xml' ? new Blob([byte], { type: 'application/xml' })
                : new Blob([byte], { type: 'application/zip' })));
        var fileURL = URL.createObjectURL(file);
        var link = window.document.createElement('a');
        link.href = fileURL;
        link.download = reportName;
        link.click();
    };
    ViajeComponent.prototype.descargaFactura = function () {
        this.viajesService
            .getDescargaFactura(this.solicitud.numeroSolicitud)
            .subscribe(function (data) {
            var file = new Blob([data], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        });
    };
    ViajeComponent.prototype.eliminar = function () {
        var _this = this;
        this.dialog.open(dialogo_simple_component_1.DialogoSimpleComponent, {
            data: {
                titulo: 'Eliminar solicitud',
                texto: 'Está a punto de eliminar la solicitud con número de trayecto ' + this.noTrayecto +
                    '. Esta operación no es reversible.',
                botones: [
                    { texto: 'No eliminar', color: '', valor: '' },
                    { texto: 'Eliminar solicitud permanentemente', color: 'primary', valor: 'eliminar' },
                ]
            },
            disableClose: true
        }).afterClosed().toPromise().then(function (valor) {
            if (valor == 'eliminar') {
                _this.loading = true;
                _this.viajesService
                    .eliminarViaje(_this.noTrayecto)
                    .then(function (viaje) { return _this.cancelar(); })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                    .then(function () { return _this.loading = false; });
            }
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); });
    };
    ViajeComponent.prototype.cancelar = function () { this.location.back(); };
    ViajeComponent.prototype.crear = function () {
        var _this = this;
        this.loading = true;
        this.viajesService
            .crearViaje(this.solicitud)
            .then(function (solicitud) {
            _this.noTrayecto = '' + solicitud.numeroSolicitud;
            window.history.replaceState({}, 'no se para que es este parametro', 'viaticos-usuario/solicitudes-de-viaticos/' + _this.noTrayecto); // '/viajes/viajes-abiertos/'
            _this.editando = true;
            _this.ediandoCamposDeCabecera = false;
            _this.creando = false;
            _this.actualizarViaje();
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ViajeComponent.prototype.guardar = function () {
        var _this = this;
        this.loading = true;
        this.viajesService
            .actualizarViaje(this.noTrayecto, this.solicitud)
            .then(function (solicitud) {
            _this.ediandoCamposDeCabecera = false;
            _this.solicitud = solicitud; // este viaje no trae gastos, por eso invocamos actualizar aqui abajo
            _this.actualizarViaje();
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ViajeComponent.prototype.currentPattern = function () {
        this.formatoMonto = this.utilService.formatoMoneda(this.solicitud.totalAnticipo || 0);
    };
    ViajeComponent.prototype.validarCamposRequeridos = function () {
        if (this.solicitud.motivo !== '' &&
            this.solicitud.totalAnticipo !== null &&
            this.solicitud.fechaInicio !== '' &&
            this.solicitud.fechaFin !== '') {
            return true;
        }
        return false;
    };
    ViajeComponent = __decorate([
        core_1.Component({
            selector: 'app-viaje',
            templateUrl: './viaje.component.html',
            styleUrls: ['./viaje.component.scss']
        })
    ], ViajeComponent);
    return ViajeComponent;
}());
exports.ViajeComponent = ViajeComponent;
