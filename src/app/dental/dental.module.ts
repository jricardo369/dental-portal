import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda/agenda.component';
import { HistorialClinicoComponent } from './historial-clinico/historial-clinico.component';
import { PagosComponent } from './pagos/pagos.component';



@NgModule({
  declarations: [AgendaComponent, HistorialClinicoComponent, PagosComponent],
  imports: [
    CommonModule
  ]
})
export class DentalModule { }
