"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CuentasContablesComponent = void 0;
var core_1 = require("@angular/core");
var CuentasContablesComponent = /** @class */ (function () {
    function CuentasContablesComponent(router, cuentasService, utilService) {
        this.router = router;
        this.cuentasService = cuentasService;
        this.utilService = utilService;
        this.subcuenta = [];
        this.cargando = false;
        this.refresh();
    }
    CuentasContablesComponent.prototype.refresh = function () {
        var _this = this;
        this.cargando = true;
        this.cuentasService.obtenerSubcuentas()
            .subscribe(function (result) {
            _this.subcuenta = result;
            _this.cargando = false;
            console.log(_this.subcuenta);
        }, function (error) {
            console.log(error);
            _this.cargando = false;
        });
    };
    CuentasContablesComponent.prototype.nuevo = function () {
        this.router.navigate(['/cuenta/nueva-cuenta']);
    };
    CuentasContablesComponent = __decorate([
        core_1.Component({
            selector: 'app-cuentas-contables',
            templateUrl: './cuentas-contables.component.html',
            styleUrls: ['./cuentas-contables.component.css']
        })
    ], CuentasContablesComponent);
    return CuentasContablesComponent;
}());
exports.CuentasContablesComponent = CuentasContablesComponent;
