import { Component, OnInit } from '@angular/core';
import { ClasesGastoService } from '../../services/clases-gasto.service';
import { AreasService } from '../../services/areas.service';
import { TiposGastoService } from '../../services/tipos-gasto.service';
import { ClaseGasto } from '../../../model/clase-gasto';
import { Area } from '../../../model/area';
import { TipoGasto } from '../../../model/tipo-gasto';
import { UtilService } from './../../services/util.service';

@Component({
    selector: 'app-clases-gasto',
    templateUrl: './clases-gasto.component.html',
    styleUrls: ['./clases-gasto.component.css']
})
export class ClasesGastoComponent {


    tiposGasto: TipoGasto[] = [];
    areas: Area[] = [];
    clasesGasto: ClaseGasto[] = [];
    idarea: number = -3;
    idtcg: number = -3;
    cargando = false;
    oculta = true;

    constructor(
        private TiposService: TiposGastoService,
        private AreasService: AreasService,
        private ClasesService: ClasesGastoService,
        public utilService: UtilService
    ) {

        this.refrescar();
    }

    refrescar() {
        this.cargando = true;
        //Obtiene Areas
        this.AreasService.obtenerAreastg().then(ar => {
            this.areas = ar;
            this.cargando = false;
        });
        if (this.idarea != -3) {
            //Obtiene tipos de gasto
            this.cargando = true;
            this.TiposService.obtenerTiposCG(this.idarea).then(tg => {
                this.tiposGasto = tg;
                this.cargando = false;

            });
            if (this.idtcg != -3) {
                //Obtiene Clases de gasto
                this.cargando = true;
                this.ClasesService.obtenerClasesG(this.idtcg).then(cg => {
                    this.clasesGasto = cg;
                    this.cargando = false;
                });
            }
        }
        console.log("idarea = " + this.idarea + " idtcg = " + this.idtcg);
        console.log(this.clasesGasto.length);
    }

    filtro() {
        this.idtcg = -3;
        this.refrescar();
    }
    obtenerArea(): Promise<number> {
        return new Promise((resolve, reject) =>
            this.idarea);

    }


}
