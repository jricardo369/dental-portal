import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajesService } from '../../services/viajes.service';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from '../../services/util.service';
import { Solicitud } from './../../../model/solicitud';
import { PaginationManager } from 'src/util/pagination';

@Component({
    selector: 'app-viajes',
    templateUrl: './viajes.component.html',
    styleUrls: ['./viajes.component.css']
})
export class ViajesComponent {

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
        private dialog: MatDialog
    ) {
        if (this.activatedRoute.routeConfig.path == 'viajes-abiertos') {
            this.titulo = 'Solicitudes de viáticos abiertas';
            this.permiteCrearViaje = true;
        }
        if (this.activatedRoute.routeConfig.path == 'viajes-cerrados') this.titulo = 'Solicitudes de viáticos cerradas';
        
        this.obtenerSolicitudesDeUsuario();
    }

    nuevoViaje() { this.router.navigateByUrl('/viajes/nuevo-viaje'); }

    obtenerSolicitudesDeUsuario() {
        this.loading = true;
        this.viajesService
            .consultarSolicitudesDeUsuarioPorEstatus(localStorage.getItem('usuario'), this.definirEstatusSolicitudes())
            .then(solicitudes => {
                this.solicitudes = solicitudes;
                this.ordenarSolicitudes();
                this.paginacion.setArray(this.solicitudes);
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false)
    }

    definirEstatusSolicitudes(): string {
        let estatus:string;
        if(this.activatedRoute.routeConfig.path === 'viajes-cerrados'){
            return '14,15';
        }
        else
        {
            estatus = '';
            for (let i = 1; i < 14; i++) {
                estatus += i.toString();
                estatus += ','
            }
            return estatus.substring(0, estatus.length - 1);
        }
    }

    ordenarSolicitudes() {
        this.solicitudes.sort((a: Solicitud, b: Solicitud) => parseInt(a.numeroSolicitud) > parseInt(b.numeroSolicitud) ? -1 : 1);
    }
}
