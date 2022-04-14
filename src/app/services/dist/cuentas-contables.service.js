"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CuentasContablesService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var app_config_1 = require("../app.config");
var CuentasContablesService = /** @class */ (function () {
    function CuentasContablesService(http) {
        this.http = http;
        this.subcuenta = [];
        this.urlSubcuenta = app_config_1.API_URL + 'subcuentas-contables';
    }
    CuentasContablesService.prototype.obtenerSubcuentas = function () {
        return this.http.get(this.urlSubcuenta, {
            withCredentials: true,
            responseType: 'json',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        });
    };
    CuentasContablesService.prototype.obtenerSubcuenta = function (idsubcuenta) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .get(_this.urlSubcuenta + '/' + idsubcuenta, {
                withCredentials: true,
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
                observe: 'response',
                responseType: 'json'
            })
                .toPromise()
                .then(function (r) {
                resolve(r.body);
            })["catch"](function (r) {
                reject(r);
            });
        });
    };
    CuentasContablesService.prototype.crear = function (subcuenta) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .post(_this.urlSubcuenta + '/insertar/', subcuenta, {
                withCredentials: true, observe: 'response',
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
                .toPromise()
                .then(function (r) {
                resolve(r.status);
            })["catch"](function (r) {
                reject(r);
            });
        });
    };
    CuentasContablesService.prototype.eliminar = function (idsubcuenta) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http["delete"](_this.urlSubcuenta + '/' + idsubcuenta, {
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
                withCredentials: true, observe: 'response'
            })
                .toPromise()
                .then(function (r) {
                resolve(r);
            })["catch"](function (r) {
                reject(r);
            });
        });
    };
    CuentasContablesService.prototype.editar = function (idsubcuenta) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .put(_this.urlSubcuenta + '/', idsubcuenta, {
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
                withCredentials: true, observe: 'response'
            })
                .toPromise()
                .then(function (r) {
                resolve(r.status);
            })["catch"](function (r) {
                reject(r);
            });
        });
    };
    CuentasContablesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CuentasContablesService);
    return CuentasContablesService;
}());
exports.CuentasContablesService = CuentasContablesService;
