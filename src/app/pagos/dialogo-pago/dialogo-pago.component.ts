import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-dialogo-pago',
  templateUrl: './dialogo-pago.component.html',
  styleUrls: ['./dialogo-pago.component.css']
})
export class DialogoPagoComponent implements OnInit {

	cargando: boolean = false;
	ediandoCamposDeCabecera = true;

	constructor(
		public utilService: UtilService,
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<DialogoPagoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit(): void {
	}

	crear() {}

	cerrar() { this.dialogRef.close(); }

}
