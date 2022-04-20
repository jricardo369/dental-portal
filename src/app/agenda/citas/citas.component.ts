import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { DialogoCitaComponent } from '../dialogo-cita/dialogo-cita.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

	cargando: boolean = false;

	fecha: string = "";
	
	constructor(
		private router: Router,
		public utilService: UtilService,
        private dialog: MatDialog) { }

	ngOnInit(): void {
	}

	refrescar() {}

	crearCita() {
		this.dialog.open(DialogoCitaComponent, {
            data: {},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'creado') this.refrescar();
        }).catch(reason => this.utilService.manejarError(reason));
	}

	abrirCita() {
		this.dialog.open(DialogoCitaComponent, {
            data: {
				cita: "cita"
			},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'editando') this.refrescar();
        }).catch(reason => this.utilService.manejarError(reason));
	}

}
