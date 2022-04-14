"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NivelTopesCargaComponent = void 0;
var core_1 = require("@angular/core");
var nivel_1 = require("src/model/nivel");
var NivelTopesCargaComponent = /** @class */ (function () {
    function NivelTopesCargaComponent(router, route, nivelservice, utilService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.nivelservice = nivelservice;
        this.utilService = utilService;
        this.nivel = new nivel_1.Nivel;
        this.cargandoTV = false;
        this.msjerrorTV = false;
        this.msjeliminarTV = false;
        this.editandoCamposDeCabecera = true;
        this.formatoMonto = [];
        route.params.subscribe(function (params) {
            _this.idnivel = params['id'];
            _this.idnivel = _this.idnivel.toString();
            if (_this.idnivel !== 'nuevo-nivel') {
                _this.refresh();
            }
            else {
                _this.nivel.nivel = 0;
            }
        });
    }
    NivelTopesCargaComponent.prototype.refresh = function () {
        var _this = this;
        this.cargandoTV = true;
        this.nivelservice.obtenerNivel(Number(this.idnivel))
            .then(function (tv) {
            _this.cargandoTV = false;
            _this.nivel = tv;
            console.log(tv);
        })["catch"](function (tvC) {
            console.log(tvC);
        });
    };
    NivelTopesCargaComponent.prototype.cancel = function () {
        this.router.navigate(['administracion/general/niveles-topes-carga']);
    };
    NivelTopesCargaComponent.prototype.crear = function () {
        var _this = this;
        this.cargandoTV = true;
        if (this.nivel.nivel < 1 || this.nivel.nivel.toString() === "") {
            this.msjTV = 'Ingrese los campos necesarios.';
            this.msjerrorTV = true;
            this.cargandoTV = false;
        }
        else {
            this.nivelservice.crear(this.nivel)
                .then(function (r) {
                _this.cargandoTV = false;
                if (r === 200) {
                    _this.cancel();
                }
            })["catch"](function (response) {
                alert(response);
            });
        }
    };
    NivelTopesCargaComponent.prototype.guardar = function () {
        var _this = this;
        this.cargandoTV = true;
        if (this.nivel.nivel < 1 || this.nivel.nivel.toString() === "") {
            this.msjTV = 'Ingrese los campos necesarios.';
            this.msjerrorTV = true;
            this.cargandoTV = false;
        }
        else {
            this.nivelservice.editar(this.nivel)
                .then(function (r) {
                _this.cargandoTV = false;
                if (r === 200) {
                    _this.cancel();
                }
            })["catch"](function (response) {
                _this.cargandoTV = false;
                _this.respuestaTV = response.status;
                _this.msjTV = response.statusText;
                _this.msjerrorTV = true;
            });
        }
    };
    NivelTopesCargaComponent.prototype.currentPattern = function (id) {
        switch (id) {
            case 0:
                this.formatoMonto[0] = this.utilService.formatoMoneda(this.nivel.totalAlimentosDesayunoDia || 0);
                break;
            case 1:
                this.formatoMonto[1] = this.utilService.formatoMoneda(this.nivel.totalAlimentosComidaDia || 0);
                break;
            case 2:
                this.formatoMonto[2] = this.utilService.formatoMoneda(this.nivel.totalAlimentosCenaDia || 0);
                break;
            case 3:
                this.formatoMonto[3] = this.utilService.formatoMoneda(this.nivel.hospedajeDia || 0);
                break;
            case 4:
                this.formatoMonto[4] = this.utilService.formatoMoneda(this.nivel.propina || 0);
                break;
            case 5:
                this.formatoMonto[5] = this.utilService.formatoMoneda(this.nivel.estacionamiento || 0);
                break;
            case 6:
                this.formatoMonto[6] = this.utilService.formatoMoneda(this.nivel.atencionClientes || 0);
                break;
            case 7:
                this.formatoMonto[7] = this.utilService.formatoMoneda(this.nivel.talachas || 0);
                break;
            case 8:
                this.formatoMonto[8] = this.utilService.formatoMoneda(this.nivel.noDeducibles || 0);
                break;
            case 9:
                this.formatoMonto[9] = this.utilService.formatoMoneda(this.nivel.taxis || 0);
                break;
        }
    };
    NivelTopesCargaComponent.prototype.eliminar = function () {
        var _this = this;
        this.utilService
            .mostrarDialogoSimple("Eliminar el nivel " + this.nivel.nivel, "Estás a punto de borrar el nivel " + this.nivel.nivel + ", esta operación es irreversible ¿Estás seguro que deseas eliminar?", "Eliminar el nivel " + this.nivel.nivel, "Cancelar", 'accent')
            .then(function (o) {
            if (o != "ok")
                return;
            _this.cargandoTV = true;
            _this.nivelservice.eliminar(Number(_this.nivel.id))
                .then(function (el) {
                if (el.status !== 200) {
                    _this.cargandoTV = false;
                    _this.respuestaTV = el.status;
                    _this.msjTV = 'Error al realizar la eliminación';
                    _this.msjerrorTV = true;
                }
                else {
                    _this.cargandoTV = false;
                    _this.cancel();
                }
            });
        });
    };
    NivelTopesCargaComponent = __decorate([
        core_1.Component({
            selector: 'app-nivel-topes-carga',
            templateUrl: './nivel-topes-carga.component.html',
            styleUrls: ['./nivel-topes-carga.component.css']
        })
    ], NivelTopesCargaComponent);
    return NivelTopesCargaComponent;
}());
exports.NivelTopesCargaComponent = NivelTopesCargaComponent;
