"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PolizaComponent = void 0;
var core_1 = require("@angular/core");
var pagination_1 = require("src/util/pagination");
var PolizaComponent = /** @class */ (function () {
    function PolizaComponent(reporteService, utilService, activatedRoute, router, route) {
        var _this = this;
        this.reporteService = reporteService;
        this.utilService = utilService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.route = route;
        this.mostrarFiltros = false;
        this.titulo = 'Prepoliza';
        this.loading = false;
        this.paginacion = new pagination_1.PaginationManager();
        route.params.subscribe(function (params) {
            _this.idSolicitud = params['id'];
        });
        this.obtenerPoliza();
    }
    PolizaComponent.prototype.obtenerPoliza = function () {
        var _this = this;
        this.loading = true;
        this.reporteService.consultarPrepoliza(this.idSolicitud)
            .then(function (prepolizas) {
            _this.prepolizas = prepolizas;
            console.log("PREPOLIZAS");
            console.log(_this.prepolizas);
            _this.paginacion.setArray(_this.prepolizas);
        })["catch"](function (reason) { return console.log(reason); })
            .then(function () { return _this.loading = false; });
    };
    PolizaComponent.prototype.cancel = function () {
        this.router.navigate(['/reporte-viajes/' + this.idSolicitud]);
    };
    PolizaComponent = __decorate([
        core_1.Component({
            selector: 'app-poliza',
            templateUrl: './poliza.component.html',
            styleUrls: ['./poliza.component.css']
        })
    ], PolizaComponent);
    return PolizaComponent;
}());
exports.PolizaComponent = PolizaComponent;
