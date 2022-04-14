"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViajesRoutingModule = exports.VIAJES_ITEMS = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var viajes_component_1 = require("./viajes/viajes.component");
var home_component_1 = require("./home/home.component");
var viaje_component_1 = require("./viaje/viaje.component");
var solicitudes_pendientes_component_1 = require("./solicitudes-pendientes/solicitudes-pendientes.component");
var reporte_viajes_component_1 = require("./reporte-viajes/reporte-viajes.component");
var reporte_viajes_detalle_component_1 = require("./reporte-viajes-detalle/reporte-viajes-detalle.component");
var solicitud_pendiente_component_1 = require("./solicitud-pendiente/solicitud-pendiente.component");
var comprobante_component_1 = require("./comprobante/comprobante.component");
var comprobaciones_contador_component_1 = require("./comprobaciones-contador/comprobaciones-contador.component");
var comprobacion_pendiente_component_1 = require("./comprobacion-pendiente/comprobacion-pendiente.component");
var poliza_component_1 = require("./poliza/poliza.component");
var routes = [
    { path: 'viajes-abiertos', component: viajes_component_1.ViajesComponent },
    { path: 'viajes-cerrados', component: viajes_component_1.ViajesComponent },
    { path: 'autorizaciones', component: viajes_component_1.ViajesComponent },
    { path: 'autorizaciones-ceco', component: viajes_component_1.ViajesComponent },
    { path: 'autorizaciones-aut-cc', component: viajes_component_1.ViajesComponent },
    { path: 'solicitudes', component: solicitudes_pendientes_component_1.SolicitudesPendientesComponent },
    { path: 'comprobaciones-contador', component: comprobaciones_contador_component_1.ComprobacionesContadorComponent },
    { path: 'reporte-viajes', component: reporte_viajes_component_1.ReporteViajesComponent },
    { path: 'reporte-viajes/:id', component: reporte_viajes_detalle_component_1.ReporteViajesDetalleComponent },
    { path: 'poliza/:id', component: poliza_component_1.PolizaComponent },
    { path: 'nuevo-viaje', component: viaje_component_1.ViajeComponent },
    { path: 'viajes-abiertos/:id', component: viaje_component_1.ViajeComponent },
    { path: 'viajes-cerrados/:id', component: viaje_component_1.ViajeComponent },
    { path: 'autorizaciones/:id', component: viaje_component_1.ViajeComponent },
    { path: 'autorizaciones-ceco/:id', component: viaje_component_1.ViajeComponent },
    { path: 'autorizaciones-aut-cc/:id', component: viaje_component_1.ViajeComponent },
    { path: 'solicitudes/:id', component: solicitud_pendiente_component_1.SolicitudPendienteComponent },
    { path: 'comprobaciones-contador/:id', component: comprobacion_pendiente_component_1.ComprobacionPendienteComponent },
    { path: 'viajes-abiertos/:id/comprobantes/:jd', component: comprobante_component_1.ComprobanteComponent },
    { path: 'viajes-cerrados/:id/comprobantes/:jd', component: comprobante_component_1.ComprobanteComponent },
    { path: 'autorizaciones/:id/comprobantes/:jd', component: comprobante_component_1.ComprobanteComponent },
    { path: 'autorizaciones-ceco/:id/comprobantes/:jd', component: comprobante_component_1.ComprobanteComponent },
    { path: 'autorizaciones-aut-cc/:id/comprobantes/:jd', component: comprobante_component_1.ComprobanteComponent },
    { path: 'comprobaciones-contador/:id/comprobantes/:jd', component: comprobante_component_1.ComprobanteComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: '', redirectTo: 'home' }
];
var MODULE = {
    module: null,
    title: 'Viáticos',
    subtitle: null,
    uri: 'viajes',
    svgName: 'airplane',
    isVisibleFor: function (u) { return u.rol.some(function (r) {
        return r.descripcion === 'EMPLEADO' ||
            r.descripcion === 'CONTABILIDAD' ||
            r.descripcion === 'GERENTES' ||
            r.descripcion === 'CONTADOR PRESTADORA' ||
            r.descripcion === 'DIRECTOR' ||
            r.descripcion === 'ADMINISTRADOR';
    }); }
};
exports.VIAJES_ITEMS = [
    {
        module: MODULE,
        svgName: 'add',
        title: 'Nueva solicitud',
        subtitle: 'Formulario para crear una nueva solicitud de viáticos',
        uri: 'nuevo-viaje',
        isVisibleFor: function (u) { return u.rol.some(function (r) { return r.descripcion === 'EMPLEADO'; }); }
    },
    {
        module: MODULE,
        svgName: 'airplane',
        title: 'Solicitudes de viáticos abiertas',
        subtitle: 'Administración de sus solicitudes abiertas',
        uri: 'viajes-abiertos',
        isVisibleFor: function (u) { return u.rol.some(function (r) { return r.descripcion === 'EMPLEADO'; }); }
    },
    {
        module: MODULE,
        svgName: 'to-do-list',
        title: 'Solicitudes de viáticos cerradas',
        subtitle: 'Historico de sus solicitudes de viáticos cerradas',
        uri: 'viajes-cerrados',
        isVisibleFor: function (u) { return u.rol.some(function (r) { return r.descripcion === 'EMPLEADO'; }); }
    },
    {
        module: MODULE,
        svgName: 'done',
        title: 'Aprobaciones de solicitud',
        subtitle: 'Solicitudes pendientes por aprobar',
        uri: 'solicitudes',
        isVisibleFor: function (u) { return u.rol.some(function (r) { return r.descripcion === 'CONTABILIDAD'; }); }
    },
    {
        module: MODULE,
        svgName: 'done-all',
        title: 'Aprobaciones de comprobación',
        subtitle: 'Comprobaciones pendientes por aprobación',
        uri: 'comprobaciones-contador',
        isVisibleFor: function (u) { return u.rol.some(function (r) {
            return r.descripcion === 'CONTABILIDAD' ||
                r.descripcion === 'GERENTES' ||
                r.descripcion === 'CONTADOR PRESTADORA' ||
                r.descripcion === 'DIRECTOR';
        }); }
    },
    {
        module: MODULE,
        svgName: 'report',
        title: 'Reporte de solicitudes',
        subtitle: 'Reporte de solicitudes',
        uri: 'reporte-viajes',
        isVisibleFor: function (u) { return u.rol.some(function (r) {
            return r.descripcion === 'ADMINISTRADOR' ||
                r.descripcion === 'CONTABILIDAD' ||
                r.descripcion === 'GERENTES' ||
                r.descripcion === 'CONTADOR PRESTADORA' ||
                r.descripcion === 'DIRECTOR';
        }); }
    },
];
var ViajesRoutingModule = /** @class */ (function () {
    function ViajesRoutingModule() {
    }
    ViajesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ViajesRoutingModule);
    return ViajesRoutingModule;
}());
exports.ViajesRoutingModule = ViajesRoutingModule;
