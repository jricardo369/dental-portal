"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReporteViajesDetalleComponent = void 0;
var core_1 = require("@angular/core");
var solicitud_1 = require("./../../../model/solicitud");
var comprobante_1 = require("src/model/comprobante");
var ReporteViajesDetalleComponent = /** @class */ (function () {
    function ReporteViajesDetalleComponent(viajesService, utilService, route, router) {
        var _this = this;
        this.viajesService = viajesService;
        this.utilService = utilService;
        this.route = route;
        this.router = router;
        this.mostrarCamposOcultos = false;
        this.msjAprobar = false;
        this.msjRechazar = false;
        this.mostrarMensaje = false;
        this.loading = false;
        this.rechazar = false;
        this.solicitud = new solicitud_1.Solicitud;
        this.totalgv = new comprobante_1.Comprobante();
        this.motivoRechazo = "";
        route.params.subscribe(function (params) {
            _this.idSolicitud = params['id'];
        });
        this.obtenerSolicitud();
    }
    ReporteViajesDetalleComponent.prototype.obtenerSolicitud = function () {
        var _this = this;
        this.rechazar = false;
        this.loading = true;
        this.viajesService
            .obtenerViaje(this.idSolicitud)
            .then(function (solicitudes) {
            console.log('solicitudes');
            _this.solicitud = solicitudes;
            console.log(_this.solicitud.comprobantes);
            _this.actualizarSumaDeComprobantes();
            _this.loading = false;
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ReporteViajesDetalleComponent.prototype.cancel = function () {
        this.router.navigate(['viajes/reporte-viajes']);
    };
    ReporteViajesDetalleComponent.prototype.actualizarSumaDeComprobantes = function () {
        var com = this.solicitud.comprobantes;
        if (!com)
            return;
        this.totalgv = new comprobante_1.Comprobante();
        this.totalgv.total = com.map(function (e) { return e.total; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalgv.subTotal = com.map(function (e) { return e.subTotal; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalgv.impuesto = com.map(function (e) { return e.impuesto; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalgv.iva = com.map(function (e) { return e.iva; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalgv.isr = com.map(function (e) { return e.isr; }).reduce(function (a, b) { return a + b; }, 0);
        this.totalgv.ieps = com.map(function (e) { return e.ieps; }).reduce(function (a, b) { return a + b; }, 0);
    };
    ReporteViajesDetalleComponent.prototype.descargar = function (idComprobanteViatico, ruta, formato) {
        var _this = this;
        console.log(idComprobanteViatico + ' ' + formato);
        var filenameWithExtension = ruta.replace(/^.*[\\\/]/, '');
        var filename = filenameWithExtension.split('.')[0];
        console.log(filenameWithExtension);
        console.log(filename);
        console.log(formato);
        this.viajesService
            .descargar(idComprobanteViatico, formato)
            .then(function (response) {
            console.log(response);
            _this.saveByteArray(filename, response, formato);
        })["catch"](function (reason) { return _this.utilService.manejarError(reason); })
            .then(function () { return _this.loading = false; });
    };
    ReporteViajesDetalleComponent.prototype.saveByteArray = function (reportName, byte, formato) {
        var file = (formato === 'pdf' ? new Blob([byte], { type: 'application/pdf' })
            : (formato === 'xml' ? new Blob([byte], { type: 'application/xml' })
                : new Blob([byte], { type: 'application/zip' })));
        var fileURL = URL.createObjectURL(file);
        var link = window.document.createElement('a');
        link.href = fileURL;
        link.download = reportName;
        link.click();
    };
    ReporteViajesDetalleComponent.prototype.ordenarSolicitudes = function () {
        this.solicitudes.sort(function (a, b) { return parseInt(a.numeroSolicitud) > parseInt(b.numeroSolicitud) ? -1 : 1; });
    };
    ReporteViajesDetalleComponent.prototype.descargaFactura = function () {
        this.viajesService
            .getDescargaFactura(this.idSolicitud)
            .subscribe(function (data) {
            var file = new Blob([data], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        });
    };
    ReporteViajesDetalleComponent.prototype.poliza = function () {
        this.router.navigate(['/poliza/' + this.idSolicitud]);
    };
    ReporteViajesDetalleComponent = __decorate([
        core_1.Component({
            selector: 'app-reporte-viajes-detalle',
            templateUrl: './reporte-viajes-detalle.component.html',
            styleUrls: ['./reporte-viajes-detalle.component.css']
        })
    ], ReporteViajesDetalleComponent);
    return ReporteViajesDetalleComponent;
}());
exports.ReporteViajesDetalleComponent = ReporteViajesDetalleComponent;
