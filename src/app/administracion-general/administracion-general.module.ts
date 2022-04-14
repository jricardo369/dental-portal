import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdministracionGeneralRoutingModule } from './administracion-general-routing.module';
import { TareasProgramadasComponent } from './tareas-programadas/tareas-programadas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { GeneralNavComponent } from './general-nav/general-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from '../services/configuracion.service';
import { NivelesTopesCargaComponent } from './niveles-topes-carga/niveles-topes-carga.component';
import { CuentasContablesComponent } from './cuentas-contables/cuentas-contables.component';
import { CuentaContableComponent } from './cuenta-contable/cuenta-contable.component';
import { NivelTopesCargaComponent } from './nivel-topes-carga/nivel-topes-carga.component';
import { ViaticosUiModule } from '../viaticos-ui/viaticos-ui.module';
import { EmpresasComponent } from './empresas/empresas.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { DialogoConexionSapComponent } from './dialogo-conexion-sap/dialogo-conexion-sap.component';
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
        ViaticosUiModule,
        MatDialogModule
    ],
    entryComponents: [
        DialogoConexionSapComponent
    ],
    declarations: [
        TareasProgramadasComponent,
        ConfiguracionComponent,
        GeneralNavComponent,
        NivelesTopesCargaComponent,
        CuentasContablesComponent,
        CuentaContableComponent,
        NivelTopesCargaComponent,
        EmpresasComponent,
        EmpresaComponent,
        DialogoConexionSapComponent,
        UsuariosComponent,
        PacientesComponent
    ],
    providers: [
        ConfiguracionService
    ]
})
export class AdministracionGeneralModule { }
