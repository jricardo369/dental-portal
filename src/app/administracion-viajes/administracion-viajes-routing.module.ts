import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { TiposDeViajeComponent } from './tipos-de-viaje/tipos-de-viaje.component';
import { AreasComponent } from './areas/areas.component';
import { TiposGastoComponent } from './tipos-gasto/tipos-gasto.component';
import { ClasesGastoComponent } from './clases-gasto/clases-gasto.component';
import { ReporteTotalizadorComponent } from './reporte-totalizador/reporte-totalizador.component';
import { TareasProgramadasComponent } from './tareas-programadas/tareas-programadas.component';
import { ClaseGastoComponent } from './clase-gasto/clase-gasto.component';
import { TipoGastoComponent } from './tipo-gasto/tipo-gasto.component';
import { AreaComponent } from './area/area.component';
import { TipoDeViajeComponent } from './tipo-de-viaje/tipo-de-viaje.component';
import { AppBarNavItem } from '../app-nav-item';
import { CustomI18nService } from '../custom-i18n.service';

const routes: Routes = [
    { component: TiposDeViajeComponent, path: 'tipos-de-viaje' },
    { component: TipoDeViajeComponent, path: 'tipos-de-viaje/:idtipoviaje' },
    { component: AreasComponent, path: 'areas' },
    { component: AreaComponent, path: 'areas/:idarea' },
    { component: TiposGastoComponent, path: 'tipos-gasto' },
    { component: TipoGastoComponent, path: 'tipos-gasto/:id' },
    { component: ClasesGastoComponent, path: 'clases-gasto' },
    { component: ClaseGastoComponent, path: 'clases-gasto/:id' },
    { component: ReporteTotalizadorComponent, path: 'reporte-totalizador' },
    { component: TareasProgramadasComponent, path: 'tareas-programadas' },
    { component: ConfiguracionComponent, path: 'configuracion' },
    { path: '', pathMatch: 'full', redirectTo: 'configuracion' }
];

const MODULE: AppBarNavItem = {
    module: null,
    title: 'Administración de viajes',
    subtitle: null,
    uri: 'administracion/viajes',
    svgName: 'airplane',
    isVisibleFor: u => u.rol.id == 0,
};

export const ADMIN_VIAJES_ITEMS: AppBarNavItem[] = [
    {
        module: MODULE,
        svgName: 'travel',
        title: 'Tipos de viaje',
        subtitle: 'Administra los tipos de viaje',
        uri: 'tipos-de-viaje',
        isVisibleFor: u => u.rol.id == 1,
    },
    {
        module: MODULE,
        svgName: 'areas',
        title: 'Areas',
        subtitle: 'Administra las areas de viajeros',
        uri: 'areas',
        isVisibleFor: u => u.rol.id == 1,
    },
    {
        module: MODULE,
        svgName: 'tclases',
        title: 'Tipos de clase de gasto',
        subtitle: 'Administra los tipos de gasto por area',
        uri: 'tipos-gasto',
        isVisibleFor: u => u.rol.id == 1,
    },
    {
        module: MODULE,
        svgName: 'clasesg',
        title: 'Clases de gasto',
        subtitle: 'Administra las clases de gasto por tipo',
        uri: 'clases-gasto',
        isVisibleFor: u => u.rol.id == 1,
    },
    {
        module: MODULE,
        svgName: 'report',
        title: 'Reporte totalizador',
        subtitle: 'Ejecuta el reporte de gastos de viaje',
        uri: 'reporte-totalizador',
        isVisibleFor: u => u.rol.id == 1,
    },
    {
        module: MODULE,
        svgName: 'update',
        title: 'Tareas programadas',
        subtitle: 'Ejecuta tareas programadas de gastos de viaje',
        uri: 'tareas-programadas',
        isVisibleFor: u => u.rol.id == 1,
    },
    {
        module: MODULE,
        svgName: 'settings',
        title: 'Configuracion',
        subtitle: 'Administra configuraciones especificas de gastos de viaje',
        uri: 'configuracion',
        isVisibleFor: u => u.rol.id == 1,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministracionViajesRoutingModule { 
    
}

