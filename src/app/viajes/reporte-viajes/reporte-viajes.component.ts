import { Component  } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { Solicitud } from './../../../model/solicitud';
import { Estatus } from './../../../model/estatus';
import { OrganizacionF } from './../../../model/organizacion-f';
import { ReporteService } from '../../services/reporte.service';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { PaginationManager } from 'src/util/pagination';

interface Organizacion {
	id: string;
	nombre: string;
	rfc: boolean;
}

@Component({
	selector: 'app-reporte-viajes',
	templateUrl: './reporte-viajes.component.html',
	styleUrls: ['./reporte-viajes.component.scss']
})
	
export class ReporteViajesComponent  {
	
	mostrarFiltros = false;
	estSel : string;
	orgSel : string;
	titulo: string = 'Reporte de solicitudes';
	org: string[];
	orga: any[];
	solicitudes: Solicitud[];
	estatus: Estatus[];
	eventos: string[];
	organizacion: OrganizacionF[];
	loading: boolean = false;
	permiteCrearViaje = false;
	todayISOString: string = new Date().toISOString();
	fecha1MesAtras: string = "";
	fechaF:string;
	fechaI: string = '2020-01-01';
	paginacion: PaginationManager = new PaginationManager();

	busquedaEvento: boolean = false;
	evento: string = '';
	numeroSolicitudFiltro: number = null;

	montoTotal: number = 0;

	selected = ['1'];

	constructor(
		private reporteService: ReporteService,
		public utilService: UtilService,
		public slider:MatSliderModule,
		public select: MatSelectModule,  
	) { 
		var fecha = this.todayISOString.split('T', 1);
		this.fechaF = fecha[0];

		var date = new Date(this.todayISOString);
		date.setMonth(date.getMonth() - 1);
		this.fecha1MesAtras = ((date.toISOString()).split('T', 1))[0];
		this.fechaI = this.fecha1MesAtras;

		this.estSel = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15";
		this.orgSel = "4MS";

		let filtroInicial = {
			busquedaEvento: this.busquedaEvento,
			estSel: this.estSel,
			evento: this.evento,
			fechaI: this.fechaI,
			fechaF: this.fechaF,
			numeroSolicitudFiltro: this.numeroSolicitudFiltro
		};

		sessionStorage.setItem('filtroInicial', JSON.stringify(filtroInicial));
		
		let filtroReporte = JSON.parse(sessionStorage.getItem('filtroReporte'));
		if (!filtroReporte) sessionStorage.setItem('filtroReporte', JSON.stringify(filtroInicial));

		this.obtenerSolicitudes();
		this.obtenerEstatus();
		this.obtenerEventos();
	}

	obtenerSolicitudes() {
		// let filtroInicial = {
        //     busquedaEvento: false,
        //     estSel: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
        //     evento: "",
        //     fechaI: this.fecha1MesAtras,
        //     fechaF: (this.todayISOString.split('T', 1))[0],
        //     numeroSolicitudFiltro: null
        // };

		let filtroInicial = JSON.parse(sessionStorage.getItem('filtroInicial'));
		let filtroReporte = JSON.parse(sessionStorage.getItem('filtroReporte'));

		if (filtroReporte.busquedaEvento !== this.busquedaEvento ||
			filtroReporte.estSel !== this.estSel ||
			filtroReporte.evento !== this.evento ||
			filtroReporte.fechaI !== this.fechaI ||
			filtroReporte.fechaF !== this.fechaF ||
			filtroReporte.numeroSolicitudFiltro !== this.numeroSolicitudFiltro) {
			if (filtroInicial.busquedaEvento !== this.busquedaEvento ||
				filtroInicial.estSel !== this.estSel ||
				filtroInicial.evento !== this.evento ||
				filtroInicial.fechaI !== this.fechaI ||
				filtroInicial.fechaF !== this.fechaF ||
				filtroInicial.numeroSolicitudFiltro !== this.numeroSolicitudFiltro) {
				let filtroNuevo = {
					busquedaEvento: this.busquedaEvento,
					estSel: this.estSel,
					evento: this.evento,
					fechaI: this.fechaI,
					fechaF: this.fechaF,
					numeroSolicitudFiltro: this.numeroSolicitudFiltro
				};
		
				sessionStorage.setItem('filtroReporte', JSON.stringify(filtroNuevo));
			} else {
				this.busquedaEvento = filtroReporte.busquedaEvento;
				this.estSel = filtroReporte.estSel;
				this.selected = (this.estSel.split(','));
				this.selected.pop();
				// (this.estSel.split(',')).forEach(idEst => {
				// 	this.selected.push(this.estatus.find(e => e.id.toString() == idEst).id.toString());
				// });
				this.evento = filtroReporte.evento;
				this.fechaI = filtroReporte.fechaI;
				this.fechaF = filtroReporte.fechaF;
				this.numeroSolicitudFiltro = filtroReporte.numeroSolicitudFiltro;
			}
		}

		this.loading = true;
		this.reporteService
			.consultarSolicitudesReporte(!this.busquedaEvento ? this.estSel : this.evento,this.fechaI,this.fechaF,localStorage.getItem('empresas'), this.busquedaEvento, this.numeroSolicitudFiltro)
			.then(solicitudes => {
				this.solicitudes = solicitudes;
				this.ordenarSolicitudes();
				this.paginacion.setArray(this.solicitudes);
				this.calcularMontoTotal();
			})
			.catch(reason => this.utilService.manejarError(reason))
			.then(() => this.loading = false)
	}

	descargaViajesPDF() {
		this.loading = true;
		this.reporteService
			.descargarSolicitudesReportePDF(localStorage.getItem('usuario'),!this.busquedaEvento ? this.estSel : this.evento,this.fechaI,this.fechaF,localStorage.getItem('empresas'), this.busquedaEvento, this.numeroSolicitudFiltro)
			.subscribe(
				data => {
					const file = new Blob([data], { type: 'application/pdf' });
					const fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
			);
			this.loading = false;
	}

	descargaViajesXLSX() {
		this.loading = true;
		this.reporteService
			.descargarSolicitudesReporteXLSX(localStorage.getItem('usuario'),!this.busquedaEvento ? this.estSel : this.evento,this.fechaI,this.fechaF,localStorage.getItem('empresas'), this.busquedaEvento, this.numeroSolicitudFiltro)
			.subscribe(
				data => {
					const file = new Blob([data], { type: 'application/vnd.ms-excel' });
					// const fileURL = URL.createObjectURL(file);
					// window.open(fileURL + "x");

					var fileURL = URL.createObjectURL(file);
					let link: any = window.document.createElement('a');
					link.href = fileURL;
					let aux = fileURL.split('/');
					link.download = aux[aux.length - 1] + ".xlsx";
					link.click();
				}
			);
			this.loading = false;
	}

	ordenarSolicitudes() {
		this.solicitudes.sort((a: Solicitud, b: Solicitud) => parseInt(a.numeroSolicitud) > parseInt(b.numeroSolicitud) ? -1 : 1);
	}

	obtenerEventos() {
		this.loading = true;
		this.reporteService
			.consultarEventos()
			.then(eventos => {
				this.eventos = eventos;
			})
			.catch(reason => this.utilService.manejarError(reason))
			.then(() => this.loading = false)
	}

	obtenerEstatus() {
		this.loading = true;
		this.reporteService
			.consultarEstatus()
			.then(estatus => {
				this.estatus = estatus;
			})
			.catch(reason => this.utilService.manejarError(reason))
			.then(() => this.loading = false)
	}

	seleEst()
	{
		this.estSel = "";
		for (let i= 0; i<this.selected.length; i++)
		{
			this.estSel = this.estSel + this.selected[i] + ',';
		}
		console.log(this.selected)
		this.obtenerSolicitudes();
	}

	cambiarAEventos() {
		this.evento = '';
		if (this.busquedaEvento) {
			this.solicitudes = [];
			this.ordenarSolicitudes();
			this.paginacion.setArray(this.solicitudes);
			this.calcularMontoTotal();
		}
		else {
			this.estSel = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15";
			this.obtenerSolicitudes();
		}
	}

	calcularMontoTotal() {
        this.montoTotal = this.solicitudes.map(e => e.totalAnticipo).reduce((a, b) => a + b, 0);
    }

	limpiarFiltro(){
		let filtroInicial = JSON.parse(sessionStorage.getItem('filtroInicial'));
		sessionStorage.setItem('filtroReporte', JSON.stringify(filtroInicial));
		this.busquedaEvento = filtroInicial.busquedaEvento;
		this.estSel = filtroInicial.estSel;
		this.evento = filtroInicial.evento;
		this.fechaI = filtroInicial.fechaI;
		this.fechaF = filtroInicial.fechaF;
		this.numeroSolicitudFiltro = filtroInicial.numeroSolicitudFiltro;
		this.obtenerSolicitudes();
	}

}
