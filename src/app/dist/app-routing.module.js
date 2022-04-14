"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./common/login/login.component");
var inicio_component_1 = require("./common/inicio/inicio.component");
var tus_credenciales_component_1 = require("./common/tus-credenciales/tus-credenciales.component");
var configuracion_component_1 = require("src/app/administracion-general/configuracion/configuracion.component");
var niveles_topes_carga_component_1 = require("src/app/administracion-general/niveles-topes-carga/niveles-topes-carga.component");
var nivel_topes_carga_component_1 = require("src/app/administracion-general/nivel-topes-carga/nivel-topes-carga.component");
var cuentas_contables_component_1 = require("src/app/administracion-general/cuentas-contables/cuentas-contables.component");
var cuenta_contable_component_1 = require("src/app/administracion-general/cuenta-contable/cuenta-contable.component");
var bitacora_component_1 = require("src/app/common/bitacora/bitacora.component");
var reporte_viajes_detalle_component_1 = require("src/app/viajes/reporte-viajes-detalle/reporte-viajes-detalle.component");
var poliza_component_1 = require("src/app/viajes/poliza/poliza.component");
var routes = [
    // CORE
    { path: 'ingresar', component: login_component_1.LoginComponent },
    { path: 'inicio', component: inicio_component_1.InicioComponent },
    { path: 'credenciales', component: tus_credenciales_component_1.TusCredencialesComponent },
    { path: 'niveles', component: niveles_topes_carga_component_1.NivelesTopesCargaComponent },
    { path: 'nivel/:id', component: nivel_topes_carga_component_1.NivelTopesCargaComponent },
    { path: 'cuentas', component: cuentas_contables_component_1.CuentasContablesComponent },
    { path: 'cuenta/:id', component: cuenta_contable_component_1.CuentaContableComponent },
    { path: 'poliza/:id', component: poliza_component_1.PolizaComponent },
    { path: 'reporte-viajes/:id', component: reporte_viajes_detalle_component_1.ReporteViajesDetalleComponent },
    { path: 'config', component: configuracion_component_1.ConfiguracionComponent },
    { path: 'bitacora', component: bitacora_component_1.BitacoraComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    {
        path: 'administracion/general',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./administracion-general/administracion-general.module'); }).then(function (m) { return m.AdministracionGeneralModule; }); }
    },
    // { // ADMINISTRADOR (GASTOS DE VIAJE)
    //     path: 'administracion/viajes',
    //     loadChildren: () => import('./administracion-viajes/administracion-viajes.module').then(m => m.AdministracionViajesModule)
    // },
    {
        path: 'viajes',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./viajes/viajes.module'); }).then(function (m) { return m.ViajesModule; }); }
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, {
                // preloadingStrategy: PreloadAllModules
                })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
