import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subcuenta } from '../../../model/subcuenta';
import { CuentasContablesService } from '../../services/cuentas-contables.service';
import { OrganizacionF } from './../../../model/organizacion-f';
import { ReporteService } from '../../services/reporte.service';
import { UtilService } from '../../services/util.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-cuenta-contable',
	templateUrl: './cuenta-contable.component.html',
	styleUrls: ['./cuenta-contable.component.css']
})
export class CuentaContableComponent {

	subcuenta: Subcuenta = new Subcuenta();
	idcuenta: string;

	cargandoTV = false;
	msjerrorTV = false;
	msjeliminarTV = false;
	respuestaTV: number;
	loading: boolean = false;
	msjTV: string;
	organizacion: OrganizacionF[];
	actual: string;


	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private reporteService: ReporteService,
		public utilService: UtilService,
		private cuentasservice: CuentasContablesService,
		private location: Location
	) {
		route.params.subscribe(params => {
			this.idcuenta = params['id'];
			if (this.idcuenta.toString() != 'nueva-cuenta') {
				this.refresh();
			}
			else
			{
				this.subcuenta.codigo = "";
			}
		});
		this.obtenerOrganizacion();
	}

	delay(ms: number) {
		return new Promise( resolve => setTimeout(resolve, ms) );
	}
	
	refresh() {
	this.cargandoTV = true;
	this.cuentasservice.obtenerSubcuenta(Number(this.idcuenta))
		.then(tv => {
			this.subcuenta = tv;
			this.cargandoTV = false;
		})
		.catch(reason => this.utilService.manejarError(reason))
		.then(() => this.cargandoTV = false);
	}
	
	cancel() {
		this.location.back();
	}

	crear() {
		this.cargandoTV = true;

		if (this.subcuenta.codigo === null || this.subcuenta.codigo === '') {
			
			this.msjTV = "Ingrese el código de la cuenta.";
			this.msjerrorTV = true;
			this.cargandoTV = false;
		} else {
			this.cuentasservice.crear(this.subcuenta)
				.then(r => {
					this.cargandoTV = false;
					if (r === 200) {
						this.router.navigate(['administracion-general/cuentas-contables']);
						}
				})
				.catch(reason => this.utilService.manejarError(reason))
				.then(() => this.loading = false)
		}

	}

	guardar() {
		this.cargandoTV = true;
		if (this.subcuenta.codigo == null || this.subcuenta.codigo == "") {
			this.msjTV = "Ingrese el código de la cuenta.";
			this.msjerrorTV = true;
			this.cargandoTV = false;
		} else {
			this.cuentasservice.editar(this.subcuenta)
				.then(r => {
					this.cargandoTV = false;
					this.router.navigate(['administracion-general/cuentas-contables']);
				})
				.catch(reason => this.utilService.manejarError(reason))
				.then(() => this.loading = false)
		}
	}

			
	obtenerOrganizacion() {
	this.reporteService
		.consultarOrganizacion()
		.then(organizacion => {
			this.organizacion = organizacion;
		})
		.catch(reason => this.utilService.manejarError(reason))
		.then(() => this.loading = false)
	}


	eliminar()
	{
			this.utilService
					.mostrarDialogoSimple(
							"Eliminar la cuenta contable "+ this.subcuenta.codigo,
							"Estás a punto de borrar la cuenta contable  "+ this.subcuenta.codigo+", esta operación es irreversible ¿Estás seguro que deseas eliminar?",
							"Eliminar la cuenta  "+ this.subcuenta.codigo,
							"Cancelar",
							'accent')
					.then(o => {
							if (o != "ok") return;
							this.cargandoTV = true;

							this.cuentasservice.eliminar(Number(this.idcuenta))
								.then(el => {
									if (el.status !== 200) {
										this.cargandoTV = false;
										this.msjerrorTV = true;
										this.respuestaTV = el.status;
										this.msjTV = el.message;
					
									} else {
										this.cargandoTV = true;
										this.router.navigate(['administracion-general/cuentas-contables']);
									}
								});
					});
	}





}
