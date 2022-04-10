import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject, Component } from "@angular/core";


@Component({
    selector: 'dialogo-comprobante',
    templateUrl: 'dialogo-comprobante.component.html',
    styleUrls: ['./dialogo-comprobante.component.scss']
})
export class DialogoComprobanteComponent {

    noTrayecto: number;

    constructor(
        public dialogRef: MatDialogRef<DialogoComprobanteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.noTrayecto = data.noTrayecto;
    }

    cerrar() { this.dialogRef.close(); }

    enviado() { this.dialogRef.close('creado'); }
}