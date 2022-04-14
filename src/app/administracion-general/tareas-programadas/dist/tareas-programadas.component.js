"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TareasProgramadasComponent = void 0;
var core_1 = require("@angular/core");
var tareas_programadas_1 = require("src/model/tareas-programadas");
var TareasProgramadasComponent = /** @class */ (function () {
    function TareasProgramadasComponent(tareasService, utilService) {
        this.tareasService = tareasService;
        this.utilService = utilService;
        this.arrTareas = [];
        this.envTareas = new tareas_programadas_1.TareasProgramadas;
        this.todayISOString = new Date().toISOString();
        this.mostrarMensaje = false;
        this.tituloMensaje = '';
        this.textoMensaje = '';
        this.cargando = false;
        this.dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        this.cambiandoDiaGeneracionLayoutEntrega = false;
        this.diaGeneracionLayout = 'Lunes';
        this.diaGeneracionLayoutOld = 'Lunes';
        this.horaGeneracionLayout = '00:00';
        this.horaGeneracionLayoutOld = '00:00';
        this.cambiandoDiaGeneracionLayoutComprobaciones = false;
        this.diaGeneracionLayoutComprobaciones = 'Lunes';
        this.diaGeneracionLayoutComprobacionestOld = 'Lunes';
        this.horaGeneracionLayoutComprobaciones = '00:00';
        this.horaGeneracionLayoutComprobacionesOld = '00:00';
        this.cambiandoDiaGeneracionLayoutPoliza = false;
        this.diaGeneracionLayoutPoliza = 'Lunes';
        this.diaGeneracionLayoutPolizaOld = 'Lunes';
        this.horaGeneracionLayoutPoliza = '00:00';
        this.horaGeneracionLayoutPolizaOld = '00:00';
        this.obtenerTareas();
    }
    TareasProgramadasComponent.prototype.obtenerTareas = function () {
        var _this = this;
        this.cargando = true;
        this.tareasService.getTareas()
            .subscribe(function (result) {
            _this.arrTareas = result;
            console.log(_this.arrTareas);
            _this.procesarTareas();
        }, function (error) {
            console.log('error');
        });
    };
    TareasProgramadasComponent.prototype.procesarTareas = function () {
        for (var index = 0; index < this.arrTareas.length; index++) {
            switch (Number(this.arrTareas[index].id)) {
                case 1:
                    this.diaGeneracionLayout = this.arrTareas[index].dia;
                    this.horaGeneracionLayout = this.arrTareas[index].hora;
                    this.diaGeneracionLayoutOld = this.diaGeneracionLayout;
                    this.horaGeneracionLayoutOld = this.horaGeneracionLayout;
                    break;
                case 2:
                    this.diaGeneracionLayoutComprobaciones = this.arrTareas[index].dia;
                    this.horaGeneracionLayoutComprobaciones = this.arrTareas[index].hora;
                    this.diaGeneracionLayoutComprobacionestOld = this.diaGeneracionLayoutComprobaciones;
                    this.horaGeneracionLayoutComprobacionesOld = this.horaGeneracionLayoutComprobaciones;
                    break;
                case 3:
                    this.diaGeneracionLayoutPoliza = this.arrTareas[index].dia;
                    this.horaGeneracionLayoutPoliza = this.arrTareas[index].hora;
                    this.diaGeneracionLayoutPolizaOld = this.diaGeneracionLayoutPoliza;
                    this.horaGeneracionLayoutPolizaOld = this.horaGeneracionLayoutPoliza;
                    break;
            }
        }
        this.cargando = false;
    };
    TareasProgramadasComponent.prototype.cambiarDato = function (caso) {
        var _this = this;
        var fecha = this.todayISOString.split('T', 1);
        this.envTareas.id = caso;
        this.envTareas.codigo = this.arrTareas[caso - 1].codigo;
        this.envTareas.descripcion = this.arrTareas[caso - 1].descripcion;
        this.envTareas.fechaModificacion = fecha.toString();
        switch (caso) {
            case 1:
                this.envTareas.dia = this.diaGeneracionLayout;
                this.envTareas.hora = this.horaGeneracionLayout;
                break;
            case 2:
                this.envTareas.dia = this.diaGeneracionLayoutComprobaciones;
                this.envTareas.hora = this.horaGeneracionLayoutComprobaciones;
                break;
            case 3:
                this.envTareas.dia = this.diaGeneracionLayoutPoliza;
                this.envTareas.hora = this.horaGeneracionLayoutPoliza;
                break;
        }
        console.log(this.envTareas);
        this.cargando = true;
        this.tareasService
            .asignarVariable(this.envTareas)
            .then(function (response) {
            _this.tituloMensaje = 'Cambio realizado correctamente';
            _this.mostrarMensaje = true;
            if (response.status === 200) {
                switch (caso) {
                    case 1:
                        _this.diaGeneracionLayoutOld = _this.diaGeneracionLayout;
                        _this.horaGeneracionLayoutOld = _this.horaGeneracionLayout;
                        _this.cambiandoDiaGeneracionLayoutEntrega = false;
                        break;
                    case 2:
                        _this.diaGeneracionLayoutComprobacionestOld = _this.diaGeneracionLayoutComprobaciones;
                        _this.horaGeneracionLayoutComprobacionesOld = _this.horaGeneracionLayoutComprobaciones;
                        _this.cambiandoDiaGeneracionLayoutComprobaciones = false;
                        break;
                    case 3:
                        _this.diaGeneracionLayoutPolizaOld = _this.diaGeneracionLayoutPoliza;
                        _this.horaGeneracionLayoutComprobacionesOld = _this.horaGeneracionLayoutComprobaciones;
                        _this.cambiandoDiaGeneracionLayoutPoliza = false;
                        break;
                }
                _this.obtenerTareas();
                _this.cargando = false;
            }
        })["catch"](function (error) {
            _this.cargando = false;
            _this.tituloMensaje = 'Error: ' + error.message;
            _this.textoMensaje = 'No fue posible realizar la modificación';
            _this.mostrarMensaje = true;
            _this.cancelarCambio(caso);
        });
    };
    TareasProgramadasComponent.prototype.cancelarCambio = function (caso) {
        switch (caso) {
            case 1:
                this.cambiandoDiaGeneracionLayoutEntrega = false;
                this.diaGeneracionLayout = this.diaGeneracionLayoutOld;
                this.horaGeneracionLayout = this.horaGeneracionLayoutOld;
                break;
            case 2:
                this.cambiandoDiaGeneracionLayoutComprobaciones = false;
                this.diaGeneracionLayoutComprobaciones = this.diaGeneracionLayoutComprobacionestOld;
                this.horaGeneracionLayoutComprobaciones = this.horaGeneracionLayoutComprobacionesOld;
                break;
            case 3:
                this.cambiandoDiaGeneracionLayoutPoliza = false;
                this.diaGeneracionLayoutPoliza = this.diaGeneracionLayoutPolizaOld;
                this.horaGeneracionLayoutPoliza = this.horaGeneracionLayoutPolizaOld;
                break;
        }
    };
    TareasProgramadasComponent.prototype.job = function (caso) {
        var _this = this;
        var campos = [];
        campos.push({ label: "Fecha", type: "date", placeholder: "fecha", value: "" });
        this.utilService
            .mostrarDialogoConFormulario("Ejecutar job", "Por favor ingrese la fecha para la ejecución", "Ejecutar", "Cancelar", campos, 'accent')
            .then(function (o) {
            if (o != "ok")
                return;
            if (campos[0].value.trim() == "" || campos[0].value.length === 0) {
                _this.tituloMensaje = 'Error ';
                _this.textoMensaje = 'Ingrese una fecha valida';
                _this.mostrarMensaje = true;
            }
            else {
                switch (caso) {
                    case 1:
                        _this.cargando = true;
                        _this.tareasService
                            .cargaEntrega(campos[0].value)
                            .then(function (response) {
                            _this.tituloMensaje = 'Job ejecutado correctamente';
                            _this.mostrarMensaje = true;
                            console.log(response.status);
                            _this.cargando = false;
                        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                            .then(function () { return _this.cargando = false; });
                        break;
                    case 2:
                        _this.cargando = true;
                        _this.tareasService
                            .cargaComprobacion(campos[0].value)
                            .then(function (response) {
                            _this.tituloMensaje = 'Job ejecutado correctamente';
                            _this.mostrarMensaje = true;
                            console.log(response.status);
                            _this.cargando = false;
                        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                            .then(function () { return _this.cargando = false; });
                        break;
                }
            }
        });
    };
    TareasProgramadasComponent.prototype.jobsf = function (caso) {
        var _this = this;
        this.utilService
            .mostrarDialogoSimple("Ejecutar job", "¿Desea ejecutar el job?", "Ejecutar", "Cancelar", 'accent')
            .then(function (o) {
            if (o != "ok")
                return;
            _this.cargando = true;
            _this.tareasService
                .polizaFox()
                .then(function (response) {
                _this.tituloMensaje = 'Job ejecutado correctamente';
                _this.mostrarMensaje = true;
                console.log(response.status);
                _this.cargando = false;
            })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
                .then(function () { return _this.cargando = false; });
        });
    };
    TareasProgramadasComponent = __decorate([
        core_1.Component({
            selector: 'app-tareas-programadas',
            templateUrl: './tareas-programadas.component.html',
            styleUrls: ['./tareas-programadas.component.css']
        })
    ], TareasProgramadasComponent);
    return TareasProgramadasComponent;
}());
exports.TareasProgramadasComponent = TareasProgramadasComponent;
