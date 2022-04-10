import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaChicaRoutingModule } from './caja-chica-routing.module';
import { CajaChicaNavComponent } from './caja-chica-nav/caja-chica-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { SolicitudesDeContabilizacionComponent } from './solicitudes-de-contabilizacion/solicitudes-de-contabilizacion.component';
import { SolicitudDeContabilizacionComponent } from './solicitud-de-contabilizacion/solicitud-de-contabilizacion.component';
import { DialogoGastoSolicitudCajaChicaComponent } from './dialogo-gasto-solicitud-caja-chica/dialogo-gasto-solicitud-caja-chica';
import { GastoSolicitudCajaChicaFormComponent } from './gasto-solicitud-caja-chica-form/gasto-solicitud-caja-chica-form.component';
import { ContelecUiModule } from '../contelec-ui/contelec-ui.module';

@NgModule({
    imports: [
        CommonModule,
        CajaChicaRoutingModule,
        FormsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatButtonModule,
        ContelecUiModule
    ],
    entryComponents: [
        DialogoGastoSolicitudCajaChicaComponent
    ],
    declarations: [
        CajaChicaNavComponent,
        SolicitudesDeContabilizacionComponent,
        SolicitudDeContabilizacionComponent,
        DialogoGastoSolicitudCajaChicaComponent,
        GastoSolicitudCajaChicaFormComponent,
    ]
})
export class CajaChicaModule { }
