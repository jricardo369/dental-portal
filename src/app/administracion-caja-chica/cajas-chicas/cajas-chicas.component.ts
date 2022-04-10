import { Component, OnInit } from '@angular/core';
import { CajaChica } from '../../../model/caja-chica';
import { CajasChicasService } from '../../services/cajas-chicas.service';
import { UtilService } from '../../services/util.service';

@Component({
    selector: 'app-cajas-chicas',
    templateUrl: './cajas-chicas.component.html',
    styleUrls: ['./cajas-chicas.component.css']
})
export class CajasChicasComponent {

    cargando = false;
    cajaschicas: CajaChica[] = [];

    constructor(
        private cajaschicasService: CajasChicasService,
        public utilService: UtilService
    ) {
        this.refresh();
    }

    refresh() {
        this.cargando = true;
        this.cajaschicasService
            .obtenerCajasChicas()
            .then(c => this.cajaschicas = c)
            .catch((response: Response) => this.utilService.manejarError(response))
            .then(() => this.cargando = false);
    }

}
