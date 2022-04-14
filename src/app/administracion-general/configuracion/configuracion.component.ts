import { Component } from '@angular/core';
import { ConfiguracionService } from '../../services/configuracion.service';
import { HttpResponse } from '@angular/common/http';
import { UtilService } from './../../services/util.service';
import { Configuracion } from 'src/model/configuracion';

@Component({
    selector: 'app-configuracion',
    templateUrl: './configuracion.component.html',
    styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
    //config = new Configuracion();
    arrconfiguraciones: Array<Configuracion> = [];
    //objconfiguracion = new Configuracion;
    envconfiguracion = new Configuracion;
    
    formatoMonto: Array<String> = [];

    cargando: boolean = false;

    cambiandoFechaInicialFacturasProveedores: boolean = false;
    fechaInicialFacturasProveedores: string = '1990-02-11';
    fechaInicialFacturasProveedoresOld: string = '1990-02-11';

    cambiandoFechaInicialFacturasFB60: boolean = false;
    fechaInicialFacturasFB60: string = '1990-02-11';
    fechaInicialFacturasFB60Old: string = '1990-02-11';

    //Se creo una variable por cada configuracion
    cambiandoDiasPermitidosCargaComprobantes: boolean = false;
    cambiandoPorcentaje: boolean = false;
    cambiandoTopeTotalSAT: boolean = false;
    cambiandoTopeTotal: boolean = false;
    cambiandoTopeMonto: boolean = false;
    cambiandoMontoTotalP: boolean = false;
    cambiandoCorreo: boolean = false;
    cambiandoCargaEntrega: boolean = false;
    cambiandoCargaComprobaciones: boolean = false;

    diasPermitidosCargaComprobantes: number = 0;
    Porcentaje: number = 0;
    TopeTotalSAT: number = 0;
    TopeTotal: number = 0;
    TopeMonto: number = 0;
    MontoTotalP: number = 0;
    correoAdministrador: string = '';
    rutaCargaEntrega: string = '';
    rutaCargaComprobaciones: string = '';
    
    diasPermitidosCargaComprobantesOld: number = 0;
    PorcentajeOld: number = 0;
    formatoPorcentaje: number = 0;
    TopeTotalSATOld: number = 0;
    TopeTotalOld: number = 0;
    TopeMontoOld: number = 0;
    MontoTotalPOld: number = 0;
    correoAdministradorOld: string = '';
    rutaCargaEntregaOld: string = '';
    rutaCargaComprobacionesOld: string = '';

    constructor(private configuracionService: ConfiguracionService,
        public utilService: UtilService) {
        localStorage.setItem('manual_name', 'Manual de Administrador');
        localStorage.setItem('manual_file', 'ManualAdministradorSLAPI');

        this.obtenerConfi();
    }

    obtenerConfi() {
        this.cargando = true;
        this.configuracionService
            .getConf()
            .subscribe(result => {
                this.arrconfiguraciones = result;
                this.procesarConfi();
            },
            error => {
                this.utilService.manejarError(error);
            });
    }

    procesarConfi() {
        for (let index = 0; index < this.arrconfiguraciones.length; index++) {
            switch (Number(this.arrconfiguraciones[index].id)) {
                case 1:
                    this.diasPermitidosCargaComprobantes = Number(this.arrconfiguraciones[index].valor1);
                    this.diasPermitidosCargaComprobantesOld = this.diasPermitidosCargaComprobantes;
                    break;
                case 2:
                    this.TopeTotalSAT = Number(this.arrconfiguraciones[index].valor1);
                    this.TopeTotalSATOld = this.TopeTotalSAT;
                    break;
                case 3:
                    this.TopeTotal = Number(this.arrconfiguraciones[index].valor1);
                    this.TopeTotalOld = this.TopeTotal;
                    break;
                case 4:
                    this.TopeMonto = Number(this.arrconfiguraciones[index].valor1);
                    this.TopeMontoOld = this.TopeMonto;
                    break;
                case 5:
                    this.Porcentaje = Number(this.arrconfiguraciones[index].valor1);
                    this.PorcentajeOld = this.Porcentaje;
                    this.formatoPorcentaje = this.Porcentaje * 100;
                    break;
                case 6:
                    this.MontoTotalP = Number(this.arrconfiguraciones[index].valor1);
                    this.MontoTotalPOld = this.MontoTotalP;
                    break;
                case 7:
                    this.correoAdministrador = this.arrconfiguraciones[index].valor1;
                    this.correoAdministradorOld = this.correoAdministrador;
                    break;
                case 8:
                    this.rutaCargaEntrega = this.arrconfiguraciones[index].valor1;
                    this.rutaCargaEntregaOld = this.rutaCargaEntrega;
                    break;
                case 9:
                    this.rutaCargaComprobaciones = this.arrconfiguraciones[index].valor1;
                    this.rutaCargaComprobacionesOld = this.rutaCargaComprobaciones;
                    break;
            }
        }
        this.cargando = false;
    }



    cambiarDato(caso: number) {
        this.envconfiguracion.id = caso;
        this.envconfiguracion.valor2 = this.arrconfiguraciones[caso - 1].valor2;
        this.envconfiguracion.codigo = this.arrconfiguraciones[caso - 1].codigo;
        this.envconfiguracion.descripcion = this.arrconfiguraciones[caso - 1].descripcion;
        switch (caso) {
            case 1:
                this.envconfiguracion.valor1 = this.diasPermitidosCargaComprobantes.toString();
                break;
            case 2:
                this.envconfiguracion.valor1 = this.TopeTotalSAT.toString();
                break;
            case 3:
                this.envconfiguracion.valor1 = this.TopeTotal.toString();
                break;
            case 4:
                this.envconfiguracion.valor1 = this.TopeMonto.toString();
                break;
            case 5:
                var porcen = this.Porcentaje * .01;
                this.Porcentaje = porcen;
                this.envconfiguracion.valor1 = this.Porcentaje.toString();
                break;
            case 6:
                this.envconfiguracion.valor1 = this.MontoTotalP.toString();
                break;
            case 7:
                this.envconfiguracion.valor1 = this.correoAdministrador.toString();
                break;
            case 8:
                this.envconfiguracion.valor1 = this.rutaCargaEntrega.toString();
                break;
            case 9:
                this.envconfiguracion.valor1 = this.rutaCargaComprobaciones.toString();
                break;
        }
        
        this.cargando = true;
        this.configuracionService
            .asignarVariable(this.envconfiguracion)
            .then(response => {
                this.utilService.mostrarDialogoSimple("Cambio realizado correctamente", "");
                if (response.status === 200) {
                    switch (caso) {
                        case 1:
                            this.diasPermitidosCargaComprobantesOld = this.diasPermitidosCargaComprobantes;
                            this.cambiandoDiasPermitidosCargaComprobantes = false;
                            break;
                        case 2:
                            this.TopeTotalSATOld = this.TopeTotalSAT;
                            this.cambiandoTopeTotalSAT = false;
                            break;
                        case 3:
                            this.TopeTotalOld = this.TopeTotal;
                            this.cambiandoTopeTotal = false;
                            break;
                        case 4:
                            this.TopeMontoOld = this.TopeMonto;
                            this.cambiandoTopeMonto = false;
                            break;
                        case 5:
                            this.PorcentajeOld = this.Porcentaje;
                            this.cambiandoPorcentaje = false;
                            break;
                        case 6:
                            this.MontoTotalPOld = this.MontoTotalP;
                            this.cambiandoMontoTotalP = false;
                            break;
                    }
                    this.obtenerConfi();
                    this.cargando = false;
                }
            }).catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false)
    }

    cancelarCambio(caso: number) {
        switch (caso) {
            case 1:
                this.cambiandoDiasPermitidosCargaComprobantes = false;
                this.diasPermitidosCargaComprobantes = this.diasPermitidosCargaComprobantesOld;
                break;
            case 2:
                this.cambiandoTopeTotalSAT = false;
                this.TopeTotalSAT = this.TopeTotalSATOld;
                break;
            case 3:
                this.cambiandoTopeTotal = false;
                this.TopeTotalSAT = this.TopeTotalSATOld;
                break;
            case 4:
                this.cambiandoTopeMonto = false;
                this.TopeMonto = this.TopeMontoOld;
                break;
            case 5:
                this.cambiandoPorcentaje = false;
                this.Porcentaje = this.PorcentajeOld;
                break;
            case 6:
                this.cambiandoMontoTotalP = false;
                this.MontoTotalP = this.MontoTotalPOld;
                break;
            case 7:
                this.cambiandoCorreo = false;
                this.correoAdministrador = this.correoAdministradorOld;
                break;
            case 8:
                this.cambiandoCargaEntrega = false;
                this.rutaCargaEntrega = this.rutaCargaEntregaOld;
                break;
            case 9:
                this.cambiandoCargaComprobaciones = false;
                this.rutaCargaComprobaciones = this.rutaCargaComprobacionesOld;
                break;
        }
    }


    currentPattern(id: number) {
        switch (id)
        {
            case 1:
                this.formatoMonto[0] = this.utilService.formatoMoneda(this.TopeTotalSAT || 0);
            break;
            case 2:
                this.formatoMonto[1] = this.utilService.formatoMoneda(this.TopeTotal || 0);
            break;
            case 3:
                this.formatoMonto[2] = this.utilService.formatoMoneda(this.TopeMonto || 0);
            break;
            case 4:
                this.formatoMonto[3] = this.utilService.formatoMoneda(this.MontoTotalP || 0);
            break;
        }
        
    }

}
