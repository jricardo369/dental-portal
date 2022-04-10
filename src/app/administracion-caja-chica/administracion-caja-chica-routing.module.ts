import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CajasChicasComponent } from './cajas-chicas/cajas-chicas.component';
import { CajaChicaComponent } from './caja-chica/caja-chica.component';
import { GastosCajaComponent } from './gastos-caja/gastos-caja.component';
import { GastoCajaComponent } from './gasto-caja/gasto-caja.component';
import { AppBarNavItem } from '../app-nav-item';
import { CustomI18nService } from '../custom-i18n.service';

const routes: Routes = [
    { path: 'cajas-chicas', component: CajasChicasComponent },
    { path: 'cajas-chicas/:idcajachica', component: CajaChicaComponent },
    { path: 'gastos-caja', component: GastosCajaComponent },
    { path: 'gastos-caja/:idgastocaja', component: GastoCajaComponent },
    { path: 'configuracion', component: ConfiguracionComponent },
    { path: '', redirectTo: 'configuracion', pathMatch: 'full' }
];

const MODULE: AppBarNavItem = {
    module: null,
    title: 'Administración de caja chica',
    subtitle: null,
    uri: 'administracion/caja-chica',
    svgName: 'box',
    isVisibleFor: u => u.rol.id == 0,
};

export const ADMIN_CAJA_CHICA_ITEMS: AppBarNavItem[] = [
    {
        module: MODULE,
        svgName: 'box',
        title: 'Cajas chicas',
        subtitle: 'Administra las cajas chicas',
        uri: 'cajas-chicas',
        isVisibleFor: u => u.rol.id == 1,
    },
    {
        module: MODULE,
        svgName: 'box',
        title: 'Gastos caja',
        subtitle: 'Administra los gastos caja',
        uri: 'gastos-caja',
        isVisibleFor: u => u.rol.id == 1,
    },
    {
        module: MODULE,
        svgName: 'settings',
        title: 'Configuración de caja chica',
        subtitle: 'Configuraciones particulares de caja chica',
        uri: 'configuracion',
        isVisibleFor: u => u.rol.id == 1,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministracionCajaChicaRoutingModule { 
}

