import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ViajesService } from 'src/app/services/viajes.service';
import { Organizacion } from 'src/model/organizacion';
import { Solicitud } from 'src/model/solicitud';
import { PaginationManager } from 'src/util/pagination';

@Component({
	selector: 'app-comprobaciones-contador',
	templateUrl: './comprobaciones-contador.component.html',
	styleUrls: ['./comprobaciones-contador.component.scss']
})
export class ComprobacionesContadorComponent {

	solicitudes: Solicitud[] = [];
	solicitudesSelected: Solicitud[] = [];
	todosSeleccionados: boolean = false;
	loading: boolean = false;

	estatus_aprobador: string = "";

	director: boolean = false;
	empresaI: string = "";
	fechaI: string = "";
	fechaF: string = "";

	empresas: Organizacion[] = [];

	paginacion: PaginationManager = new PaginationManager();

	montoSolicitadoTotal: number = 0;
	montoComprobadoTotal: number = 0;
	montoSolicitadoTotalSelecccionado: number = 0;
	montoComprobadoTotalSelecccionado: number = 0;

	constructor(
		private viajesService: ViajesService,
		public utilService: UtilService
	) {
		this.obtenerSolicitudesPorAprobador();

		this.fechaI = this.dateAsYYYYMMDD(this.obtenerPrimerDiaDeSemana(new Date(Date.now()), 0));
		this.fechaF = this.dateAsYYYYMMDD(this.obtenerUltimoDiaDeSemana(new Date(Date.now()), 6));
		// this.fechaI = '2021-03-01';
		// this.fechaF = '2021-03-11';
		let usuario = JSON.parse(localStorage.getItem('objUsuario'));
		this.empresas = usuario.organizaciones;
	}

	obtenerSolicitudesPorAprobador() {
		this.obtenerEstatusPorAprobador();
		this.loading = true;
		this.viajesService
			.consultarSolicitudesDeUsuarioPorEmpresaYEstatus(this.director ? this.empresaI : localStorage.getItem('empresas'), this.estatus_aprobador, this.fechaI, this.fechaF, this.director)
			.then(solicitudes => {
				this.solicitudes = solicitudes;
				this.ordenarSolicitudes();
				this.paginacion.setArray(this.solicitudes);
				this.calcularMontosTotales();
			})
			.catch(reason => this.utilService.manejarError(reason))
			.then(() => this.loading = false);
	}

	ordenarSolicitudes() {
		this.solicitudes.sort((a: Solicitud, b: Solicitud) => parseInt(a.numeroSolicitud) > parseInt(b.numeroSolicitud) ? -1 : 1);
	}

	obtenerEstatusPorAprobador() {
		var roles = localStorage.getItem('rolAprobador').split(",");
		let estatus_string = '';

		roles.forEach(rol => {
			switch (rol) {
				case 'CONTABILIDAD':
					estatus_string += '5'; // Comprobación pendiente contador
					estatus_string += ',';
					break;
				case 'GERENTES':
					estatus_string += '8'; // Comprobación pendiente gerente
					estatus_string += ',';
					break;
				case 'CONTADOR PRESTADORA':
					estatus_string += '11'; // Comprobación pendiente por prestadora
					estatus_string += ',';
					break;
				default:
					estatus_string += '';
					break;
			}
		});

		if(roles.some(r => r === 'DIRECTOR')){
			let estatus:string = '';
			for (let i = 5; i < 15; i++) { //5 a 13
				estatus += i.toString();
				estatus += ','
			}
			estatus_string = estatus;
			this.director = true;
		}
		
		this.estatus_aprobador = estatus_string.substring(0, estatus_string.length - 1);
	}

	obtenerPrimerDiaDeSemana(hoy: Date, primerDia: number): Date {
		while (hoy.getDay() !== primerDia) {
			hoy.setDate(hoy.getDate() - 1);
		}
		return hoy;
	}

	obtenerUltimoDiaDeSemana(hoy: Date, ultimoDia: number): Date {
		while (hoy.getDay() !== ultimoDia) {
			hoy.setDate(hoy.getDate() + 1);
		}
		return hoy;
	}

	dateAsYYYYMMDD(date: Date): string {
		return '' + date.getFullYear() + '-' + this.withLeadingZeros((date.getMonth() + 1), 2) + '-' + this.withLeadingZeros((date.getDate()), 2);
	}

	withLeadingZeros(integer: number, digits: number): string {
		let n = '' + Number.parseInt('' + integer);
		for (let i = n.length; i < digits; i++) n = '0' + n;
		return n;
	}

	dateAsDDMMYYYY(date: string): string {
		var splitted = date.split('-'); 
		return '' + splitted[2] + '/' + splitted[1] + '/' + splitted[0];
	}

	seleccionar(e: Solicitud) {
        (e as any).seleccionado = !(e as any).seleccionado;
        this.actualizarSolicitudesSeleccionadas();
    }

    seleccionarTodos() {
		this.todosSeleccionados = !this.todosSeleccionados;
        this.solicitudes.forEach(e => (e as any).seleccionado = this.todosSeleccionados);
        this.actualizarSolicitudesSeleccionadas();
    }

    actualizarSolicitudesSeleccionadas() {
        this.solicitudesSelected.length = 0;
        this.solicitudes.forEach(e => {
            if ((e as any).seleccionado) {
                this.solicitudesSelected.push(e);
            }
        })
        console.log(this.solicitudesSelected)
		this.calcularMontosTotalesSeleccionados();
        return this.solicitudesSelected.length;
    }

	estaSeleccionado(numeroSolicitud: string) {
        return this.solicitudesSelected.find(e => e.numeroSolicitud == numeroSolicitud) != null;
    }

	estanTodosSeleccionados() {
        this.todosSeleccionados = this.solicitudesSelected.length == this.solicitudes.length && this.solicitudes.length > 0;
		return this.todosSeleccionados;
    }

	voBoSolicitudes() {
		let campos = [];
        campos.push({ label: "¿Desea agregar algún comentario?", type: "textarea", placeholder: "Comentario ...", value: "" , maxLength:"45"});
        this.utilService
            .mostrarDialogoConFormulario(
                "Vobo. a las comprobaciones",
                "Está a punto de dar el vobo. a las comprobaciones seleccionadas,"+
                " esta operación es irreversible.",
                "Dar vobo. a las comprobaciones",
                "Cancelar",
                campos,
                'accent')
            .then(o => {
                if (o != "ok") return;
                this.loading = true;
				let numerosSolicitudes = '';
				this.solicitudesSelected.forEach(e => numerosSolicitudes = numerosSolicitudes + (e as any).numeroSolicitud.toString() + ',');
				numerosSolicitudes = numerosSolicitudes.substring(0, numerosSolicitudes.length - 1);
                this.viajesService
                .autorizarRechazarSolicitudesPorContador(numerosSolicitudes, 'AUTORIZAR',campos[0].value)
                .then(() => {
                    this.obtenerSolicitudesPorAprobador();
                })
                .catch(reason => this.utilService.manejarError(reason))
                .then(() => this.loading = false);
            });
	}

	calcularMontosTotales() {
        this.montoSolicitadoTotal = this.solicitudes.map(e => e.totalAnticipo).reduce((a, b) => a + b, 0);
        this.montoComprobadoTotal = this.solicitudes.map(e => e.totalComprobado).reduce((a, b) => a + b, 0);
    }

	calcularMontosTotalesSeleccionados() {
		this.montoSolicitadoTotalSelecccionado = this.solicitudesSelected.map(e => e.totalAnticipo).reduce((a, b) => a + b, 0);
        this.montoComprobadoTotalSelecccionado = this.solicitudesSelected.map(e => e.totalComprobado).reduce((a, b) => a + b, 0);
    }
}
