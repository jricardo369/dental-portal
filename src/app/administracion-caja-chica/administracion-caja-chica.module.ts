import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionCajaChicaRoutingModule } from './administracion-caja-chica-routing.module';
import { CajasChicasComponent } from './cajas-chicas/cajas-chicas.component';
import { GastosCajaComponent } from './gastos-caja/gastos-caja.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CajaChicaComponent } from './caja-chica/caja-chica.component';
import { GastoCajaComponent } from './gasto-caja/gasto-caja.component';
import { CajaChicaNavComponent } from './caja-chica-nav/caja-chica-nav.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContelecUiModule } from '../contelec-ui/contelec-ui.module';

@NgModule({
  imports: [
    CommonModule,
    AdministracionCajaChicaRoutingModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ContelecUiModule,
  ],
  declarations: [CajasChicasComponent, GastosCajaComponent, ConfiguracionComponent, CajaChicaComponent, GastoCajaComponent, CajaChicaNavComponent]
})
export class AdministracionCajaChicaModule { }
