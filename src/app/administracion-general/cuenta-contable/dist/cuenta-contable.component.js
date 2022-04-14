"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CuentaContableComponent = void 0;
var core_1 = require("@angular/core");
var subcuenta_1 = require("../../../model/subcuenta");
var CuentaContableComponent = /** @class */ (function () {
    function CuentaContableComponent(router, route, reporteService, utilService, cuentasservice) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.reporteService = reporteService;
        this.utilService = utilService;
        this.cuentasservice = cuentasservice;
        this.subcuenta = new subcuenta_1.Subcuenta();
        this.cargandoTV = false;
        this.msjerrorTV = false;
        this.msjeliminarTV = false;
        this.loading = false;
        route.params.subscribe(function (params) {
            _this.idcuenta = params['id'];
            if (_this.idcuenta.toString() != 'nueva-cuenta') {
                _this.refresh();
            }
            else {
                _this.subcuenta.codigo = "";
            }
        });
        this.obtenerOrganizacion();
    }
    CuentaContableComponent.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    CuentaContableComponent.prototype.refresh = function () {
        var _this = this;
        this.cargandoTV = true;
        this.cuentasservice.obtenerSubcuenta(Number(this.idcuenta))
            .then(function (tv) {
            _this.subcuenta = tv;
            _this.cargandoTV = false;
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.cargandoTV = false; });
    };
    CuentaContableComponent.prototype.cancel = function () {
        this.router.navigate(['administracion/general/cuentas-contables']);
    };
    CuentaContableComponent.prototype.crear = function () {
        var _this = this;
        this.cargandoTV = true;
        if (this.subcuenta.codigo === null || this.subcuenta.codigo === '') {
            this.msjTV = "Ingrese el código de la cuenta.";
            this.msjerrorTV = true;
            this.cargandoTV = false;
        }
        else {
            this.cuentasservice.crear(this.subcuenta)
                .then(function (r) {
                _this.cargandoTV = false;
                if (r === 200) {
                    _this.router.navigate(['administracion/general/cuentas-contables']);
                }
            })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                .then(function () { return _this.loading = false; });
        }
    };
    CuentaContableComponent.prototype.guardar = function () {
        var _this = this;
        this.cargandoTV = true;
        if (this.subcuenta.codigo == null || this.subcuenta.codigo == "") {
            this.msjTV = "Ingrese el código de la cuenta.";
            this.msjerrorTV = true;
            this.cargandoTV = false;
        }
        else {
            this.cuentasservice.editar(this.subcuenta)
                .then(function (r) {
                _this.cargandoTV = false;
                _this.router.navigate(['administracion/general/cuentas-contables']);
            })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                .then(function () { return _this.loading = false; });
        }
    };
    CuentaContableComponent.prototype.obtenerOrganizacion = function () {
        var _this = this;
        this.reporteService
            .consultarOrganizacion()
            .then(function (organizacion) {
            console.log('Organizacion');
            _this.organizacion = organizacion;
            console.log(_this.organizacion);
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    CuentaContableComponent.prototype.eliminar = function () {
        var _this = this;
        this.utilService
            .mostrarDialogoSimple("Eliminar la cuenta contable " + this.subcuenta.codigo, "Estás a punto de borrar la cuenta contable  " + this.subcuenta.codigo + ", esta operación es irreversible ¿Estás seguro que deseas eliminar?", "Eliminar la cuenta  " + this.subcuenta.codigo, "Cancelar", 'accent')
            .then(function (o) {
            if (o != "ok")
                return;
            _this.cargandoTV = true;
            _this.cuentasservice.eliminar(Number(_this.idcuenta))
                .then(function (el) {
                if (el.status !== 200) {
                    _this.cargandoTV = false;
                    _this.msjerrorTV = true;
                    _this.respuestaTV = el.status;
                    _this.msjTV = el.message;
                }
                else {
                    _this.cargandoTV = true;
                    _this.router.navigate(['administracion/general/cuentas-contables']);
                }
            });
        });
    };
    CuentaContableComponent = __decorate([
        core_1.Component({
            selector: 'app-cuenta-contable',
            templateUrl: './cuenta-contable.component.html',
            styleUrls: ['./cuenta-contable.component.css']
        })
    ], CuentaContableComponent);
    return CuentaContableComponent;
}());
exports.CuentaContableComponent = CuentaContableComponent;
