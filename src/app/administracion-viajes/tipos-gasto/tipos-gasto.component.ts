import { Component } from '@angular/core';
import { Area } from '../../../model/area';
import { TipoGasto } from '../../../model/tipo-gasto';
import { TiposGastoService } from '../../services/tipos-gasto.service';
import { AreasService } from '../../services/areas.service';
import { UtilService } from './../../services/util.service';

@Component({
    selector: 'app-tipos-gasto',
    templateUrl: './tipos-gasto.component.html',
    styleUrls: ['./tipos-gasto.component.css']
})
export class TiposGastoComponent {

    tiposGasto: TipoGasto[] = [];
    areas: Area[] = [];
    public idarea: number = -3;
    cargando = false;
    oculta = true;

    constructor(
        private tiposService: TiposGastoService,
        private AreasService: AreasService,
        public utilService: UtilService
    ) {

        this.refrescar();
    }

    refrescar() {
        this.cargando = true;
        this.tiposService.obtenerTipos(this.idarea).then(tg => {
            this.tiposGasto = tg;
        });

        this.AreasService.obtenerAreastg().then(ar => {
            this.areas = ar;
            this.cargando = false;

        });

    }

    filtro() {
        console.log(this.idarea + "idarea");
        this.refrescar();
    }
    obtenerArea(): Promise<number> {
        return new Promise((resolve, reject) =>
            this.idarea);

    }

}