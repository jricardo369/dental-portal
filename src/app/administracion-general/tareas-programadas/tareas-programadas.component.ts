import { Component } from '@angular/core';
import { ConfiguracionService } from '../../services/configuracion.service';
import { UtilService } from './../../services/util.service';

@Component({
    selector: 'app-tareas-programadas',
    templateUrl: './tareas-programadas.component.html',
    styleUrls: ['./tareas-programadas.component.css']
})
export class TareasProgramadasComponent {

    constructor(
        public configuracionService: ConfiguracionService,
        public utilService: UtilService) { }

    sincronizar() {
        this.configuracionService.realizarSincronizacionConSAP();
    }
}
