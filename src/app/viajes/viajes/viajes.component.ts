import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajesService } from '../../services/viajes.service';
import { Viaje } from 'src/model/viaje';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from '../../services/util.service';

@Component({
    selector: 'app-viajes',
    templateUrl: './viajes.component.html',
    styleUrls: ['./viajes.component.css']
})
export class ViajesComponent {

    titulo: string = 'Viajes';
    viajes: Viaje[];
    loading: boolean = false;
    permiteCrearViaje = false;

    constructor(
        private viajesService: ViajesService,
        public utilService: UtilService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog
    ) {
        if (this.activatedRoute.routeConfig.path == 'viajes-abiertos') {
            this.titulo = 'Tus viajes abiertos';
            this.permiteCrearViaje = true;
        }
        if (this.activatedRoute.routeConfig.path == 'viajes-cerrados') this.titulo = 'Tus viajes cerrados';
        if (this.activatedRoute.routeConfig.path == 'autorizaciones') this.titulo = 'Autorizaciones por sociedad pendientes';
        if (this.activatedRoute.routeConfig.path == 'autorizaciones-ceco') this.titulo = 'Autorizaciones por centro de costo pendientes';
        if (this.activatedRoute.routeConfig.path == 'autorizaciones-aut-cc') this.titulo = 'Autorizaciones de autorizadores pendientes';
        this.actualizar();
    }

    nuevoViaje() { this.router.navigateByUrl('/viajes/nuevo-viaje'); }

    actualizar() {

        // AUTORIZACIONES POR CECO
        if (this.activatedRoute.routeConfig.path == 'autorizaciones-ceco') {
            this.loading = true;
            this.viajesService
                .obtenerViajesPendientesDeAutorizacionPorCeco()
                .then(viajes => {
                    this.viajes = viajes;
                    this.ordenarViajes();
                })
                .catch(reason => this.utilService.manejarError(reason))
                .then(() => this.loading = false)
            return;
        }

        // AUTORIZACIONES DE AUTORIZADORES
        if (this.activatedRoute.routeConfig.path == 'autorizaciones-aut-cc') {
            this.loading = true;
            this.viajesService
                .obtenerViajesDeAutorizadoresPendientesDeAutorizacion()
                .then(viajes => {
                    this.viajes = viajes;
                    this.ordenarViajes();
                })
                .catch(reason => this.utilService.manejarError(reason))
                .then(() => this.loading = false)
            return;
        }

        // TODOS LOS DEMAS
        this.loading = true;
        this.viajesService
            .obtenerViajes(
                this.activatedRoute.routeConfig.path == 'viajes-abiertos',
                this.activatedRoute.routeConfig.path == 'viajes-cerrados',
                this.activatedRoute.routeConfig.path == 'autorizaciones'
            )
            .then(viajes => {
                this.viajes = viajes;
                this.ordenarViajes();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false)
    }

    ordenarViajes() {
        this.viajes.sort((va, vb) => {
            let a = va.noTrayecto;
            let b = va.noTrayecto;
            if (va.estatus == 'Abierto') a /= 10000;
            if (vb.estatus == 'Abierto') b /= 10000;
            return a - b;
        });
    }

    
}
