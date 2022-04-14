"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TareasProgramadasService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var app_config_1 = require("../app.config");
var TareasProgramadasService = /** @class */ (function () {
    function TareasProgramadasService(http) {
        this.http = http;
    }
    TareasProgramadasService.prototype.getTareas = function () {
        return this.http.get(app_config_1.API_URL + 'tareas-programadas', {
            withCredentials: true,
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        });
    };
    TareasProgramadasService.prototype.asignarVariable = function (arrTareas) {
        return this.http.put(app_config_1.API_URL + 'tareas-programadas', arrTareas, {
            withCredentials: true,
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
            observe: 'response'
        }).toPromise();
    };
    TareasProgramadasService.prototype.polizaFox = function () {
        var tok = localStorage.getItem('auth_token');
        return this.http.get(app_config_1.API_URL + 'jobs/poliza-fox', {
            withCredentials: true,
            observe: 'response',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', tok)
        }).toPromise();
    };
    TareasProgramadasService.prototype.cargaEntrega = function (fecha) {
        var tok = localStorage.getItem('auth_token');
        return this.http.get(app_config_1.API_URL + 'jobs/carga-entrega/' + fecha, {
            withCredentials: true,
            observe: 'response',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', tok)
        }).toPromise();
    };
    TareasProgramadasService.prototype.cargaComprobacion = function (fecha) {
        var tok = localStorage.getItem('auth_token');
        return this.http.get(app_config_1.API_URL + 'jobs/carga-comprobacion/' + fecha, {
            withCredentials: true,
            observe: 'response',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', tok)
        }).toPromise();
    };
    TareasProgramadasService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TareasProgramadasService);
    return TareasProgramadasService;
}());
exports.TareasProgramadasService = TareasProgramadasService;
