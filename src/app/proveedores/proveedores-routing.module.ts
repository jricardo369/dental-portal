import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntradasDeMercanciaComponent } from './entradas-de-mercancia/entradas-de-mercancia.component';
import { FletesComponent } from './fletes/fletes.component';
import { NotaDeCreditoComponent } from './nota-de-credito/nota-de-credito.component';
import { AppBarNavItem } from '../app-nav-item';
import { ConsultaDeFacturasComponent } from './consulta-de-facturas/consulta-de-facturas.component';
import { CustomI18nService } from '../custom-i18n.service';
import { PERMISO_CARGAR_FACTURAS_CON_ORDEN_DE_COMPRA, PERMISO_CARGAR_FACTURAS_SIN_ORDEN_DE_COMPRA, PERMISO_CARGAR_GASTOS_DE_VIAJE,PERMISO_CONSULTAR_FACTURAS } from 'src/model/usuario';
import { EmpleadosFb60Component } from './empleados-fb60/empleados-fb60.component';

// BAD      Loading [invoices] with [merchandise entries] 
// GOOD     Loading [incoming invoices] with [goods receipt]

const routes: Routes = [
    { path: 'entradas-de-mercancia', component: EntradasDeMercanciaComponent, },
    { path: 'fletes', component: FletesComponent, },
    { path: 'nota-de-credito', component: NotaDeCreditoComponent, },
    { path: 'consulta-de-facturas', component: ConsultaDeFacturasComponent, },
    { path: 'empleados-fb60', component: EmpleadosFb60Component, },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'entradas-de-mercancia'
    },
];

const MODULE: AppBarNavItem = {
    module: null,
    title: 'Proveedores',
    subtitle: null,
    uri: 'proveedores',
    svgName: 'assignment',
    isVisibleFor: u => u.rol.id == 3 || (u.rol.id == 2 && u.tieneElPermiso(PERMISO_CARGAR_FACTURAS_CON_ORDEN_DE_COMPRA)),
};

export const PROVEEDORES_ITEMS: AppBarNavItem[] = [
    {
        module: MODULE,
        svgName: 'box',
        title: 'Entradas de mercancía',
        subtitle: 'Carga de facturas con entradas de mercancía',
        uri: 'entradas-de-mercancia',
        isVisibleFor: u => u.rol.id == 3 || (u.rol.id == 2 && u.tieneElPermiso(PERMISO_CARGAR_FACTURAS_CON_ORDEN_DE_COMPRA)),
    },
    /*{
        module: MODULE,
        svgName: 'box',
        title: 'Fletes',
        subtitle: 'Carga de facturas de fletes',
        uri: 'fletes',
        isVisibleFor: u => u.rol.id == 3,
    },*/
    {
        module: MODULE,
        svgName: 'box',
        title: 'Notas de crédito',
        subtitle: 'Carga de facturas con nota de crédito',
        uri: 'nota-de-credito',
        isVisibleFor: u => u.rol.id == 3,
    },
    {
        module: MODULE,
        svgName: 'box',
        title: 'Consulta de facturas',
        subtitle: 'Consulta de facturas',
        uri: 'consulta-de-facturas',
        isVisibleFor: u => u.rol.id == 3 || (u.rol.id == 2 && u.tieneElPermiso(PERMISO_CONSULTAR_FACTURAS)),
    },
    {
        module: MODULE,
        svgName: 'box',
        title: 'Empleados FB60',
        subtitle: 'Empleados FB60',
        uri: 'empleados-fb60',
        isVisibleFor: u => u.rol.id == 2 && u.tieneElPermiso(PERMISO_CARGAR_FACTURAS_SIN_ORDEN_DE_COMPRA),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProveedoresRoutingModule {



}
