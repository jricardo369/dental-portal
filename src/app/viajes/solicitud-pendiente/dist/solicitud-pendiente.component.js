"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SolicitudPendienteComponent = void 0;
var core_1 = require("@angular/core");
var app_config_1 = require("../../app.config");
var solicitud_1 = require("./../../../model/solicitud");
var SolicitudPendienteComponent = /** @class */ (function () {
    function SolicitudPendienteComponent(viajesService, utilService, router, route) {
        var _this = this;
        this.viajesService = viajesService;
        this.utilService = utilService;
        this.router = router;
        this.route = route;
        this.msjAprobar = false;
        this.msjRechazar = false;
        this.mostrarMensaje = false;
        this.loading = false;
        this.rechazar = false;
        this.solicitud = new solicitud_1.Solicitud;
        this.motivoRechazo = "";
        route.params.subscribe(function (params) {
            _this.idSolicitud = params['id'];
        });
        this.obtenerSolicitud();
    }
    SolicitudPendienteComponent.prototype.obtenerSolicitud = function () {
        var _this = this;
        this.rechazar = false;
        this.loading = true;
        this.viajesService
            .obtenerViaje(this.idSolicitud)
            .then(function (solicitudes) {
            console.log('solicitudes');
            _this.solicitud = solicitudes;
            console.log(_this.solicitud);
            _this.loading = false;
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    SolicitudPendienteComponent.prototype.cancel = function () {
        this.router.navigate(['viajes/solicitudes']);
    };
    SolicitudPendienteComponent.prototype.imprimir = function () {
        var url = app_config_1.API_URL + 'reportes-pdf/pdf-solicitud/' + this.idSolicitud;
        window.open(url, "_blank");
    };
    SolicitudPendienteComponent.prototype.descargaFactura = function () {
        this.viajesService
            .getDescargaFactura(this.idSolicitud)
            .subscribe(function (data) {
            var file = new Blob([data], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        });
    };
    SolicitudPendienteComponent.prototype.aprobarViaje = function () {
        var _this = this;
        var campos = [];
        campos.push({ label: "¿Desea agregar algún comentario?", type: "textarea", placeholder: "Comentario ...", value: "", maxLength: "45" });
        this.utilService
            .mostrarDialogoConFormulario("Aprobar solicitud", "Está a punto de aprobar la solicitud, " +
            " esta operación es irreversible", "Aprobar solicitud", "Cancelar", campos, 'accent')
            .then(function (o) {
            if (o != "ok")
                return;
            _this.loading = true;
            _this.viajesService
                .aprobarRechazar(_this.idSolicitud, localStorage.getItem('usuario'), 'AUTORIZAR', campos[0].value)
                .then(function (response) {
                _this.tituloMensaje = 'Cambio realizado correctamente';
                _this.mostrarMensaje = true;
                console.log(response.status);
                _this.loading = false;
                _this.cancel();
            })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                .then(function () { return _this.loading = false; });
        });
    };
    SolicitudPendienteComponent.prototype.rechazarViaje = function () {
        var _this = this;
        var campos = [];
        campos.push({ label: "Motivo", type: "textarea", placeholder: "El motivo del rechazo de la solicitud es ...", value: "", maxLength: "45" });
        this.utilService
            .mostrarDialogoSimple("Rechazar solicitud", "Está a punto de rechazar la solicitud" +
            " esta operación rechazará la solicitud y se tendrá que volver a solicitar la aprobación", "Rechazar solicitud", "Cancelar", 'accent')
            .then(function (o) {
            if (o != "ok")
                return;
            _this.utilService
                .mostrarDialogoConFormulario("Motivo de rechazo", "Por favor ingrese el motivo de rechazo: ", "Rechazar solicitud", "Cancelar", campos, 'accent')
                .then(function (o) {
                if (o != "ok")
                    return;
                if (campos[0].value.trim() == "" || campos[0].value.length === 0) {
                    _this.tituloMensaje = 'Error ';
                    _this.textoMensaje = 'Ingrese un motivo de rechazo con longitud valida';
                    _this.mostrarMensaje = true;
                }
                else {
                    _this.loading = true;
                    _this.viajesService
                        .aprobarRechazar(_this.idSolicitud, localStorage.getItem('usuario'), 'RECHAZAR', campos[0].value)
                        .then(function (response) {
                        _this.tituloMensaje = 'Cambio realizado correctamente';
                        _this.mostrarMensaje = true;
                        console.log(response.status);
                        _this.loading = false;
                        _this.cancel();
                    })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                        .then(function () { return _this.loading = false; });
                }
            });
        });
    };
    SolicitudPendienteComponent = __decorate([
        core_1.Component({
            selector: 'app-solicitud-pendiente',
            templateUrl: './solicitud-pendiente.component.html',
            styleUrls: ['./solicitud-pendiente.component.css']
        })
    ], SolicitudPendienteComponent);
    return SolicitudPendienteComponent;
}());
exports.SolicitudPendienteComponent = SolicitudPendienteComponent;
