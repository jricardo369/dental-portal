"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NivelesTopesCargaComponent = void 0;
var core_1 = require("@angular/core");
var nivel_1 = require("src/model/nivel");
var NivelesTopesCargaComponent = /** @class */ (function () {
    function NivelesTopesCargaComponent(router, nivelesService, utilService) {
        this.router = router;
        this.nivelesService = nivelesService;
        this.utilService = utilService;
        this.niveles = [];
        this.niv = new nivel_1.Nivel;
        this.cargando = false;
        this.refresh();
    }
    NivelesTopesCargaComponent.prototype.refresh = function () {
        var _this = this;
        this.cargando = true;
        this.nivelesService
            .obtenerNiveles()
            .subscribe(function (result) {
            _this.niveles = result;
            _this.cargando = false;
        }, function (error) {
            console.log(error);
            _this.cargando = false;
        });
    };
    NivelesTopesCargaComponent.prototype.nuevo = function () {
        this.router.navigate(['/nivel/nuevo-nivel']);
    };
    NivelesTopesCargaComponent = __decorate([
        core_1.Component({
            selector: 'app-niveles-topes-carga',
            templateUrl: './niveles-topes-carga.component.html',
            styleUrls: ['./niveles-topes-carga.component.css']
        })
    ], NivelesTopesCargaComponent);
    return NivelesTopesCargaComponent;
}());
exports.NivelesTopesCargaComponent = NivelesTopesCargaComponent;
