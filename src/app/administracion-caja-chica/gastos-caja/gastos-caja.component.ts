import { Component, OnInit } from '@angular/core';
import { GastoCaja } from '../../../model/gasto-caja';
import { GastosCajasService } from '../../services/gastos-cajas.service';
import { UtilService } from './../../services/util.service';

@Component({
    selector: 'app-gastos-caja',
    templateUrl: './gastos-caja.component.html',
    styleUrls: ['./gastos-caja.component.css']
})
export class GastosCajaComponent {

    gastoscajas: GastoCaja[] = [];
    cargando = false;

    msjerrorGC = false;
    msjGsCs: string;
    respuestaGsCs: string;

    constructor(
        private gastoscajasService: GastosCajasService,
        public utilService: UtilService) {
        this.refresh();
    }

    refresh() {
        this.cargando = true;

        this.gastoscajasService.obtenerGastosCajas()
            .then(ga => {
                this.cargando = false;
                this.gastoscajas = ga;
                this.gastoscajas.sort((ea, eb) => {
                    let a = ea.operacion;
                    let b = eb.operacion;
                    if (a < b) return -1;
                    if (a > b) return +1;
                    return 0;
                });
            }).catch((response: Response) => {
                this.msjGsCs = response.status.toString();

                console.log("HOLI " + response.status);
            });
    }
}