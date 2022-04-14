import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';

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
import { ViaticosUiModule } from '../viaticos-ui/viaticos-ui.module';
import { SolicitudesPendientesComponent } from './solicitudes-pendientes/solicitudes-pendientes.component';
import { SolicitudPendienteComponent } from './solicitud-pendiente/solicitud-pendiente.component';
import { ComprobacionesContadorComponent } from './comprobaciones-contador/comprobaciones-contador.component';
import { ComprobacionPendienteComponent } from './comprobacion-pendiente/comprobacion-pendiente.component';
import { ReporteViajesComponent } from './reporte-viajes/reporte-viajes.component';
import { ReporteViajesDetalleComponent } from './reporte-viajes-detalle/reporte-viajes-detalle.component';
import { PolizaComponent } from './poliza/poliza.component';

@NgModule({
    imports: [
        CommonModule,
        ViajesRoutingModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        FormsModule,
        MatStepperModule,
        ViaticosUiModule,
        MatSliderModule,
        MatSelectModule
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
        DialogoComprobanteComponent,
        SolicitudesPendientesComponent,
        SolicitudPendienteComponent,
        ReporteViajesComponent,
        ReporteViajesDetalleComponent,
        ComprobacionesContadorComponent,
        ComprobacionPendienteComponent,
        PolizaComponent
    ]
})
export class ViajesModule { }
