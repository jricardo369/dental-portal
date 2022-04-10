import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../services/viajes.service';
import { UtilService } from './../../services/util.service';

export class ConfiguracionDeViajes {
    nombreGV = 'fecha_inicio_facturas_gv';
    valorGV: string;
    nombreProv = 'fecha_inicio_facturas_proveedores';
    valorProv: string;
    nombreCC = 'fecha_inicio_caja_chica';
    valorCC: string;
    nombreFB = 'fecha_inicio_fb60';
    valorFB: string;
    nombreAV = 'AUTORIZAR_VIAJES';
    valorAV: boolean;
}

export class ValoresConfiguracion {
    id: number;
    nombre: string;
    valorLow: string;
    valorHigh: string;
}

@Component({
    selector: 'app-configuracion',
    templateUrl: './configuracion.component.html',
    styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {

    config: ConfiguracionDeViajes = new ConfiguracionDeViajes();
    sdatos: ValoresConfiguracion[] = [];
    datos;
    cargando = false;
    msjdel = false;
    showMsj = false;
    titulo: string;
    msj: string;
    fecha: string;
    fechai: string;
    mostrarGV = false;
    mostrarP = false;
    mostrarCC = false;
    mostrarFB = false;
    mostrarAB = false;
    mostrarAV = false;
    x: boolean;
    valor2: string;
    valido = true;

    constructor(private ConfiguracionService: ViajesService,
        public utilService: UtilService) {
        this.obtenerDatos();
    }

    cambiar(valor: any, nombre: string) {
        this.cargando = true;
        if (typeof valor == "string") {
            this.valido = this.valor(valor);
            this.valor2 = this.fecha;
        }
        else {
            this.valido = true;
            if (valor) {
                this.valor2 = 'on';
            }
            else {
                this.valor2 = '';
            }
        }

        if (this.valido == false) {
            this.cargando = false;
            this.titulo = "Error";
            this.msj = "Error en formato de fecha, ingresa la fecha con el formato DD-MM-AAAA.";
            this.showMsj = true;
        }
        else {
            this.ConfiguracionService.cambiarFecha(nombre, this.valor2).then(result => {
                this.cargando = false;
                this.titulo = result.status;
                this.msj = result.message;
                this.showMsj = true;
            });

        }
    }

    obtenerDatos() {
        this.cargando = true;
        this.ConfiguracionService.obtenerConfig().then(propiedad => {
            this.datos = propiedad;
            let size = this.datos.length;
            for (let i = 0; i < size; i++) {
                if (this.datos[i].id == 6) {
                    this.valorInverso(this.datos[i].valorLow);
                    this.config.valorGV = this.fechai;
                }
                if (this.datos[i].id == 7) {
                    this.valorInverso(this.datos[i].valorLow);
                    this.config.valorCC = this.fechai;
                }
                if (this.datos[i].id == 8) {
                    this.valorInverso(this.datos[i].valorLow);
                    this.config.valorFB = this.fechai;
                }
                if (this.datos[i].id == 9) {
                    this.valorInverso(this.datos[i].valorLow);
                    this.config.valorProv = this.fechai;
                }
                if (this.datos[i].id == 13) {
                    if (this.datos[i].valorLow != '') { this.x = true; }
                    else { this.x = false; }
                    this.config.valorAV = this.x;
                }
            }
            this.cargando = false;
        });
    }

    valor(valor: string) {
        if (valor != null || valor.trim() != "") {
            let ano = valor.substring(6);
            let mes = valor.substring(3, 5);
            let dia = valor.substring(0, 2);
            this.fecha = ano + "-" + mes + "-" + dia;
            let dd = parseInt(dia);
            let mm = parseInt(mes);
            let yy = parseInt(ano);

            let exp = /^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/;
            let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (this.fecha.match(exp)) {
                if (mm == 1 || mm > 2) {
                    if (dd > ListofDays[mm - 1]) {
                        return false;
                    }
                }
                if (mm == 2) {
                    var lyear = false;
                    if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                        lyear = true;
                    }
                    if ((lyear == false) && (dd >= 29)) {
                        return false;
                    }
                    if ((lyear == true) && (dd > 29)) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }




    valorInverso(valor: string) {
        let ano = valor.substring(0, 4);
        let mes = valor.substring(5, 7);
        let dia = valor.substring(8);
        this.fechai = dia + "-" + mes + "-" + ano;
    }


}
