import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasComponent } from './citas/citas.component';
import { RouterModule, Routes } from '@angular/router';
import { AppBarNavItem } from '../app-nav-item';

const routes: Routes = [
  { path: 'citas', component: CitasComponent, },

  { path: '', pathMatch: 'full', redirectTo: 'citas' },
];

const MODULE: AppBarNavItem = {
  module: null,
  title: 'Agenda',
  subtitle: null,
  uri: 'agenda',
  svgName: 'general-manage',
  isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
};

export const AGENDA_ITEMS: AppBarNavItem[] = [
  {
      module: MODULE,
      svgName: 'users',
      title: 'Citas',
      subtitle: 'Administra los usuarios y sus permisos en el portal',
      uri: 'citas',
      isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
