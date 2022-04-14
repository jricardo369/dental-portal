import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajesService } from '../../services/viajes.service';

import { UtilService } from '../../services/util.service';
import { Solicitud } from './../../../model/solicitud';
import { PaginationManager } from 'src/util/pagination';

@Component({
    selector: 'app-solicitudes-pendientes',
    templateUrl: './solicitudes-pendientes.component.html',
    styleUrls: ['./solicitudes-pendientes.component.css']
})
export class SolicitudesPendientesComponent {

    titulo: string = 'Viajes';
    solicitudes: Solicitud[];
    loading: boolean = false;
    permiteCrearViaje = false;

    paginacion: PaginationManager = new PaginationManager();

    constructor(
        private viajesService: ViajesService,
        public utilService: UtilService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.titulo = 'Aprobaciones de solicitud pendientes';
        this.obtenerSolicitudes();
    }

    obtenerSolicitudes() {
        this.loading = true;
        this.viajesService
            .consultarSolicitudesPendientes(localStorage.getItem('usuario'))
            .then(solicitudes => {
                this.solicitudes = solicitudes;
                this.ordenarSolicitudes();
                this.paginacion.setArray(this.solicitudes);
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false)
    }

    ordenarSolicitudes() {
        this.solicitudes.sort((a: Solicitud, b: Solicitud) => parseInt(a.numeroSolicitud) > parseInt(b.numeroSolicitud) ? -1 : 1);
    }
}
