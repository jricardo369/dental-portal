import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { EntradasDeMercanciaComponent } from './entradas-de-mercancia/entradas-de-mercancia.component';
import { ProveedoresNavComponent } from './proveedores-nav/proveedores-nav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { DialogoDeCargaDeFactura } from './dialogo-de-carga-de-factura/dialogo-de-carga-de-factura.component';
import { FletesComponent } from './fletes/fletes.component';
import { NotaDeCreditoComponent } from './nota-de-credito/nota-de-credito.component';
import { ConsultaDeFacturasComponent } from './consulta-de-facturas/consulta-de-facturas.component';
import { ContelecUiModule } from '../contelec-ui/contelec-ui.module';
import { EmpleadosFb60Component } from './empleados-fb60/empleados-fb60.component';

@NgModule({
    imports: [
        CommonModule,
        ProveedoresRoutingModule,
        MatIconModule,
        FormsModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        ContelecUiModule
    ],
    declarations: [
        EntradasDeMercanciaComponent,
        ProveedoresNavComponent,
        DialogoDeCargaDeFactura,
        FletesComponent,
        NotaDeCreditoComponent,
        ConsultaDeFacturasComponent,
        EmpleadosFb60Component,
    ],
    entryComponents: [
        DialogoDeCargaDeFactura,
    ]
})
export class ProveedoresModule { }
