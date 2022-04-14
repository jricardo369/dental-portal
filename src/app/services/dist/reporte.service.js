"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReporteService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var app_config_1 = require("../app.config");
var ReporteService = /** @class */ (function () {
    function ReporteService(http) {
        this.http = http;
    }
    ReporteService.prototype.consultarSolicitudesReporte = function (estatus, fechaI, fechaF, empresas) {
        var _this = this;
        var params = new http_1.HttpParams();
        params = params.set('fechaInicio', fechaI);
        params = params.set('fechaFin', fechaF);
        params = params.set('estatus', estatus);
        params = params.set('empresas', empresas);
        console.log('ENTRO');
        console.log('params:' + params);
        return new Promise(function (resolve, reject) { return _this.http
            .get(app_config_1.API_URL + 'viaticos-usuario/solicitudes-de-viaticos/reporte', {
            params: params,
            withCredentials: true,
            observe: 'body',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            resolve(response);
        })["catch"](function (reason) { return reject(reason); }); });
    };
    ReporteService.prototype.consultarPrepoliza = function (no) {
        var _this = this;
        return new Promise(function (resolve, reject) { return _this.http
            .get(app_config_1.API_URL + 'prepolizas/' + no, {
            withCredentials: true,
            observe: 'body',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            resolve(response);
        })["catch"](function (reason) { return reject(reason); }); });
    };
    ReporteService.prototype.descargarSolicitudesReporte = function (empleado, estatus, fechaI, fechaF, empresas) {
        var params = new http_1.HttpParams();
        params = params.set('fechaInicio', fechaI);
        params = params.set('fechaFin', fechaF);
        params = params.set('estatus', estatus);
        params = params.set('empresas', empresas);
        params = params.set('usuario', empleado);
        console.log('ENTRO');
        console.log('params:' + params);
        var httpHeaders = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        });
        var options = {
            params: params,
            headers: httpHeaders,
            responseType: 'blob'
        };
        return this.http.get(app_config_1.API_URL + 'reportes-pdf/pdf-reporte', options);
    };
    ReporteService.prototype.consultarEstatus = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return _this.http
            .get(app_config_1.API_URL + 'estatus', {
            withCredentials: true,
            observe: 'body',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        })
            .toPromise()
            .then(function (response) {
            console.log('Estatus');
            console.log(response);
            resolve(response);
        })["catch"](function (reason) { return reject(reason); }); });
    };
    ReporteService.prototype.consultarOrganizacion = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return _this.http
            .get(app_config_1.API_URL + 'organizacion', {
            withCredentials: true,
            observe: 'body',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        })
            .toPromise()
            .then(function (response) {
            console.log('Organizacion');
            console.log(response);
            resolve(response);
        })["catch"](function (reason) { return reject(reason); }); });
    };
    ReporteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ReporteService);
    return ReporteService;
}());
exports.ReporteService = ReporteService;
