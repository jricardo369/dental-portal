import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBarNavItem } from '../app-nav-item';
import { SolicitudesDeContabilizacionComponent } from './solicitudes-de-contabilizacion/solicitudes-de-contabilizacion.component';
import { SolicitudDeContabilizacionComponent } from './solicitud-de-contabilizacion/solicitud-de-contabilizacion.component';
import { PERMISO_RESPONSABLE_CAJA_CHICA, PERMISO_AUTORIZADOR_CAJA_CHICA, PERMISO_CONTABILIZADOR_CAJA_CHICA } from 'src/model/usuario';
import { CustomI18nService } from '../custom-i18n.service';

const routes: Routes = [

    { path: 'solicitudes-pendientes', component: SolicitudesDeContabilizacionComponent }, // RESPONSABLE
    { path: 'autorizaciones-pendientes', component: SolicitudesDeContabilizacionComponent }, // AUTORIZADOR
    { path: 'solicitudes-contabilizadas', component: SolicitudesDeContabilizacionComponent }, // RESPONSABLE
    { path: 'contabilizaciones-pendientes', component: SolicitudesDeContabilizacionComponent }, // CONTABILIZADOR

    { path: 'solicitudes-pendientes/:id', component: SolicitudDeContabilizacionComponent }, // RESPONSABLE
    { path: 'autorizaciones-pendientes/:id', component: SolicitudDeContabilizacionComponent }, // AUTORIZADOR
    { path: 'solicitudes-contabilizadas/:id', component: SolicitudDeContabilizacionComponent }, // RESPONSABLE
    { path: 'contabilizaciones-pendientes/:id', component: SolicitudDeContabilizacionComponent }, // CONTABILIZADOR

    { path: 'nueva-solicitud-de-contabilizacion', component: SolicitudDeContabilizacionComponent },

    { path: '', redirectTo: 'solicitudes-pendientes' }
];

const MODULE: AppBarNavItem = {
    module: null,
    title: 'Caja chica',
    subtitle: null,
    uri: 'caja-chica',
    svgName: 'box',
    isVisibleFor: u => u.rol.id == 2 && u.tieneAlgunoDeLosPermisos(PERMISO_RESPONSABLE_CAJA_CHICA, PERMISO_AUTORIZADOR_CAJA_CHICA),
};

export const CAJA_CHICA_ITEMS: AppBarNavItem[] = [
    {
        module: MODULE,
        svgName: 'add',
        title: 'Nueva solicitud de caja chica',
        subtitle: 'Crea una nueva solicitud de contabilización de caja chica',
        uri: 'nueva-solicitud-de-contabilizacion',
        isVisibleFor: u => u.rol.id == 2 && u.tieneElPermiso(PERMISO_RESPONSABLE_CAJA_CHICA),
    },
    {
        module: MODULE,
        svgName: 'assignment-ind',
        title: 'Tus solicitudes pendientes',
        subtitle: 'Tus solicitudes de contabilización de caja chica',
        uri: 'solicitudes-pendientes',
        isVisibleFor: u => u.rol.id == 2 && u.tieneElPermiso(PERMISO_RESPONSABLE_CAJA_CHICA),
    },
    {
        module: MODULE,
        svgName: 'assignment',
        title: 'Autorizaciones pendientes',
        subtitle: 'Solicitudes de contabilización de caja chica que esperan tu aprobación',
        uri: 'autorizaciones-pendientes',
        isVisibleFor: u => u.rol.id == 2 && u.tieneElPermiso(PERMISO_AUTORIZADOR_CAJA_CHICA),
    },
    {
        module: MODULE,
        svgName: 'assignment-turned-in',
        title: 'Contabilizaciones pendientes',
        subtitle: 'Solicitudes de contabilización listas para contabilizarse',
        uri: 'contabilizaciones-pendientes',
        isVisibleFor: u => u.rol.id == 2 && u.tieneElPermiso(PERMISO_CONTABILIZADOR_CAJA_CHICA),
    },
    {
        module: MODULE,
        svgName: 'done-all',
        title: 'Tus solicitudes contabilizadas',
        subtitle: 'Tus solicitudes de contabilización de caja chica',
        uri: 'solicitudes-contabilizadas',
        isVisibleFor: u => u.rol.id == 2 && u.tieneElPermiso(PERMISO_RESPONSABLE_CAJA_CHICA),
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CajaChicaRoutingModule { 
    
}

