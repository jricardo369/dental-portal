"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdministracionGeneralRoutingModule = exports.ADMIN_GENERAL_ITEMS = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tareas_programadas_component_1 = require("./tareas-programadas/tareas-programadas.component");
var configuracion_component_1 = require("./configuracion/configuracion.component");
var niveles_topes_carga_component_1 = require("./niveles-topes-carga/niveles-topes-carga.component");
var cuentas_contables_component_1 = require("./cuentas-contables/cuentas-contables.component");
var cuenta_contable_component_1 = require("./cuenta-contable/cuenta-contable.component");
var nivel_topes_carga_component_1 = require("./nivel-topes-carga/nivel-topes-carga.component");
var routes = [
    { path: 'tareas-programadas', component: tareas_programadas_component_1.TareasProgramadasComponent },
    { path: 'configuracion', component: configuracion_component_1.ConfiguracionComponent },
    { path: 'niveles-topes-carga', component: niveles_topes_carga_component_1.NivelesTopesCargaComponent },
    { path: 'niveles-topes-carga/nuevo-nivel', component: nivel_topes_carga_component_1.NivelTopesCargaComponent },
    { path: 'cuentas-contables', component: cuentas_contables_component_1.CuentasContablesComponent },
    { path: 'cuentas-contables/nueva-cuenta', component: cuenta_contable_component_1.CuentaContableComponent },
    { path: '', pathMatch: 'full', redirectTo: 'configuracion' },
];
var MODULE = {
    module: null,
    title: 'Administración general',
    subtitle: null,
    uri: 'administracion/general',
    svgName: 'security',
    isVisibleFor: function (u) { return u.rol.some(function (r) { return r.descripcion === 'ADMINISTRADOR'; }); }
};
exports.ADMIN_GENERAL_ITEMS = [
    {
        module: MODULE,
        svgName: 'settings',
        title: 'Configuración general',
        subtitle: 'Configuración particular del módulo general',
        uri: 'configuracion',
        isVisibleFor: function (u) { return u.rol.some(function (r) { return r.descripcion === 'ADMINISTRADOR'; }); }
    },
    {
        module: MODULE,
        svgName: 'update',
        title: 'Tareas programadas',
        subtitle: 'Ejecuta las tareas programadas fuera de su horario normal',
        uri: 'tareas-programadas',
        isVisibleFor: function (u) { return u.rol.some(function (r) { return r.descripcion === 'ADMINISTRADOR'; }); }
    },
    {
        module: MODULE,
        svgName: 'group',
        title: 'Niveles de viáticos',
        subtitle: 'Niveles de viáticos',
        uri: 'niveles-topes-carga',
        isVisibleFor: function (u) { return u.rol.some(function (r) { return r.descripcion === 'ADMINISTRADOR'; }); }
    },
    {
        module: MODULE,
        svgName: 'clasesg',
        title: 'Cuentas contables',
        subtitle: 'Configuración para las subcuentas del empleado',
        uri: 'cuentas-contables',
        isVisibleFor: function (u) { return u.rol.some(function (r) { return r.descripcion === 'ADMINISTRADOR'; }); }
    }
];
var AdministracionGeneralRoutingModule = /** @class */ (function () {
    function AdministracionGeneralRoutingModule() {
    }
    AdministracionGeneralRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AdministracionGeneralRoutingModule);
    return AdministracionGeneralRoutingModule;
}());
exports.AdministracionGeneralRoutingModule = AdministracionGeneralRoutingModule;
