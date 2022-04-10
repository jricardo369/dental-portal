import { Component, OnInit } from '@angular/core';
import { TiposDeViaje } from '../../../model/tipos-de-viaje';
import { TiposDeViajeService } from '../../services/tipos-de-viaje.service';
import { UtilService } from './../../services/util.service';

@Component({
  selector: 'app-tipos-de-viaje',
  templateUrl: './tipos-de-viaje.component.html',
  styleUrls: ['./tipos-de-viaje.component.css']
})
export class TiposDeViajeComponent {

    tiposdeViaje: TiposDeViaje[] = [];
    cargando = false;
    constructor(
        private tiposdeviajeService: TiposDeViajeService,
        public utilService: UtilService
    ) {
        this.refresh();
    }

    refresh() {
        this.cargando = true;

        this.tiposdeviajeService.obtenerTiposDeViaje()
            .then(tv => {
                this.cargando = false;
                this.tiposdeViaje = tv;

            })
            .catch((response: Response) => {
               
            })
    }

}
