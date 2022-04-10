import { Component, OnInit } from '@angular/core';
import { Area } from '../../../model/area';
import { AreasService } from '../../services/areas.service';
import { UtilService } from './../../services/util.service';

@Component({
    selector: 'app-areas',
    templateUrl: './areas.component.html',
    styleUrls: ['./areas.component.css']
})
export class AreasComponent {

    areas: Area[] = [];
    cargando = false;

    constructor(
        private AreasService: AreasService,
        public utilService: UtilService
    ) {

        this.refrescar();
    }

    refrescar() {
        this.cargando = true;
        this.AreasService.obtenerAreas().then(r => {
            this.areas = r;
            this.cargando = false;

        });

    }

}