import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from '../../services/configuracion.service';
import { HttpResponse } from '@angular/common/http';
import { UtilService } from '../../services/util.service';

@Component({
    selector: 'app-configuracion',
    templateUrl: './configuracion.component.html',
    styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {

    cargando: boolean = false;

    cambiandoFechaInicialFacturasCajaChica: boolean = false;
    fechaInicialFacturasCajaChica: string = '';
    fechaInicialFacturasCajaChicaOld: string = '';

    constructor(
        private configuracionService: ConfiguracionService,
        public utilService: UtilService
    ) {
        this.refrescar();
    }

    refrescar() {
        this.cargando = true;
        this.configuracionService.obtenerVariable('fecha_inicio_caja_chica')
            .then((results: any) => {
                this.cargando = false;
                let r = results;
                let json = r.body as any;
                let value = json.propiedad.valorLow;
                this.fechaInicialFacturasCajaChicaOld = this.fechaInicialFacturasCajaChica = value;
            })
            .catch(errors => this.utilService.manejarError(errors))
            .then(() => this.cargando = false);
    }

    cambiarFechaInicialFacturasCajaChica() {
        this.cargando = true;
        this.configuracionService
            .asignarVariable('fecha_inicio_caja_chica', this.fechaInicialFacturasCajaChica)
            .then((r: HttpResponse<Object>) => {
                let json = r.body as any;
                this.cargando = false;
                if (json.result.status == 'Exito') this.fechaInicialFacturasCajaChicaOld = this.fechaInicialFacturasCajaChica;
                this.refrescar();
            })
            .catch(err => {
                this.utilService.manejarError(err);
                this.fechaInicialFacturasCajaChica = this.fechaInicialFacturasCajaChicaOld;
            }).then(() => {
                this.cambiandoFechaInicialFacturasCajaChica = false;
                this.cargando = false;
            });
    }

    cancelarFechaInicialFacturasCajaChica() {
        this.cambiandoFechaInicialFacturasCajaChica = false;
        this.fechaInicialFacturasCajaChica = this.fechaInicialFacturasCajaChicaOld;
    }
}