import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CargaMasivaDeUsuariosComponent } from './carga-masiva-de-usuarios/carga-masiva-de-usuarios.component';
import { TareasProgramadasComponent } from './tareas-programadas/tareas-programadas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { AppBarNavItem } from '../app-nav-item';
import { CustomI18nService } from '../custom-i18n.service';

const routes: Routes = [
    { path: 'usuarios', component: UsuariosComponent, },
    { path: 'usuarios/carga-masiva', component: CargaMasivaDeUsuariosComponent, },
    { path: 'usuarios/:id', component: UsuarioComponent, },
    { path: 'tareas-programadas', component: TareasProgramadasComponent, },
    { path: 'configuracion', component: ConfiguracionComponent, },
    { path: '', pathMatch: 'full', redirectTo: 'usuarios' },
];

const MODULE: AppBarNavItem = {
    module: null,
    title: 'Administración general',
    subtitle: null,
    uri: 'administracion/general',
    svgName: 'general-manage',
    isVisibleFor: u => u.rol.id == 1,
};

export const ADMIN_GENERAL_ITEMS: AppBarNavItem[] = [
    {
        module: MODULE,
        svgName: 'users',
        title: 'Usuarios',
        subtitle: 'Administra los usuarios y sus permisos en el portal',
        uri: 'usuarios',
        isVisibleFor: u => u.rol.id == 1,
    },
    /*{
        module: MODULE,
        svgName: 'update',
        title: 'Usuario',
        subtitle: 'Administracion de pacientes',
        uri: 'usuarios',
        isVisibleFor: u => u.rol.id == 1,
    },*/
    {
        module: MODULE,
        svgName: 'settings',
        title: 'Configuración general',
        subtitle: 'Configuración particular del módulo general',
        uri: 'configuracion',
        isVisibleFor: u => u.rol.id == 1,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministracionGeneralRoutingModule { 
}
