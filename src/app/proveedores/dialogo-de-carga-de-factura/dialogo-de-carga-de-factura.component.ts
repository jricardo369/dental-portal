import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'dialogo-de-carga-de-factura',
    templateUrl: './dialogo-de-carga-de-factura.component.html',
    styleUrls: ['./dialogo-de-carga-de-factura.component.scss'],
})
export class DialogoDeCargaDeFactura {

    xmlFile: File;
    pdfFile: File;

    disableXml = false;

    constructor(public dialogRef: MatDialogRef<DialogoDeCargaDeFactura>, @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data && data.disableXml == true) this.disableXml = true;
    }

    onXmlFileSelected(files: FileList) { this.xmlFile = files.length ? files.item(0) : null; }

    onPdfFileSelected(files: FileList) { this.pdfFile = files.length ? files.item(0) : null; }

    cancelar() { this.dialogRef.close(); }

    enviarArchivos() {
        this.dialogRef.close({
            xmlFile: this.disableXml ? null : this.xmlFile,
            pdfFile: this.pdfFile
        });
    }
}