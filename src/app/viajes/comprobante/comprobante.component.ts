import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComprobanteFormComponent } from '../comprobante-form/comprobante-form.component';

@Component({
    selector: 'app-comprobante',
    templateUrl: './comprobante.component.html',
    styleUrls: ['./comprobante.component.css']
})
export class ComprobanteComponent implements OnInit {

    @ViewChild('comprobanteForm', { static: true })
    comprobanteForm: ComprobanteFormComponent;

    noTrayecto: number = null;
    idComprobante: number = null;

    titulo: string = null;
    mostrarXML: boolean = true;

    creando: boolean;
    editando: boolean;
    autorizando: boolean;

    constructor(
        private location: Location,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        if (this.activatedRoute.routeConfig.path.endsWith('comprobaciones-contador/:id/comprobantes/:jd')) {
            this.autorizando = true;
        } else if (this.activatedRoute.routeConfig.path.endsWith('comprobantes/:jd')) {
            this.editando = true;
        } else if (this.activatedRoute.routeConfig.path.endsWith('comprobantes/nuevo-comprobante')) {
            this.titulo = 'Nuevo comprobante';
            this.creando = true;
        }

        if (this.editando || this.autorizando) {
            this.activatedRoute.params.forEach(data => {
                this.comprobanteForm.noTrayecto = this.noTrayecto = data.id;
                this.comprobanteForm.idComprobante = this.idComprobante = data.jd;
                this.titulo = 'Comprobante ' + this.idComprobante;
                this.actualizar();
            })
        }
    }

    descargarPdf() { this.comprobanteForm.descargarPdfXml('pdf'); }

    descargarXml() { this.comprobanteForm.descargarPdfXml('xml'); }

    actualizar() { this.comprobanteForm.actualizar(); }

    eliminar() { this.comprobanteForm.eliminar(); }

    cancelar() { this.location.back(); }
}
