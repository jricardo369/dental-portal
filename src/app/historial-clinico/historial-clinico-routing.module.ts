import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialPacientesComponent } from './historial-pacientes/historial-pacientes.component';
import { RouterModule, Routes } from '@angular/router';
import { AppBarNavItem } from '../app-nav-item';

const routes: Routes = [
  { path: 'historial-pacientes', component: HistorialPacientesComponent, },

  { path: '', pathMatch: 'full', redirectTo: 'historial-pacientes' },
];

const MODULE: AppBarNavItem = {
  module: null,
  title: 'Historial Clínico',
  subtitle: null,
  uri: 'historial-clinico',
  svgName: 'general-manage',
  isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
};

export const HISTORIAL_CLINICO_ITEMS: AppBarNavItem[] = [
  {
      module: MODULE,
      svgName: 'users',
      title: 'Historial de pacientes',
      subtitle: 'Administra los usuarios y sus permisos en el portal',
      uri: 'historial-pacientes',
      isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialClinicoRoutingModule { }
