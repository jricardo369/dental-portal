import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceNavComponent } from '../common/workspace-nav/workspace-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { ExperimentalMenuComponent } from '../common/experimental-menu/experimental-menu.component';
import { BitacoraComponent } from '../common/bitacora/bitacora.component';

@NgModule({
    declarations: [
        WorkspaceNavComponent,
        ExperimentalMenuComponent,
        BitacoraComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        WorkspaceNavComponent,
        ExperimentalMenuComponent,
        BitacoraComponent,
    ]
})
export class ViaticosUiModule { }
