"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComprobacionPendienteComponent = void 0;
var core_1 = require("@angular/core");
var solicitud_1 = require("./../../../model/solicitud");
var comprobante_1 = require("src/model/comprobante");
var ComprobacionPendienteComponent = /** @class */ (function () {
    function ComprobacionPendienteComponent(activatedRoute, utilService, viajesService, router, location, dialog) {
        var _this = this;
        this.utilService = utilService;
        this.viajesService = viajesService;
        this.router = router;
        this.location = location;
        this.dialog = dialog;
        this.alerts = [];
        this.alertas = [];
        this.contadorAlertas = 0;
        this.noTrayecto = null;
        this.titulo = null;
        this.solicitud = new solicitud_1.Solicitud();
        this.loading = false;
        this.motivoRechazo = '';
        this.mostrarCamposOcultos = false;
        this.esDirector = false;
        this.esAprobador = false;
        this.esContador = false;
        this.esGerente = false;
        this.esPrestador = false;
        this.voboDirector = false;
        this.creando = false;
        this.editando = false;
        this.ediandoCamposDeCabecera = false;
        this.totalgv = new comprobante_1.Comprobante();
        // -----------------------------------------------------------------------
        // toInt(cadena: string): number {
        //     return parseInt(cadena);
        // }
        this.comprobantesSeleccionados = [];
        this.solicitud.departamento = { id: '', descripcion: '' }; // marca error sino se inicializa
        this.solicitud.grupo = { id: '', nombre: '' }; // marca error sino se inicializa
        if (activatedRoute.routeConfig.path == 'comprobaciones-contador/:id') {
            this.editando = true;
        }
        if (this.editando) {
            activatedRoute.params.forEach(function (data) {
                _this.noTrayecto = data.id;
                _this.actualizarViaje();
            });
        }
    }
    ComprobacionPendienteComponent.prototype.debug = function (event) {
        console.log(event);
    };
    ComprobacionPendienteComponent.prototype.seleccionar = function (e) {
        e.seleccionado = !e.seleccionado;
        this.actualizarComprobantesSeleccionados();
    };
    ComprobacionPendienteComponent.prototype.actualizarComprobantesSeleccionados = function () {
        var _this = this;
        this.noComprobantesAprobados = 0;
        if (!this.solicitud)
            return 0;
        if (!this.solicitud.comprobantes)
            return 0;
        this.comprobantesSeleccionados.length = 0;
        this.solicitud.comprobantes.forEach(function (e) {
            if (e.seleccionado) {
                _this.comprobantesSeleccionados.push(e);
            }
            if (e.estatusComprobante == 'AUTORIZAR') {
                _this.noComprobantesAprobados = _this.noComprobantesAprobados + 1;
                console.log(_this.noComprobantesAprobados);
            }
        });
        return this.comprobantesSeleccionados.length;
    };
    ComprobacionPendienteComponent.prototype.limpiarSeleccionDeComprobantes = function () {
        if (!this.solicitud || !this.solicitud.comprobantes)
            return;
        this.solicitud.comprobantes.forEach(function (e) { return e.seleccionado = false; });
        this.comprobantesSeleccionados.length = 0;
    };
    ComprobacionPendienteComponent.prototype.aprobarSolicitud = function () {
        var _this = this;
        var campos = [];
        campos.push({ label: "¿Desea agregar algún comentario?", type: "textarea", placeholder: "Comentario ...", value: "", maxLength: "45" });
        this.utilService
            .mostrarDialogoConFormulario("Aprobar comprobación", "Está a punto de aprobar la comprobación " + this.noTrayecto + "," +
            " esta operación es irreversible.", "Aprobar comprobación " + this.noTrayecto, "Cancelar", campos, 'accent')
            .then(function (o) {
            if (o != "ok")
                return;
            _this.loading = true;
            _this.viajesService
                .autorizarRechazarSolicitudPorContador(_this.solicitud.numeroSolicitud.toString(), 'AUTORIZAR', campos[0].value)
                .then(function () {
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
                _this.cancelar();
            })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                .then(function () { return _this.loading = false; });
        });
    };
    ComprobacionPendienteComponent.prototype.voBoSolicitud = function () {
        var _this = this;
        var campos = [];
        campos.push({ label: "¿Desea agregar algún comentario?", type: "textarea", placeholder: "Comentario ...", value: "", maxLength: "45" });
        this.utilService
            .mostrarDialogoConFormulario("Vobo. a la comprobación", "Está a punto de dar el vobo. a la comprobación " + this.noTrayecto + "," +
            " esta operación es irreversible.", "Dar vobo. a la comprobación " + this.noTrayecto, "Cancelar", campos, 'accent')
            .then(function (o) {
            if (o != "ok")
                return;
            _this.loading = true;
            _this.viajesService
                .autorizarRechazarSolicitudPorContador(_this.solicitud.numeroSolicitud.toString(), 'AUTORIZAR')
                .then(function () {
                /*if (this.solicitud.estatus == '5' || this.solicitud.estatus == '8' || this.solicitud.estatus == '11') {
                    this.voboDirector = true;
                }
                else {
                    this.cancelar();
                }*/
                _this.cancelar();
            })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                .then(function () { return _this.loading = false; });
        });
    };
    ComprobacionPendienteComponent.prototype.rechazarSolicitud = function () {
        var _this = this;
        var campos = [];
        campos.push({ label: "Comentarios", type: "textarea", placeholder: "El motivo del rechazo de la comprobación es ...", value: "", maxLength: "200" });
        this.utilService
            .mostrarDialogoConFormulario("Rechazar comprobación", "Está a punto de rechazar la comprobación con número de trayecto " + this.noTrayecto +
            ". Por favor, escriba el motivo del rechazo.", "Rechazar comprobación " + this.noTrayecto, "No rechazar ahora", campos, 'accent').then(function (valor) {
            if (valor != 'ok')
                return;
            _this.loading = true;
            _this.viajesService
                .autorizarRechazarSolicitudPorContador(_this.solicitud.numeroSolicitud.toString(), 'RECHAZAR', campos[0].value)
                .then(function () {
                /*this.actualizarViaje();
                this.limpiarSeleccionDeComprobantes();*/
                _this.cancelar();
            })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                .then(function () { return _this.loading = false; });
        })["catch"](function (e) { return _this.utilService.manejarError(e); });
    };
    ComprobacionPendienteComponent.prototype.aprobarComprobantesSeleccionados = function () {
        var _this = this;
        //this.loading = true;
        this.comprobantesSeleccionados.forEach(function (comprobante) {
            _this.loading = true;
            _this.viajesService
                .autorizarRechazarComprobantePorContador(comprobante.idComprobanteViatico.toString(), 'AUTORIZAR')
                .then(function () {
                _this.actualizarViaje();
                _this.limpiarSeleccionDeComprobantes();
            })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                .then(function () { return _this.loading = false; });
        });
    };
    // -----------------------------------------------------------------------
    ComprobacionPendienteComponent.prototype.actualizarViaje = function () {
        var _this = this;
        this.loading = true;
        this.viajesService.obtenerViaje(this.noTrayecto)
            .then(function (viaje) {
            _this.titulo = 'Solicitud ' + _this.noTrayecto;
            _this.solicitud = viaje;
            console.log(_this.solicitud);
            _this.actualizarSumaDeComprobantes();
            _this.limpiarSeleccionDeComprobantes();
            var roles = localStorage.getItem('rolAprobador').split(",");
            if (roles.some(function (r) { return r === 'CONTABILIDAD'; }))
                _this.esContador = true;
            if (roles.some(function (r) { return r === 'GERENTES'; }))
                _this.esGerente = true;
            if (roles.some(function (r) { return r === 'CONTADOR PRESTADORA'; }))
                _this.esPrestador = true;
            if (roles.some(function (r) { return r === 'DIRECTOR'; }))
                _this.esDirector = true;
            if (_this.esContador || _this.esGerente || _this.esPrestador)
                _this.esAprobador = true;
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ComprobacionPendienteComponent.prototype.actualizarSumaDeComprobantes = function () {
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
        this.totalgv.noAplica = c.map(function (e) { return e.noAplica; }).reduce(function (a, b) { return a + b; }, 0);
    };
    ComprobacionPendienteComponent.prototype.descargar = function (id, ruta, formato) {
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
    ComprobacionPendienteComponent.prototype.saveByteArray = function (reportName, byte, formato) {
        var file = (formato === 'pdf' ? new Blob([byte], { type: 'application/pdf' })
            : (formato === 'xml' ? new Blob([byte], { type: 'application/xml' })
                : new Blob([byte], { type: 'application/zip' })));
        var fileURL = URL.createObjectURL(file);
        var link = window.document.createElement('a');
        link.href = fileURL;
        link.download = reportName;
        link.click();
    };
    ComprobacionPendienteComponent.prototype.descargaFactura = function () {
        this.viajesService
            .getDescargaFactura(this.solicitud.numeroSolicitud)
            .subscribe(function (data) {
            var file = new Blob([data], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        });
    };
    ComprobacionPendienteComponent.prototype.cancelar = function () { this.location.back(); };
    ComprobacionPendienteComponent.prototype.poliza = function () {
        this.router.navigate(['/poliza/' + this.noTrayecto]);
    };
    ComprobacionPendienteComponent.prototype.eventoNoAplica = function (comprobante) {
        var _this = this;
        var respuesta = false;
        this.loading = true;
        this.viajesService
            .eventoNoAplica(comprobante.idComprobanteViatico, !comprobante.aprobacionNoAplica)
            .then(function () {
            respuesta = !comprobante.aprobacionNoAplica;
        })["catch"](function (reason) {
            respuesta = comprobante.aprobacionNoAplica;
            _this.utilService.manejarError(reason);
        }).then(function () { return _this.loading = false; });
        return respuesta;
    };
    ComprobacionPendienteComponent = __decorate([
        core_1.Component({
            selector: 'app-comprobacion-pendiente',
            templateUrl: './comprobacion-pendiente.component.html',
            styleUrls: ['./comprobacion-pendiente.component.scss']
        })
    ], ComprobacionPendienteComponent);
    return ComprobacionPendienteComponent;
}());
exports.ComprobacionPendienteComponent = ComprobacionPendienteComponent;
