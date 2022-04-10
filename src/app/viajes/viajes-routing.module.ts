import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViajesComponent } from './viajes/viajes.component';
import { HomeComponent } from './home/home.component';
import { ViajeComponent } from './viaje/viaje.component';
import { ComprobanteComponent } from './comprobante/comprobante.component';
import { Usuario, PERMISO_AUTORIZAR_VIAJES as PERMISO_AUTORIZAR_VIAJES_POR_SOCIEDAD, PERMISO_CARGAR_GASTOS_DE_VIAJE, PERMISO_AUTORIZAR_GASTOS_DE_VIAJE_POR_CENTRO_DE_COSTO } from '../../model/usuario';
import { AppBarNavItem } from '../app-nav-item';
import { CustomI18nService } from '../custom-i18n.service';

const routes: Routes = [

    { path: 'viajes-abiertos', component: ViajesComponent, },
    { path: 'viajes-cerrados', component: ViajesComponent },
    { path: 'autorizaciones', component: ViajesComponent },
    { path: 'autorizaciones-ceco', component: ViajesComponent },
    { path: 'autorizaciones-aut-cc', component: ViajesComponent },

    { path: 'nuevo-viaje', component: ViajeComponent },
    { path: 'viajes-abiertos/:id', component: ViajeComponent },
    { path: 'viajes-cerrados/:id', component: ViajeComponent },
    { path: 'autorizaciones/:id', component: ViajeComponent },
    { path: 'autorizaciones-ceco/:id', component: ViajeComponent },
    { path: 'autorizaciones-aut-cc/:id', component: ViajeComponent },

    { path: 'viajes-abiertos/:id/comprobantes/:jd', component: ComprobanteComponent },
    { path: 'viajes-cerrados/:id/comprobantes/:jd', component: ComprobanteComponent },
    { path: 'autorizaciones/:id/comprobantes/:jd', component: ComprobanteComponent },
    { path: 'autorizaciones-ceco/:id/comprobantes/:jd', component: ComprobanteComponent },
    { path: 'autorizaciones-aut-cc/:id/comprobantes/:jd', component: ComprobanteComponent },

    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home' }
];

const MODULE: AppBarNavItem = {
    module: null,
    title: 'Gastos de viaje',
    subtitle: null,
    uri: 'viajes',
    svgName: 'airplane',
    isVisibleFor: u => u.rol.id == 2 && u.tieneAlgunoDeLosPermisos(PERMISO_CARGAR_GASTOS_DE_VIAJE, PERMISO_AUTORIZAR_VIAJES_POR_SOCIEDAD),
};

export const VIAJES_ITEMS: AppBarNavItem[] = [
    {
        module: MODULE,
        svgName: 'add',
        title: 'Nuevo viaje',
        subtitle: 'Formulario para crear un nuevo viaje',
        uri: 'nuevo-viaje',
        isVisibleFor: u => u.rol.id == 2,
    },
    {
        module: MODULE,
        svgName: 'airplane',
        title: 'Tus viajes abiertos',
        subtitle: 'Administración de sus viajes abiertos',
        uri: 'viajes-abiertos',
        isVisibleFor: u => u.rol.id == 2,
    },
    {
        module: MODULE,
        svgName: 'done-all',
        title: 'Tus viajes cerrados',
        subtitle: 'Historico de sus viajes cerrados',
        uri: 'viajes-cerrados',
        isVisibleFor: u => u.rol.id == 2,
    },
    {
        module: MODULE,
        svgName: 'areas',
        title: 'Autorizaciones por sociedad',
        subtitle: 'Viajes esperando su autorización de primer nivel (por sociedad)',
        uri: 'autorizaciones',
        isVisibleFor: u => u.rol.id == 2 && u.tieneElPermiso(PERMISO_AUTORIZAR_VIAJES_POR_SOCIEDAD),
    },
    {
        module: MODULE,
        svgName: 'assignment',
        title: 'Autorizaciones por centro de costo',
        subtitle: 'Viajes esperando su autorización de segundo nivel (por centro de costos)',
        uri: 'autorizaciones-ceco',
        isVisibleFor: u => u.rol.id == 2 && u.tieneElPermiso(PERMISO_AUTORIZAR_GASTOS_DE_VIAJE_POR_CENTRO_DE_COSTO),
    },
    {
        module: MODULE,
        svgName: 'assignment-ind',
        title: 'Autorizaciones de autorizadores',
        subtitle: 'Viajes de autorizadores esperando autorización de tercer nivel',
        uri: 'autorizaciones-aut-cc',
        isVisibleFor: u => u.rol.id == 2 && u.tieneElPermiso(PERMISO_AUTORIZAR_GASTOS_DE_VIAJE_POR_CENTRO_DE_COSTO),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViajesRoutingModule { 
    
}

