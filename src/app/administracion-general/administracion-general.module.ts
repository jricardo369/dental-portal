import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdministracionGeneralRoutingModule } from './administracion-general-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TareasProgramadasComponent } from './tareas-programadas/tareas-programadas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { GeneralNavComponent } from './general-nav/general-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario/usuario.component';
import { CargaMasivaDeUsuariosComponent } from './carga-masiva-de-usuarios/carga-masiva-de-usuarios.component';
import { ConfiguracionService } from '../services/configuracion.service';
import { ContelecUiModule } from '../contelec-ui/contelec-ui.module';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AdministracionGeneralRoutingModule,
        MatIconModule,
        MatProgressSpinnerModule,
        FormsModule,
        ContelecUiModule
    ],
    declarations: [
        UsuariosComponent,
        TareasProgramadasComponent,
        ConfiguracionComponent,
        GeneralNavComponent,
        UsuarioComponent,
        CargaMasivaDeUsuariosComponent
    ],
    providers: [
        ConfiguracionService
    ]
})
export class AdministracionGeneralModule { }
