import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject, Component } from "@angular/core";


@Component({
    selector: 'dialogo-login',
    templateUrl: 'dialogo-login.component.html',
    styleUrls: ['./dialogo-login.component.scss']
})
export class DialogoLoginComponent {

    recuperarPasswordOnly = false;

    constructor(
        public dialogRef: MatDialogRef<DialogoLoginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.recuperarPasswordOnly = data.recuperarPasswordOnly;
    }

    cerrar() { this.dialogRef.close(); }

}