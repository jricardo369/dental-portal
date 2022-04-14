"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViajesComponent = void 0;
var core_1 = require("@angular/core");
var ViajesComponent = /** @class */ (function () {
    function ViajesComponent(viajesService, utilService, activatedRoute, router, dialog) {
        this.viajesService = viajesService;
        this.utilService = utilService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.dialog = dialog;
        this.titulo = 'Viajes';
        this.loading = false;
        this.permiteCrearViaje = false;
        localStorage.setItem('manual_name', 'Manual de Viáticos');
        localStorage.setItem('manual_file', 'ManualViaticos');
        if (this.activatedRoute.routeConfig.path == 'viajes-abiertos') {
            this.titulo = 'Tus solicitudes de viáticos abiertas';
            this.permiteCrearViaje = true;
        }
        if (this.activatedRoute.routeConfig.path == 'viajes-cerrados')
            this.titulo = 'Tus viajes cerrados';
        if (this.activatedRoute.routeConfig.path == 'autorizaciones')
            this.titulo = 'Autorizaciones por sociedad pendientes';
        if (this.activatedRoute.routeConfig.path == 'autorizaciones-ceco')
            this.titulo = 'Autorizaciones por centro de costo pendientes';
        if (this.activatedRoute.routeConfig.path == 'autorizaciones-aut-cc')
            this.titulo = 'Autorizaciones de autorizadores pendientes';
        //this.actualizar();
        this.obtenerSolicitudesDeUsuario();
    }
    ViajesComponent.prototype.nuevoViaje = function () { this.router.navigateByUrl('/viajes/nuevo-viaje'); };
    ViajesComponent.prototype.actualizar = function () {
        var _this = this;
        // AUTORIZACIONES POR CECO
        if (this.activatedRoute.routeConfig.path == 'autorizaciones-ceco') {
            this.loading = true;
            this.viajesService
                .obtenerViajesPendientesDeAutorizacionPorCeco()
                .then(function (viajes) {
                _this.viajes = viajes;
                _this.ordenarViajes();
            })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                .then(function () { return _this.loading = false; });
            return;
        }
        // AUTORIZACIONES DE AUTORIZADORES
        if (this.activatedRoute.routeConfig.path == 'autorizaciones-aut-cc') {
            this.loading = true;
            this.viajesService
                .obtenerViajesDeAutorizadoresPendientesDeAutorizacion()
                .then(function (viajes) {
                _this.viajes = viajes;
                _this.ordenarViajes();
            })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                .then(function () { return _this.loading = false; });
            return;
        }
        // TODOS LOS DEMAS
        this.loading = true;
        this.viajesService
            .obtenerViajes(this.activatedRoute.routeConfig.path == 'viajes-abiertos', this.activatedRoute.routeConfig.path == 'viajes-cerrados', this.activatedRoute.routeConfig.path == 'autorizaciones')
            .then(function (viajes) {
            _this.viajes = viajes;
            _this.ordenarViajes();
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ViajesComponent.prototype.obtenerSolicitudesDeUsuario = function () {
        var _this = this;
        this.loading = true;
        this.viajesService
            // .consultarSolicitudesDeUsuarioPorEstatus(localStorage.getItem('usuario'), ['abiertos','cerrados'])
            .consultarSolicitudesDeUsuarioPorEstatus('4', this.definirEstatusSolicitudes())
            .then(function (solicitudes) {
            console.log('solicitudes');
            _this.solicitudes = solicitudes;
            _this.ordenarSolicitudes();
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ViajesComponent.prototype.ordenarViajes = function () {
        this.viajes.sort(function (va, vb) {
            var a = va.noTrayecto;
            var b = va.noTrayecto;
            if (va.estatus == 'Abierto')
                a /= 10000;
            if (vb.estatus == 'Abierto')
                b /= 10000;
            return a - b;
        });
    };
    ViajesComponent.prototype.definirEstatusSolicitudes = function () {
        var estatus;
        if (this.activatedRoute.routeConfig.path === 'viajes-cerrados') {
            estatus = '15';
        }
        else {
            estatus = '';
            for (var i = 1; i < 15; i++) {
                if (i > 1) {
                    estatus += ',';
                }
                estatus += i.toString();
            }
        }
        return estatus;
    };
    ViajesComponent.prototype.ordenarSolicitudes = function () {
        this.solicitudes.sort(function (a, b) { return parseInt(a.numeroSolicitud) > parseInt(b.numeroSolicitud) ? -1 : 1; });
    };
    ViajesComponent = __decorate([
        core_1.Component({
            selector: 'app-viajes',
            templateUrl: './viajes.component.html',
            styleUrls: ['./viajes.component.css']
        })
    ], ViajesComponent);
    return ViajesComponent;
}());
exports.ViajesComponent = ViajesComponent;
