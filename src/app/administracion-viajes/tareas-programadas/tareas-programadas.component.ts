import { Component } from '@angular/core';
import { ViajesService } from '../../services/viajes.service';
import { UtilService } from './../../services/util.service';

@Component({
    selector: 'app-tareas-programadas',
    templateUrl: './tareas-programadas.component.html'
})
export class TareasProgramadasComponent {

    jobsviajesService: ViajesService;

    cargando = false;
    advertencia = false;
    msjtitle:string;
    msjsuccess : string;
    msjtitle_g = "Éxito";
    msjsuccess_g = "Correos enviados";

    constructor(
        private jobsviajesServiceIn: ViajesService,
        public utilService: UtilService
    ) {
        this.jobsviajesService = jobsviajesServiceIn;
    }

    enviar() {
        this.cargando = true;
        this.jobsviajesService.enviarTiposViaje()
            .then(t => {
                this.cargando = false;
                this.advertencia = true;
                this.msjs();
                console.log(t);
            });
    }

    msjs(){
        this.msjtitle = this.msjtitle_g;
        this.msjsuccess = this.msjsuccess_g;
    }

}