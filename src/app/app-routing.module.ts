import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { InicioComponent } from './common/inicio/inicio.component';
import { ConfiguracionComponent } from 'src/app/administracion-general/configuracion/configuracion.component';
import { NivelesTopesCargaComponent } from 'src/app/administracion-general/niveles-topes-carga/niveles-topes-carga.component';
import { NivelTopesCargaComponent } from 'src/app/administracion-general/nivel-topes-carga/nivel-topes-carga.component';
import { CuentasContablesComponent } from 'src/app/administracion-general/cuentas-contables/cuentas-contables.component';
import { CuentaContableComponent } from 'src/app/administracion-general/cuenta-contable/cuenta-contable.component';
import { BitacoraComponent } from 'src/app/common/bitacora/bitacora.component';
import { ReporteViajesDetalleComponent } from 'src/app/viajes/reporte-viajes-detalle/reporte-viajes-detalle.component';
import { PolizaComponent } from 'src/app/viajes/poliza/poliza.component';


const routes: Routes = [

    // CORE
    { path: 'ingresar', component: LoginComponent, },
    { path: 'inicio', component: InicioComponent, },
    { path: 'niveles', component: NivelesTopesCargaComponent, },
    { path: 'nivel/:id', component: NivelTopesCargaComponent, },
    { path: 'cuentas', component: CuentasContablesComponent, },
    { path: 'cuenta/:id', component: CuentaContableComponent, },
    { path: 'poliza/:id', component: PolizaComponent, },
    { path: 'reporte-viajes/:id', component: ReporteViajesDetalleComponent },
    { path: 'config', component: ConfiguracionComponent, },
    { path: 'bitacora', component: BitacoraComponent, },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },

    { // ADMINISTRADOR (GENERAL)
        path: 'administracion-general',
        loadChildren: () => import('./administracion-general/administracion-general.module').then(m => m.AdministracionGeneralModule)
    },
    { // VIAJES
        path: 'viajes',
        loadChildren: () => import('./viajes/viajes.module').then(m => m.ViajesModule)
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
