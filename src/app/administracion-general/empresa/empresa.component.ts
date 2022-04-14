import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from './../../../model/empresa';
import { Location } from '@angular/common';
import { ReporteService } from '../../services/reporte.service';
import { UtilService } from '../../services/util.service';
import { EmpresasService } from './../../services/empresas.service';
import { OrganizacionF } from './../../../model/organizacion-f';
import { Division } from 'src/model/division';
import { DivisionService } from 'src/app/services/division.service';
import { DialogoConexionSapComponent } from '../dialogo-conexion-sap/dialogo-conexion-sap.component';
import { MatDialog } from '@angular/material/dialog';
import { DatosConexionSAP } from 'src/model/datosConexionSAP';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {

  	empresa: Empresa = new Empresa();
	codigo: string;

	cargandoTV = false;
	msjerrorTV = false;
	msjeliminarTV = false;
	respuestaTV: number;
	loading: boolean = false;
	msjTV: string;
	actual: string;
	
	organizacion: OrganizacionF[];
	division: Division[];

	datosConexion: DatosConexionSAP = new DatosConexionSAP();
	companyBDSAP: string = "";

	constructor(
		activatedRoute: ActivatedRoute,
		private router: Router,
		private route: ActivatedRoute,
		private reporteService: ReporteService,
		public utilService: UtilService,
		private empresasService: EmpresasService,
		private divisionService: DivisionService,
    	private location: Location,
        private dialog: MatDialog
	) {
		route.params.subscribe(params => {
			this.codigo = params['id'];
			if (this.codigo.toString() != 'nueva-empresa') {
				this.refresh();
			}
		});

		this.obtenerOrganizacion();
		this.obtenerDivisiones();

	}

	delay(ms: number) {
		return new Promise( resolve => setTimeout(resolve, ms) );
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

	obtenerDivisiones() {
		this.divisionService
			.consultarDivisiones()
			.then(division => {
				this.division = division;
			})
			.catch(reason => this.utilService.manejarError(reason))
			.then(() => this.loading = false)
	}
	
	refresh() {
	this.cargandoTV = true;
	this.empresasService.obtenerEmpresa(this.codigo)
		.then(tv => {
			this.empresa = tv;
			this.cargandoTV = false;
			this.datosConexion.convertToObject(this.empresa.datosConexion);
			this.companyBDSAP = this.datosConexion.companyDB;
		})
		.catch(reason => this.utilService.manejarError(reason))
		.then(() => this.cargandoTV = false);
	}
	
	cancel() {
		this.location.back();
	}

	crear() {
		this.cargandoTV = true;

		if (this.empresa.codigo_empresa === null || this.empresa.codigo_empresa === '') {
			
			this.msjTV = "Ingrese el código de la empresa.";
			this.msjerrorTV = true;
			this.cargandoTV = false;
		} else {
			this.empresasService.crear(this.empresa)
				.then(r => {
					this.cargandoTV = false;
					if (r === 200) { this.cancel();	}
				})
				.catch(reason => this.utilService.manejarError(reason))
				.then(() => this.loading = false)
		}

	}

	guardar() {
		this.cargandoTV = true;
		if (this.empresa.codigo_empresa == null || this.empresa.codigo_empresa == "") {
			this.msjTV = "Ingrese el código de la empresa.";
			this.msjerrorTV = true;
			this.cargandoTV = false;
		} else {
			this.empresasService.editar(this.empresa)
				.then(r => {
					this.cargandoTV = false;
					this.cancel();
				})
				.catch(reason => this.utilService.manejarError(reason))
				.then(() => this.loading = false)
		}
	}

	eliminar() {
		this.utilService
			.mostrarDialogoSimple(
				"Eliminar la empresa "+ this.empresa.empresa,
				"Estás a punto de borrar la empresa "+ this.empresa.empresa + ", esta operación es irreversible ¿Estás seguro que deseas eliminarla?",
				"Eliminar la empresa "+ this.empresa.empresa,
				"Cancelar",
				'accent')
			.then(o => {
				if (o != "ok") return;
				this.cargandoTV = true;

				this.empresasService.eliminar(this.empresa.id)
					.then(el => {
						if (el.status !== 200) {
							this.cargandoTV = false;
							this.msjerrorTV = true;
							this.respuestaTV = el.status;
							this.msjTV = el.message;
		
						} else {
							this.cargandoTV = true;
							this.cancel();
						}
					});
			});
	}

	abrirVentanaConexionSAP() {
		this.dialog.open(DialogoConexionSapComponent, {
            data: {
				creando: true,
				datosConexion: this.empresa.datosConexion
			},
            disableClose: false,
        }).afterClosed().toPromise().then(valor => {
            if (valor) {
				this.empresa.datosConexion = valor;
				this.datosConexion.convertToObject(this.empresa.datosConexion);
				this.companyBDSAP = this.datosConexion.companyDB;
			}
        }).catch(reason => this.utilService.manejarError(reason));
	}

}
