"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfiguracionComponent = void 0;
var core_1 = require("@angular/core");
var configuracion_1 = require("src/model/configuracion");
var ConfiguracionComponent = /** @class */ (function () {
    function ConfiguracionComponent(configuracionService, utilService) {
        this.configuracionService = configuracionService;
        this.utilService = utilService;
        //config = new Configuracion();
        this.arrconfiguraciones = [];
        //objconfiguracion = new Configuracion;
        this.envconfiguracion = new configuracion_1.Configuracion;
        this.mostrarMensaje = false;
        this.tituloMensaje = '';
        this.textoMensaje = '';
        this.formatoMonto = [];
        this.cargando = false;
        this.cambiandoFechaInicialFacturasProveedores = false;
        this.fechaInicialFacturasProveedores = '1990-02-11';
        this.fechaInicialFacturasProveedoresOld = '1990-02-11';
        this.cambiandoFechaInicialFacturasFB60 = false;
        this.fechaInicialFacturasFB60 = '1990-02-11';
        this.fechaInicialFacturasFB60Old = '1990-02-11';
        //Se creo una variable por cada configuracion
        this.cambiandoDiasPermitidosCargaComprobantes = false;
        this.cambiandoPorcentaje = false;
        this.cambiandoTopeTotalSAT = false;
        this.cambiandoTopeTotal = false;
        this.cambiandoTopeMonto = false;
        this.cambiandoMontoTotalP = false;
        this.cambiandoCorreo = false;
        this.cambiandoCargaEntrega = false;
        this.cambiandoCargaComprobaciones = false;
        this.diasPermitidosCargaComprobantes = 0;
        this.Porcentaje = 0;
        this.TopeTotalSAT = 0;
        this.TopeTotal = 0;
        this.TopeMonto = 0;
        this.MontoTotalP = 0;
        this.correoAdministrador = '';
        this.rutaCargaEntrega = '';
        this.rutaCargaComprobaciones = '';
        this.diasPermitidosCargaComprobantesOld = 0;
        this.PorcentajeOld = 0;
        this.formatoPorcentaje = 0;
        this.TopeTotalSATOld = 0;
        this.TopeTotalOld = 0;
        this.TopeMontoOld = 0;
        this.MontoTotalPOld = 0;
        this.correoAdministradorOld = '';
        this.rutaCargaEntregaOld = '';
        this.rutaCargaComprobacionesOld = '';
        localStorage.setItem('manual_name', 'Manual de Administración');
        localStorage.setItem('manual_file', 'ManualAdministracion');
        this.obtenerConfi();
    }
    ConfiguracionComponent.prototype.obtenerConfi = function () {
        var _this = this;
        this.cargando = true;
        this.configuracionService
            .getConf()
            .subscribe(function (result) {
            _this.arrconfiguraciones = result;
            console.log(_this.arrconfiguraciones);
            _this.procesarConfi();
        }, function (error) {
            console.log('error');
        });
    };
    ConfiguracionComponent.prototype.procesarConfi = function () {
        for (var index = 0; index < this.arrconfiguraciones.length; index++) {
            switch (Number(this.arrconfiguraciones[index].id)) {
                case 1:
                    this.diasPermitidosCargaComprobantes = Number(this.arrconfiguraciones[index].valor1);
                    this.diasPermitidosCargaComprobantesOld = this.diasPermitidosCargaComprobantes;
                    break;
                case 2:
                    this.TopeTotalSAT = Number(this.arrconfiguraciones[index].valor1);
                    this.TopeTotalSATOld = this.TopeTotalSAT;
                    break;
                case 3:
                    this.TopeTotal = Number(this.arrconfiguraciones[index].valor1);
                    this.TopeTotalOld = this.TopeTotal;
                    break;
                case 4:
                    this.TopeMonto = Number(this.arrconfiguraciones[index].valor1);
                    this.TopeMontoOld = this.TopeMonto;
                    break;
                case 5:
                    this.Porcentaje = Number(this.arrconfiguraciones[index].valor1);
                    this.PorcentajeOld = this.Porcentaje;
                    this.formatoPorcentaje = this.Porcentaje * 100;
                    break;
                case 6:
                    this.MontoTotalP = Number(this.arrconfiguraciones[index].valor1);
                    this.MontoTotalPOld = this.MontoTotalP;
                    break;
                case 7:
                    this.correoAdministrador = this.arrconfiguraciones[index].valor1;
                    this.correoAdministradorOld = this.correoAdministrador;
                    break;
                case 8:
                    this.rutaCargaEntrega = this.arrconfiguraciones[index].valor1;
                    this.rutaCargaEntregaOld = this.rutaCargaEntrega;
                    break;
                case 9:
                    this.rutaCargaComprobaciones = this.arrconfiguraciones[index].valor1;
                    this.rutaCargaComprobacionesOld = this.rutaCargaComprobaciones;
                    break;
            }
        }
        this.cargando = false;
    };
    ConfiguracionComponent.prototype.cambiarDato = function (caso) {
        var _this = this;
        this.envconfiguracion.id = caso;
        this.envconfiguracion.valor2 = this.arrconfiguraciones[caso - 1].valor2;
        this.envconfiguracion.codigo = this.arrconfiguraciones[caso - 1].codigo;
        this.envconfiguracion.descripcion = this.arrconfiguraciones[caso - 1].descripcion;
        switch (caso) {
            case 1:
                this.envconfiguracion.valor1 = this.diasPermitidosCargaComprobantes.toString();
                break;
            case 2:
                this.envconfiguracion.valor1 = this.TopeTotalSAT.toString();
                break;
            case 3:
                this.envconfiguracion.valor1 = this.TopeTotal.toString();
                break;
            case 4:
                this.envconfiguracion.valor1 = this.TopeMonto.toString();
                break;
            case 5:
                var porcen = this.Porcentaje * .01;
                this.Porcentaje = porcen;
                this.envconfiguracion.valor1 = this.Porcentaje.toString();
                break;
            case 6:
                this.envconfiguracion.valor1 = this.MontoTotalP.toString();
                break;
            case 7:
                this.envconfiguracion.valor1 = this.correoAdministrador.toString();
                break;
            case 8:
                this.envconfiguracion.valor1 = this.rutaCargaEntrega.toString();
                break;
            case 9:
                this.envconfiguracion.valor1 = this.rutaCargaComprobaciones.toString();
                break;
        }
        console.log(this.envconfiguracion);
        this.cargando = true;
        this.configuracionService
            .asignarVariable(this.envconfiguracion)
            .then(function (response) {
            _this.tituloMensaje = 'Cambio realizado correctamente';
            _this.mostrarMensaje = true;
            if (response.status === 200) {
                switch (caso) {
                    case 1:
                        _this.diasPermitidosCargaComprobantesOld = _this.diasPermitidosCargaComprobantes;
                        _this.cambiandoDiasPermitidosCargaComprobantes = false;
                        break;
                    case 2:
                        _this.TopeTotalSATOld = _this.TopeTotalSAT;
                        _this.cambiandoTopeTotalSAT = false;
                        break;
                    case 3:
                        _this.TopeTotalOld = _this.TopeTotal;
                        _this.cambiandoTopeTotal = false;
                        break;
                    case 4:
                        _this.TopeMontoOld = _this.TopeMonto;
                        _this.cambiandoTopeMonto = false;
                        break;
                    case 5:
                        _this.PorcentajeOld = _this.Porcentaje;
                        _this.cambiandoPorcentaje = false;
                        break;
                    case 6:
                        _this.MontoTotalPOld = _this.MontoTotalP;
                        _this.cambiandoMontoTotalP = false;
                        break;
                }
                _this.obtenerConfi();
                _this.cargando = false;
            }
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.cargando = false; });
    };
    ConfiguracionComponent.prototype.cancelarCambio = function (caso) {
        switch (caso) {
            case 1:
                this.cambiandoDiasPermitidosCargaComprobantes = false;
                this.diasPermitidosCargaComprobantes = this.diasPermitidosCargaComprobantesOld;
                break;
            case 2:
                this.cambiandoTopeTotalSAT = false;
                this.TopeTotalSAT = this.TopeTotalSATOld;
                break;
            case 3:
                this.cambiandoTopeTotal = false;
                this.TopeTotalSAT = this.TopeTotalSATOld;
                break;
            case 4:
                this.cambiandoTopeMonto = false;
                this.TopeMonto = this.TopeMontoOld;
                break;
            case 5:
                this.cambiandoPorcentaje = false;
                this.Porcentaje = this.PorcentajeOld;
                break;
            case 6:
                this.cambiandoMontoTotalP = false;
                this.MontoTotalP = this.MontoTotalPOld;
                break;
            case 7:
                this.cambiandoCorreo = false;
                this.correoAdministrador = this.correoAdministradorOld;
                break;
            case 8:
                this.cambiandoCargaEntrega = false;
                this.rutaCargaEntrega = this.rutaCargaEntregaOld;
                break;
            case 9:
                this.cambiandoCargaComprobaciones = false;
                this.rutaCargaComprobaciones = this.rutaCargaComprobacionesOld;
                break;
        }
    };
    ConfiguracionComponent.prototype.currentPattern = function (id) {
        switch (id) {
            case 1:
                this.formatoMonto[0] = this.utilService.formatoMoneda(this.TopeTotalSAT || 0);
                break;
            case 2:
                this.formatoMonto[1] = this.utilService.formatoMoneda(this.TopeTotal || 0);
                break;
            case 3:
                this.formatoMonto[2] = this.utilService.formatoMoneda(this.TopeMonto || 0);
                break;
            case 4:
                this.formatoMonto[3] = this.utilService.formatoMoneda(this.MontoTotalP || 0);
                break;
        }
    };
    ConfiguracionComponent = __decorate([
        core_1.Component({
            selector: 'app-configuracion',
            templateUrl: './configuracion.component.html',
            styleUrls: ['./configuracion.component.css']
        })
    ], ConfiguracionComponent);
    return ConfiguracionComponent;
}());
exports.ConfiguracionComponent = ConfiguracionComponent;
