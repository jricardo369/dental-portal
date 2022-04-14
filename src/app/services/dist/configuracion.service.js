"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfiguracionService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var app_config_1 = require("../app.config");
var ConfiguracionService = /** @class */ (function () {
    //arrconfi = new Configuracion;
    function ConfiguracionService(http) {
        this.http = http;
        this.config = null;
    }
    ConfiguracionService.prototype.asignarVariable = function (arrconfi) {
        return this.http.put(app_config_1.API_URL + 'configuraciones', arrconfi, {
            withCredentials: true,
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
            observe: 'response'
        }).toPromise();
    };
    ConfiguracionService.prototype.obtenerVariable = function (name) {
        return this.http.get(app_config_1.API_URL + "config/get", {
            withCredentials: true,
            params: { nombre: name },
            observe: 'response'
        }).toPromise();
    };
    ConfiguracionService.prototype.getConf = function () {
        return this.http.get(app_config_1.API_URL + 'configuraciones', {
            withCredentials: true,
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        });
    };
    ConfiguracionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ConfiguracionService);
    return ConfiguracionService;
}());
exports.ConfiguracionService = ConfiguracionService;
