import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionViajesRoutingModule } from './administracion-viajes-routing.module';
import { TiposDeViajeComponent } from './tipos-de-viaje/tipos-de-viaje.component';
import { AreasComponent } from './areas/areas.component';
import { TiposGastoComponent } from './tipos-gasto/tipos-gasto.component';
import { ClasesGastoComponent } from './clases-gasto/clases-gasto.component';
import { ReporteTotalizadorComponent } from './reporte-totalizador/reporte-totalizador.component';
import { TareasProgramadasComponent } from './tareas-programadas/tareas-programadas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ViajesNavComponent } from './viajes-nav/viajes-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ClaseGastoComponent } from './clase-gasto/clase-gasto.component';
import { TipoGastoComponent } from './tipo-gasto/tipo-gasto.component';
import { AreaComponent } from './area/area.component';
import { TipoDeViajeComponent } from './tipo-de-viaje/tipo-de-viaje.component';
import { ContelecUiModule } from '../contelec-ui/contelec-ui.module';

@NgModule({
    imports: [
        CommonModule,
        AdministracionViajesRoutingModule,
        MatIconModule,
        FormsModule,
        MatProgressSpinnerModule,
        ContelecUiModule
    ],
    declarations: [
        TiposDeViajeComponent,
        AreasComponent,
        TiposGastoComponent,
        ClasesGastoComponent,
        ReporteTotalizadorComponent,
        TareasProgramadasComponent,
        ConfiguracionComponent,
        ViajesNavComponent,
        ClaseGastoComponent,
        TipoGastoComponent,
        AreaComponent,
        TipoDeViajeComponent,
    ]
})
export class AdministracionViajesModule { }
