import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TareasProgramadasComponent } from './tareas-programadas/tareas-programadas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { NivelesTopesCargaComponent } from './niveles-topes-carga/niveles-topes-carga.component';
import { CuentasContablesComponent } from './cuentas-contables/cuentas-contables.component';
import { AppBarNavItem } from '../app-nav-item';
import { CustomI18nService } from '../custom-i18n.service';
import { CuentaContableComponent } from './cuenta-contable/cuenta-contable.component';
import { NivelTopesCargaComponent } from './nivel-topes-carga/nivel-topes-carga.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PacientesComponent } from './pacientes/pacientes.component';

const routes: Routes = [
    { path: 'usuarios', component: UsuariosComponent, },
    { path: 'pacientes', component: PacientesComponent, },

    { path: 'tareas-programadas', component: TareasProgramadasComponent, },
    { path: 'configuracion', component: ConfiguracionComponent, },

    { path: 'niveles-topes-carga', component: NivelesTopesCargaComponent, },
    { path: 'niveles-topes-carga/:id', component: NivelTopesCargaComponent, },
    { path: 'niveles-topes-carga/nuevo-nivel', component: NivelTopesCargaComponent, },
    
    { path: 'cuentas-contables', component: CuentasContablesComponent, },
    { path: 'cuentas-contables/nueva-cuenta', component: CuentaContableComponent, },
    { path: 'empresas', component: EmpresasComponent, },
    { path: 'empresas/:id', component: EmpresaComponent, },
    { path: 'empresas/nueva-empresa', component: EmpresaComponent, },
    { path: '', pathMatch: 'full', redirectTo: 'configuracion' },
];

const MODULE: AppBarNavItem = {
    module: null,
    title: 'Administración general',
    subtitle: null,
    uri: 'administracion-general',
    svgName: 'general-manage',
    isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
};

export const ADMIN_GENERAL_ITEMS: AppBarNavItem[] = [
    {
        module: MODULE,
        svgName: 'users',
        title: 'Usuarios',
        subtitle: 'Administra los usuarios y sus permisos en el portal',
        uri: 'usuarios',
        isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
    },
    {
        module: MODULE,
        svgName: 'users',
        title: 'Pacientes',
        subtitle: 'Administra los pacientes y sus permisos en el portal',
        uri: 'pacientes',
        isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
    },
    {
        module: MODULE,
        svgName: 'update',
        title: 'Tareas programadas',
        subtitle: 'Ejecuta las tareas programadas fuera de su horario normal',
        uri: 'tareas-programadas',
        isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
    },
    {
        module: MODULE,
        svgName: 'group',
        title: 'Niveles de viáticos',
        subtitle: 'Niveles de viáticos',
        uri: 'niveles-topes-carga',
        isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
    },
    {
        module: MODULE,
        svgName: 'clasesg',
        title: 'Cuentas contables',
        subtitle: 'Configuración para las subcuentas del empleado',
        uri: 'cuentas-contables',
        isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
    },
    {
        module: MODULE,
        svgName: 'areas',
        title: 'Empresas',
        subtitle: 'Configuración para las empresas',
        uri: 'empresas',
        isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministracionGeneralRoutingModule {
}
