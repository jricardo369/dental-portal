import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViajesRoutingModule } from './viajes-routing.module';
import { ViajesComponent } from './viajes/viajes.component';
import { HomeComponent } from './home/home.component';
import { ViajesNavComponent } from './viajes-nav/viajes-nav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { ViajeComponent } from './viaje/viaje.component';
import { FormsModule } from '@angular/forms';
import { ComprobanteComponent } from './comprobante/comprobante.component';
import { ComprobanteFormComponent } from './comprobante-form/comprobante-form.component';
import { DialogoComprobanteComponent } from './dialogo-comprobante/dialogo-comprobante.component';
import { ContelecUiModule } from '../contelec-ui/contelec-ui.module';

@NgModule({
    imports: [
        CommonModule,
        ViajesRoutingModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        FormsModule,
        MatStepperModule,
        ContelecUiModule
    ],
    entryComponents: [
        DialogoComprobanteComponent
    ],
    declarations: [
        ViajesComponent,
        HomeComponent,
        ViajesNavComponent,
        ViajeComponent,
        ComprobanteComponent,
        ComprobanteFormComponent,
        DialogoComprobanteComponent
    ]
})
export class ViajesModule { }
