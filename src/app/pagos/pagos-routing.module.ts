import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosComponent } from './pagos/pagos.component';
import { RouterModule, Routes } from '@angular/router';
import { AppBarNavItem } from '../app-nav-item';

const routes: Routes = [
	{ path: 'pagos', component: PagosComponent, },
  
	{ path: '', pathMatch: 'full', redirectTo: 'pagos' },
  ];
  
  const MODULE: AppBarNavItem = {
	module: null,
	title: 'Pagos',
	subtitle: null,
	uri: 'pagos',
	svgName: 'general-manage',
	isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
  };
  
  export const PAGOS_ITEMS: AppBarNavItem[] = [
	{
		module: MODULE,
		svgName: 'users',
		title: 'Pagos',
		subtitle: 'Administra los usuarios y sus permisos en el portal',
		uri: 'pagos',
		isVisibleFor: u => u.rol.some(r => r.descripcion === 'ADMINISTRADOR')
	},
  ]
  
  @NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
  })
export class PagosRoutingModule { }
