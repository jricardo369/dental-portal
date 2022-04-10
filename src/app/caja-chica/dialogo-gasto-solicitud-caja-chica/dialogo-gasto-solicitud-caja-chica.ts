import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject, Component } from "@angular/core";

@Component({
    selector: 'dialogo-gasto-solicitud-caja-chica',
    templateUrl: 'dialogo-gasto-solicitud-caja-chica.html',
    styleUrls: ['./dialogo-gasto-solicitud-caja-chica.scss']
})
export class DialogoGastoSolicitudCajaChicaComponent {

    id: number = null;
    sociedad: string = null;

    constructor(
        public dialogRef: MatDialogRef<DialogoGastoSolicitudCajaChicaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.id = data.id;
        this.sociedad = data.sociedad;
    }

    cerrar() { this.dialogRef.close(); }

    enviado() { this.dialogRef.close('creado'); }
}