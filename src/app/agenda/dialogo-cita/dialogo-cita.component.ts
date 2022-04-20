import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-dialogo-cita',
  templateUrl: './dialogo-cita.component.html',
  styleUrls: ['./dialogo-cita.component.css']
})
export class DialogoCitaComponent implements OnInit {

	cargando: boolean = false;
	creando: boolean = false;
	titulo: string = '';	

	constructor(
		public utilService: UtilService,
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<DialogoCitaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
			if (data.cita) {
				this.titulo = "Cita"
				this.creando = false;
			} else {
				this.titulo = "Crear Cita";
				this.creando = true;
			}
		}

	ngOnInit(): void {
	}

	cerrar() { this.dialogRef.close(); }

}
