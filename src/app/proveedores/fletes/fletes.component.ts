import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Usuario } from '../../../model/usuario';
import { ProveedoresService } from '../../services/proveedores.service';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from '../../services/util.service';
import { DialogoSimpleComponent } from '../../common/dialogo-simple/dialogo-simple.component';

@Component({
    selector: 'app-fletes',
    templateUrl: './fletes.component.html',
    styleUrls: ['./fletes.component.css']
})
export class FletesComponent {

    ordenDeCompraSeleccionada: string = null; // esto lo agregué para que compilara, seguramente falta codigo o sobra codigo (mas bien lo segundo)
    numeroDeOrdenDeCompraABuscar: string = '';
    usuario: Usuario;
    loading: boolean = false;

    constructor(
        private utilService: UtilService,
        private sessionService: SessionService,
        private proveedoresService: ProveedoresService,
        private dialog: MatDialog,
    ) {
        sessionService
            .getUsuario()
            .then(u => { this.usuario = u })
            .catch(r => { alert(r); });
    }

    buscarPorOrdenDeCompra() {
        this.loading = true;
        this.proveedoresService
            .obtenerOrdenesDeCompra(this.usuario.id, null, null, 'F', this.numeroDeOrdenDeCompraABuscar)
            .then(ordenesDeCompra => {

                if (ordenesDeCompra.length == 0) {
                    this.dialog.open(DialogoSimpleComponent, {
                        data: {
                            titulo: 'Orden de compra no encontrada',
                            texto: 'No se encontró la orden de compra con el número ' + this.numeroDeOrdenDeCompraABuscar,
                            botones: [{ texto: 'Entendido', color: 'accent' },]
                        },
                        disableClose: true,
                    });
                    this.loading = false;
                    return;
                }

                console.log(ordenesDeCompra);
                this.buscarEntradasDeMercancia();

            })
            .catch(r => {
                this.loading = false;
                this.utilService.manejarError(r);
            });
    }

    buscarEntradasDeMercancia() {
        this.loading = true;
        this.proveedoresService
            .obtenerEntradasDeMercancia(this.numeroDeOrdenDeCompraABuscar, 'F')
            .then(entradasDeMercancia => {

                console.log(entradasDeMercancia);

            })
            .catch(r => this.utilService.manejarError(r))
            .then(() => this.loading = false);
    }

}