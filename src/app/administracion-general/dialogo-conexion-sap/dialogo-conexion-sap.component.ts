import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatosConexionSAP } from 'src/model/datosConexionSAP';

@Component({
	selector: 'app-dialogo-conexion-sap',
	templateUrl: './dialogo-conexion-sap.component.html',
	styleUrls: ['./dialogo-conexion-sap.component.scss']
})
export class DialogoConexionSapComponent {

    datosConexion: DatosConexionSAP = new DatosConexionSAP();

    cadena: string = "";

    constructor(
        public dialogRef: MatDialogRef<DialogoConexionSapComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.datosConexion.convertToObject(data.datosConexion);
        console.log(this.datosConexion);
    }

    terminar() {
        this.cadena = this.datosConexion.convertToString();
        console.log(this.cadena);
        this.editado();
    }

    cerrar() { this.dialogRef.close(); }

    editado() { this.dialogRef.close(this.cadena); }
}