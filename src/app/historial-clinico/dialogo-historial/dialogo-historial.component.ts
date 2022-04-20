import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-dialogo-historial',
  templateUrl: './dialogo-historial.component.html',
  styleUrls: ['./dialogo-historial.component.css']
})
export class DialogoHistorialComponent implements OnInit {

	baseHref = document.baseURI;
	
	cargando: boolean = false;
	creando: boolean = false;
	titulo: string = '';

	public file: File;

	constructor(
		public utilService: UtilService,
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<DialogoHistorialComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
			if (data.historial) {
				this.titulo = "Historial"
				this.creando = false;
			} else {
				this.titulo = "Alta Historial";
				this.creando = true;
			}
		}

	ngOnInit(): void {
	}

	onFileSelected(files: FileList) { 
        this.file = files.length && files.item(0).type.startsWith('image/') ? files.item(0) : null;
    }

	cerrar() { this.dialogRef.close(); }

}
