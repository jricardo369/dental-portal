import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { DialogoHistorialComponent } from './../dialogo-historial/dialogo-historial.component';

@Component({
  selector: 'app-historial-pacientes',
  templateUrl: './historial-pacientes.component.html',
  styleUrls: ['./historial-pacientes.component.scss']
})
export class HistorialPacientesComponent implements OnInit {

	cargando: boolean = false;
	esPaciente: boolean = false;
	titulo: string = "";

	fecha: string = "";
	
	constructor(
        activatedRoute: ActivatedRoute,
		private router: Router,
		public utilService: UtilService,
        private dialog: MatDialog) { 
			if (activatedRoute.routeConfig.path == 'historial-pacientes') {
				this.esPaciente = false;
				this.titulo = "Historial de pacientes"
			}
			else if (activatedRoute.routeConfig.path == 'mi-historial') {
				this.esPaciente = true;
				this.titulo = "Mi historial"
			}
		}

	ngOnInit(): void {
	}

	refrescar() {}

	altaHistorial() {
		this.dialog.open(DialogoHistorialComponent, {
            data: {},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'creado') this.refrescar();
        }).catch(reason => this.utilService.manejarError(reason));
	}

	abrirHistorial() {
		this.dialog.open(DialogoHistorialComponent, {
            data: {
				historial: "historial"
			},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'editando') this.refrescar();
        }).catch(reason => this.utilService.manejarError(reason));
	}


	descargarPdf() {}

}
