import { Component } from '@angular/core';
import { ConfiguracionService } from '../../services/configuracion.service';
import { HttpResponse } from '@angular/common/http';
import { UtilService } from './../../services/util.service';

@Component({
    selector: 'app-configuracion',
    templateUrl: './configuracion.component.html',
    styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {

    mostrarMensaje: boolean = false;
    tituloMensaje: string = '';
    textoMensaje: string = '';

    cargando: boolean = false;

    cambiandoFechaInicialFacturasProveedores: boolean = false;
    fechaInicialFacturasProveedores: string = '1990-02-11';
    fechaInicialFacturasProveedoresOld: string = '1990-02-11';

    cambiandoFechaInicialFacturasFB60: boolean = false;
    fechaInicialFacturasFB60: string = '1990-02-11';
    fechaInicialFacturasFB60Old: string = '1990-02-11';

    constructor(private configuracionService: ConfiguracionService,
        public utilService: UtilService) {
        this.refrescar();
    }

    refrescar() {
        this.cargando = true;
        Promise.all([
            this.configuracionService.obtenerVariable('fecha_inicio_facturas_proveedores'),
            this.configuracionService.obtenerVariable('fecha_inicio_fb60')
        ]).then((results: HttpResponse<Object>[]) => {
            this.cargando = false;
            {
                let r = results[0];
                let json: any = r.body;
                let value = json.propiedad.valorLow;
                this.fechaInicialFacturasProveedoresOld = this.fechaInicialFacturasProveedores = value;
            } {
                let r = results[1];
                let json: any = r.body;
                let value = json.propiedad.valorLow;
                this.fechaInicialFacturasFB60Old = this.fechaInicialFacturasFB60 = value;
            }
        }).catch(errors => {
            this.cargando = false;
            alert('error');
            console.log('errors');
            console.log(errors);
        });
    }

    // ==========================================================

    cambiarFechaInicialFacturasProveedores() {
        this.cargando = true;
        this.configuracionService
            .asignarVariable('fecha_inicio_facturas_proveedores', this.fechaInicialFacturasProveedores)
            .then((r: HttpResponse<Object>) => {
                let json: any = r.body;
                this.cargando = false;
                this.mostrarMensaje = true;
                this.tituloMensaje = json.result.status;
                this.textoMensaje = json.result.message;
                if (this.tituloMensaje == 'Exito') this.fechaInicialFacturasProveedoresOld = this.fechaInicialFacturasProveedores;
                this.refrescar();
            }).catch(r => {
                this.cargando = false;
                this.mostrarMensaje = true;
                let tituloMensaje = 'Error ' + r.status;
                let textoMensaje = r;
                this.cancelarFechaInicialFacturasProveedores();
            });
    }

    cancelarFechaInicialFacturasProveedores() {
        this.cambiandoFechaInicialFacturasProveedores = false;
        this.fechaInicialFacturasProveedores = this.fechaInicialFacturasProveedoresOld;
    }

    // ==========================================================

    cambiarFechaInicialFacturasFB60() {
        this.cargando = true;
        this.configuracionService
            .asignarVariable('fecha_inicio_fb60', this.fechaInicialFacturasFB60)
            .then((r: HttpResponse<Object>) => {
                let json: any = r.body;
                this.cargando = false;
                this.mostrarMensaje = true;
                this.tituloMensaje = json.result.status;
                this.textoMensaje = json.result.message;
                if (this.tituloMensaje == 'Exito') this.fechaInicialFacturasFB60Old = this.fechaInicialFacturasFB60;
                this.refrescar();
            }).catch(r => {
                this.cargando = false;
                this.mostrarMensaje = true;
                let tituloMensaje = 'Error ' + r.status;
                let textoMensaje = r;
                this.cancelarFechaInicialFacturasFB60();
            });
    }

    cancelarFechaInicialFacturasFB60() {
        this.cambiandoFechaInicialFacturasFB60 = false;
        this.fechaInicialFacturasFB60 = this.fechaInicialFacturasFB60Old;
    }

    // ==========================================================

}
