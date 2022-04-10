import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomI18nService } from 'src/app/custom-i18n.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-empleados-fb60',
    templateUrl: './empleados-fb60.component.html',
    styleUrls: ['./empleados-fb60.component.css']
})
export class EmpleadosFb60Component implements OnInit {

    xmlFile: File
    pdfFile: File
    loading = false

    constructor(
        private proveedoresService: ProveedoresService,
        public utilService: UtilService,
        private i18: CustomI18nService
    ) {
    }

    ngOnInit(): void { }

    puedeEnviarse() { return this.xmlFile != null && this.pdfFile != null && !this.loading }

    onXmlFileSelected(files: FileList) { this.xmlFile = files.length ? files.item(0) : null; }

    onPdfFileSelected(files: FileList) { this.pdfFile = files.length ? files.item(0) : null; }

    enviar() {
        this.loading = true
        this.proveedoresService
            .cargarFacturaFB60E(this.xmlFile, this.pdfFile)
            .then((response: HttpResponse<{
                result: {
                    message: string
                    status: string
                }
            }>) => {
                let result = response.body.result;
                
                if (result.status !== "MANUAL") throw result.message;
                
                this.utilService.mostrarDialogoSimple(result.status, result.message);
                this.xmlFile = null
                this.pdfFile = null
            })
            .catch(reason => {
                console.error(reason)
                this.utilService.manejarError(reason)
            })
            .then(() => this.loading = false)
    }
}
