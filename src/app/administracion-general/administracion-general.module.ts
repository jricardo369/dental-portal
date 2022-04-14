import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdministracionGeneralRoutingModule } from './administracion-general-routing.module';
import { GeneralNavComponent } from './general-nav/general-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from '../services/configuracion.service';
import { DentalUiModule } from '../dental-ui/dental-ui.module';
import { MatDialogModule } from '@angular/material/dialog';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PacientesComponent } from './pacientes/pacientes.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AdministracionGeneralRoutingModule,
        MatIconModule,
        MatProgressSpinnerModule,
        FormsModule,
        DentalUiModule,
        MatDialogModule
    ],
    entryComponents: [
        
    ],
    declarations: [
        GeneralNavComponent,
        UsuariosComponent,
        PacientesComponent
    ],
    providers: [
        ConfiguracionService
    ]
})
export class AdministracionGeneralModule { }
