import { Component, OnInit } from '@angular/core';
import { Nivel } from 'src/model/nivel';
import { NivelesService } from '../../services/niveles.service';
import { UtilService } from './../../services/util.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-niveles-topes-carga',
    templateUrl: './niveles-topes-carga.component.html',
    styleUrls: ['./niveles-topes-carga.component.css']
})
export class NivelesTopesCargaComponent {
    niveles: Nivel[] = [];
    niv = new Nivel;
    cargando = false;
    constructor(
        private router: Router,
        private nivelesService: NivelesService,
        public utilService: UtilService
    ) {
        this.refresh();
    }

    refresh() {
        this.cargando = true;
        this.nivelesService
            .obtenerNiveles()
            .subscribe(result => {
                this.niveles = result;
                this.cargando = false;
            },
            error => {
                this.utilService.manejarError(error);
                this.cargando = false;
                });
    }
    
    nuevo() {
        this.router.navigate(['administracion-general/niveles-topes-carga/nuevo-nivel']);
    }
}
