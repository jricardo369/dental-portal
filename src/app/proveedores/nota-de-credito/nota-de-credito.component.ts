import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../services/proveedores.service';
import { SessionService } from '../../services/session.service';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../model/usuario';
import { DialogoDeCargaDeFactura } from '../dialogo-de-carga-de-factura/dialogo-de-carga-de-factura.component';
import { DialogoSimpleComponent } from '../../common/dialogo-simple/dialogo-simple.component';
import { CustomI18nService } from 'src/app/custom-i18n.service';
import { UtilService } from 'src/app/services/util.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-nota-de-credito',
    templateUrl: './nota-de-credito.component.html',
    styleUrls: ['./nota-de-credito.component.css']
})
export class NotaDeCreditoComponent {

    ordenDeCompraSeleccionada: string = null; // esto lo agregué para que compilara, seguramente falta codigo o sobra codigo (mas bien lo segundo)

    conOrdenDeCompra: boolean;
    numeroDeOrdenDeCompra: string = '';
    tipoDeOperacion: string = 'D';
    usuario: Usuario;
    loading: boolean;

    constructor(
        public utilService: UtilService,
        private proveedoresService: ProveedoresService,
        private sessionService: SessionService,
        private dialog: MatDialog,
        private customI18n: CustomI18nService
    ) {
        this.sessionService
            .getUsuario()
            .then(u => this.usuario = u)
            .catch(r => alert(r));
    }

    abrirVentanaDeSeleccionDeFacturas() {

        let xmlObligatorio = this.sessionService.xmlObligatorio
console.log("BANANA")
        let dialogRef = this.dialog.open(DialogoDeCargaDeFactura, {
            disableClose: true,
            data: { disableXml: !xmlObligatorio }
        });
        dialogRef.afterClosed().subscribe(resultadoArchivos => {

            if (resultadoArchivos) {
                let dialogRef = this.dialog.open(DialogoSimpleComponent, {
                    data: {
                        titulo: this.customI18n.get('contelec.EnviarFactura'),
                        texto: this.customI18n.get('proveedores.x.estaAccionNoPuedeDeshacerce'),
                        botones: [
                            { texto: this.customI18n.get('contelec.Cancelar') },
                            { texto: this.customI18n.get('contelec.EnviarFactura'), color: 'accent', valor: 'ok' },
                        ]
                    },
                    disableClose: true,
                });
                dialogRef.afterClosed().subscribe(result => {

                    if (result == 'ok') {

                        this.loading = true;
                        this.proveedoresService
                            .enviarFacturaNotaCredito(
                                resultadoArchivos.pdfFile,
                                resultadoArchivos.xmlFile,
                                this.conOrdenDeCompra ? this.numeroDeOrdenDeCompra : undefined,
                                this.conOrdenDeCompra ? this.tipoDeOperacion : undefined
                            )
                            .then(response => {

                                let title = '...';
                                let message = '...';

                                console.log(response);
                                if (response instanceof HttpResponse) {
                                    let body = response.body;
                                    if (body.result) {
                                        title = body.result.status;
                                        message = body.result.message;
                                        // if (title == 'MANUAL') message = 'Manual';
                                    }
                                }
                                this.utilService.mostrarDialogoSimple(title, message);
                                this.numeroDeOrdenDeCompra = "";
                            })
                            .catch(reason => this.utilService.manejarError(reason))
                            .then(() => this.loading = false);

                    }
                });
            }

        });
    }
}
