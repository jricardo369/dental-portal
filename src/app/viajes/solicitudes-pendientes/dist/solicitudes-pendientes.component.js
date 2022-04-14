"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SolicitudesPendientesComponent = void 0;
var core_1 = require("@angular/core");
var pagination_1 = require("src/util/pagination");
var SolicitudesPendientesComponent = /** @class */ (function () {
    function SolicitudesPendientesComponent(viajesService, utilService, activatedRoute, router) {
        this.viajesService = viajesService;
        this.utilService = utilService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.titulo = 'Viajes';
        this.loading = false;
        this.permiteCrearViaje = false;
        this.paginacion = new pagination_1.PaginationManager();
        localStorage.setItem('manual_name', 'Manual de Viáticos');
        localStorage.setItem('manual_file', 'ManualViaticos');
        this.titulo = 'Aprobaciones de solicitud pendientes';
        this.obtenerSolicitudes();
    }
    SolicitudesPendientesComponent.prototype.obtenerSolicitudes = function () {
        var _this = this;
        this.loading = true;
        this.viajesService
            .consultarSolicitudesPendientes(localStorage.getItem('usuario'))
            .then(function (solicitudes) {
            console.log('solicitudes');
            _this.solicitudes = solicitudes;
            _this.ordenarSolicitudes();
            _this.paginacion.setArray(_this.solicitudes);
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    SolicitudesPendientesComponent.prototype.ordenarSolicitudes = function () {
        this.solicitudes.sort(function (a, b) { return parseInt(a.numeroSolicitud) > parseInt(b.numeroSolicitud) ? -1 : 1; });
    };
    SolicitudesPendientesComponent = __decorate([
        core_1.Component({
            selector: 'app-solicitudes-pendientes',
            templateUrl: './solicitudes-pendientes.component.html',
            styleUrls: ['./solicitudes-pendientes.component.css']
        })
    ], SolicitudesPendientesComponent);
    return SolicitudesPendientesComponent;
}());
exports.SolicitudesPendientesComponent = SolicitudesPendientesComponent;
