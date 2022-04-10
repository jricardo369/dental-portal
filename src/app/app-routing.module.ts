import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Usuario } from '../model/usuario';
import { LoginComponent } from './common/login/login.component';
import { InicioComponent } from './common/inicio/inicio.component';
import { TusCredencialesComponent } from './common/tus-credenciales/tus-credenciales.component';

const routes: Routes = [

    // CORE
    { path: 'ingresar', component: LoginComponent, },
    { path: 'inicio', component: InicioComponent, },
    { path: 'credenciales', component: TusCredencialesComponent, },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },

    { // ADMINISTRADOR (GENERAL)
        path: 'administracion/general',
        loadChildren: () => import('./administracion-general/administracion-general.module').then(m => m.AdministracionGeneralModule)
    },

    { // ADMINISTRADOR (GASTOS DE VIAJE)
        path: 'administracion/viajes',
        loadChildren: () => import('./administracion-viajes/administracion-viajes.module').then(m => m.AdministracionViajesModule)
    },

    { // ADMINISTRADOR (CAJA CHICA)
        path: 'administracion/caja-chica',
        loadChildren: () => import('./administracion-caja-chica/administracion-caja-chica.module').then(m => m.AdministracionCajaChicaModule)
    },

    { // PROVEEDORES
        path: 'proveedores',
        loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule)
    },

    { // VIAJES
        path: 'viajes',
        loadChildren: () => import('./viajes/viajes.module').then(m => m.ViajesModule)
    },

    { // CAJA CHICA
        path: 'caja-chica',
        loadChildren: () => import('./caja-chica/caja-chica.module').then(m => m.CajaChicaModule)
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }