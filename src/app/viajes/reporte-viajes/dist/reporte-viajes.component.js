"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReporteViajesComponent = void 0;
var core_1 = require("@angular/core");
var pagination_1 = require("src/util/pagination");
var ReporteViajesComponent = /** @class */ (function () {
    function ReporteViajesComponent(reporteService, utilService, slider, select) {
        this.reporteService = reporteService;
        this.utilService = utilService;
        this.slider = slider;
        this.select = select;
        this.mostrarFiltros = false;
        this.titulo = 'Reporte de solicitudes';
        this.loading = false;
        this.permiteCrearViaje = false;
        this.todayISOString = new Date().toISOString();
        this.fechaI = '2020-01-01';
        this.paginacion = new pagination_1.PaginationManager();
        this.selected = ['1'];
        this.selected2 = ['4MS'];
        var fecha = this.todayISOString.split('T', 1);
        this.fechaF = fecha[0];
        this.estSel = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15";
        this.orgSel = "4MS";
        this.obtenerSolicitudes();
        this.obtenerEstatus();
    }
    ReporteViajesComponent.prototype.obtenerSolicitudes = function () {
        var _this = this;
        this.loading = true;
        this.reporteService
            .consultarSolicitudesReporte(this.estSel, this.fechaI, this.fechaF, localStorage.getItem('empresas'))
            .then(function (solicitudes) {
            console.log('REPORTE DE VIAJES');
            _this.solicitudes = solicitudes;
            _this.ordenarSolicitudes();
            _this.paginacion.setArray(_this.solicitudes);
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ReporteViajesComponent.prototype.descargaViajes = function () {
        this.loading = true;
        this.reporteService
            .descargarSolicitudesReporte(localStorage.getItem('usuario'), this.estSel, this.fechaI, this.fechaF, this.orgSel)
            .subscribe(function (data) {
            var file = new Blob([data], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        });
        this.loading = false;
    };
    ReporteViajesComponent.prototype.ordenarSolicitudes = function () {
        this.solicitudes.sort(function (a, b) { return parseInt(a.numeroSolicitud) > parseInt(b.numeroSolicitud) ? -1 : 1; });
    };
    ReporteViajesComponent.prototype.obtenerEstatus = function () {
        var _this = this;
        this.reporteService
            .consultarEstatus()
            .then(function (estatus) {
            console.log('estatus');
            _this.estatus = estatus;
            console.log(_this.estatus);
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ReporteViajesComponent.prototype.seleEst = function () {
        this.estSel = "";
        for (var i = 0; i < this.selected.length; i++) {
            this.estSel = this.estSel + this.selected[i] + ',';
        }
        this.obtenerSolicitudes();
    };
    ReporteViajesComponent = __decorate([
        core_1.Component({
            selector: 'app-reporte-viajes',
            templateUrl: './reporte-viajes.component.html',
            styleUrls: ['./reporte-viajes.component.scss']
        })
    ], ReporteViajesComponent);
    return ReporteViajesComponent;
}());
exports.ReporteViajesComponent = ReporteViajesComponent;
