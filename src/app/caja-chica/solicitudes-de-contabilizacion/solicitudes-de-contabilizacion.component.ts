import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CajasChicasService } from '../../services/cajas-chicas.service';
import { SessionService } from '../../services/session.service';
import { UtilService } from '../../services/util.service';
import { Usuario } from '../../../model/usuario';
import { SolicitudDeContabilizacionDeCajaChica } from '../../../model/solicitud-de-contabilizacion-de-caja-chica';
import { SapSociedad } from '../../../model/sap-sociedad';
import { CustomI18nService } from 'src/app/custom-i18n.service';

@Component({
    selector: 'app-solicitudes-de-contabilizacion',
    templateUrl: './solicitudes-de-contabilizacion.component.html',
    styleUrls: ['./solicitudes-de-contabilizacion.component.css']
})
export class SolicitudesDeContabilizacionComponent implements OnInit {

    titulo = '';
    mostrarBotonCrear = false;
    mostrarSolicitudesPendientes = false;
    mostrarSolicitudesContabilizadas = false;
    mostrarSolicitudesParaAutorizador = false;
    mostrarSolicitudesParaContabilizador = false;
    mostrarFiltroCajaChica = true;

    loading = false;

    noCaja: string = null;
    sociedad: string = null;

    usuario: Usuario = null;
    cajasChicasDeUsuario = [];
    sapSociedades: SapSociedad[] = [];
    solicitudes: SolicitudDeContabilizacionDeCajaChica[] = [];

    constructor(
        private router: Router,
        private location: Location,
        private cajasChicasService: CajasChicasService,
        public utilService: UtilService,
        private sessionService: SessionService,
        private i18n: CustomI18nService
    ) {

        let path = this.location.path();

        // OCULTAR BOTON CREAR
        this.mostrarBotonCrear = false;

        if (path == '/caja-chica/solicitudes-pendientes') {
            this.titulo = i18n.get('Tus solicitudes pendientes');
            this.mostrarBotonCrear = true; // MOSTRAR BOTON CREAR
            this.mostrarSolicitudesPendientes = true;
        }

        if (path == '/caja-chica/solicitudes-contabilizadas') {
            this.titulo = i18n.get('Tus solicitudes contabilizadas');
            this.mostrarSolicitudesContabilizadas = true;
        }

        if (path == '/caja-chica/autorizaciones-pendientes') {
            this.titulo = i18n.get('Autorizaciones pendientes');
            this.mostrarSolicitudesContabilizadas = false;
            this.mostrarSolicitudesParaAutorizador = true;
        }

        if (path == '/caja-chica/contabilizaciones-pendientes') {
            this.titulo = i18n.get('Contabilizaciones pendientes');
            this.mostrarSolicitudesContabilizadas = false;
            this.mostrarSolicitudesParaContabilizador = true;
            this.mostrarFiltroCajaChica = false;
        }

    }

    ngOnInit() {
        // OBTENER EL USUARIO AUTENTICADO
        this.loading = true;
        this.sessionService
            .getUsuario()
            .then(u => {
                this.usuario = u;
                this.loading = false;
                this.refresh(true, false, true);
            }).catch(err => {
                this.utilService.manejarError(err)
                this.loading = false;
            });
    }

    refresh(actualizarCajasChicas = false, actualizarSociedades = false, actualizarSolicitudes = false) {

        this.loading = true;

        // LIMPIAR VALORES VIEJOS
        if (actualizarCajasChicas) { this.noCaja = null; this.sociedad = null; }
        if (actualizarSociedades) { this.sociedad = null; }

        // ARMAR PROMESAS Y GUARDAR INDICE DE RESPUESTAS
        let promises: Promise<any>[] = [];

        let indexOfCajasChicasDeUsuario = -1;
        let indexOfSociedadesDeCajaChica = -1;
        let indexOfSolicitudes = -1;

        if (actualizarCajasChicas) {
            indexOfCajasChicasDeUsuario = promises.length;
            promises.push(this.cajasChicasService.obtenerCajasChicas(this.usuario.usuario));
        }
        if (actualizarSociedades) {
            indexOfSociedadesDeCajaChica = promises.length;
            promises.push(this.cajasChicasService.obtenerSociedadesDeCajaChica(this.noCaja));
        }
        if (actualizarSolicitudes) {
            indexOfSolicitudes = promises.length;
            promises.push(this.cajasChicasService.obtenerSolicitudesDeContabilizacionDeCajachica(
                this.noCaja,
                this.sociedad,
                this.mostrarSolicitudesContabilizadas,
                this.mostrarSolicitudesParaAutorizador,
                this.mostrarSolicitudesParaContabilizador));
        }

        // PROCESAR PROMESAS
        Promise
            .all(promises)
            .then(results => {
                if (actualizarCajasChicas) this.cajasChicasDeUsuario = results[indexOfCajasChicasDeUsuario];
                if (actualizarSociedades) this.sapSociedades = results[indexOfSociedadesDeCajaChica];
                if (actualizarSolicitudes) this.solicitudes = results[indexOfSolicitudes];
            }).catch(err => {
                this.utilService.manejarError(err);
            }).then(e => {
                this.loading = false;
            });
    }

    actualizarSociedades() {
        if (this.noCaja != null) {
            this.refresh(false, true, true);
        } else {
            this.sociedad = null
            this.refresh(false, false, true);
        };
    }

    actualizarSolicitudes() {
        this.refresh(false, false, true);
    }
}
