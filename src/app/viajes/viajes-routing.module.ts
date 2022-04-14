import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViajesComponent } from './viajes/viajes.component';
import { HomeComponent } from './home/home.component';
import { ViajeComponent } from './viaje/viaje.component';
import { SolicitudesPendientesComponent } from './solicitudes-pendientes/solicitudes-pendientes.component';
import { ReporteViajesComponent } from './reporte-viajes/reporte-viajes.component';
import { ReporteViajesDetalleComponent } from './reporte-viajes-detalle/reporte-viajes-detalle.component';
import { SolicitudPendienteComponent } from './solicitud-pendiente/solicitud-pendiente.component';
import { ComprobanteComponent } from './comprobante/comprobante.component';
import { AppBarNavItem } from '../app-nav-item';
import { CustomI18nService } from '../custom-i18n.service';
import { ComprobacionesContadorComponent } from './comprobaciones-contador/comprobaciones-contador.component';
import { ComprobacionPendienteComponent } from './comprobacion-pendiente/comprobacion-pendiente.component';
import { PolizaComponent } from './poliza/poliza.component';

const routes: Routes = [

    { path: 'viajes-abiertos', component: ViajesComponent, },
    { path: 'viajes-cerrados', component: ViajesComponent },
    { path: 'solicitudes', component: SolicitudesPendientesComponent },
    { path: 'comprobaciones-contador', component: ComprobacionesContadorComponent },
    { path: 'reporte-viajes', component: ReporteViajesComponent },
    { path: 'reporte-viajes/:id', component: ReporteViajesDetalleComponent },
    { path: 'poliza/:id', component: PolizaComponent },
    
    { path: 'nuevo-viaje', component: ViajeComponent },
    { path: 'viajes-abiertos/:id', component: ViajeComponent },
    { path: 'viajes-cerrados/:id', component: ViajeComponent },
    { path: 'solicitudes/:id', component: SolicitudPendienteComponent },
    { path: 'comprobaciones-contador/:id', component: ComprobacionPendienteComponent },

    { path: 'viajes-abiertos/:id/comprobantes/:jd', component: ComprobanteComponent },
    { path: 'viajes-cerrados/:id/comprobantes/:jd', component: ComprobanteComponent },
    { path: 'comprobaciones-contador/:id/comprobantes/:jd', component: ComprobanteComponent },

    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home' }
];

const MODULE: AppBarNavItem = {
    module: null,
    title: 'Viáticos',
    subtitle: null,
    uri: 'viajes',
    svgName: 'airplane',
    isVisibleFor: u => u.rol.some(r => 
        r.descripcion === 'EMPLEADO' ||
        r.descripcion === 'CONTABILIDAD' ||
        r.descripcion === 'GERENTES' ||
        r.descripcion === 'CONTADOR PRESTADORA' ||
        r.descripcion === 'DIRECTOR' ||
        r.descripcion === 'ADMINISTRADOR')
};

export const VIAJES_ITEMS: AppBarNavItem[] = [
    {
        module: MODULE,
        svgName: 'add',
        title: 'Nueva solicitud',
        subtitle: 'Formulario para crear una nueva solicitud de viáticos',
        uri: 'nuevo-viaje',
        isVisibleFor: u => u.rol.some(r => r.descripcion === 'EMPLEADO')
    },
    {
        module: MODULE,
        svgName: 'airplane',
        title: 'Solicitudes de viáticos abiertas',
        subtitle: 'Administración de sus solicitudes abiertas',
        uri: 'viajes-abiertos',
        isVisibleFor: u => u.rol.some(r => r.descripcion === 'EMPLEADO')
    },
    {
        module: MODULE,
        svgName: 'to-do-list',
        title: 'Solicitudes de viáticos cerradas',
        subtitle: 'Historico de sus solicitudes de viáticos cerradas',
        uri: 'viajes-cerrados',
        isVisibleFor: u => u.rol.some(r => r.descripcion === 'EMPLEADO')
    }, 
    {
        module: MODULE,
        svgName: 'done',
        title: 'Aprobaciones de solicitud',
        subtitle: 'Solicitudes pendientes por aprobar',
        uri: 'solicitudes',
        isVisibleFor: u => u.rol.some(r => r.descripcion === 'CONTABILIDAD')
    },
    {
        module: MODULE,
        svgName: 'done-all',
        title: 'Aprobaciones de comprobación',
        subtitle: 'Comprobaciones pendientes por aprobación',
        uri: 'comprobaciones-contador',
        isVisibleFor: u => u.rol.some(r => 
            r.descripcion === 'CONTABILIDAD' ||
            r.descripcion === 'GERENTES' ||
            r.descripcion === 'CONTADOR PRESTADORA' ||
            r.descripcion === 'DIRECTOR')
    },
    {
        module: MODULE,
        svgName: 'report',
        title: 'Reporte de solicitudes',
        subtitle: 'Reporte de solicitudes',
        uri: 'reporte-viajes',
        isVisibleFor: u => u.rol.some(r => 
            r.descripcion === 'ADMINISTRADOR' || 
            r.descripcion === 'CONTABILIDAD' ||
            r.descripcion === 'GERENTES' ||
            r.descripcion === 'CONTADOR PRESTADORA' ||
            r.descripcion === 'DIRECTOR')
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViajesRoutingModule { 
    
}

