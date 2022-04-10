import { Component, OnInit } from '@angular/core';
import { Sociedad } from '../../../model/sociedad';
import { Area } from '../../../model/area';
import { TipoGasto } from '../../../model/tipo-gasto';
import { ClaseGasto } from '../../../model/clase-gasto';
import { ReporteTotalizadorRow, ViajesService, ReporteTotalizadorParams } from '../../services/viajes.service';
import { AreasService } from '../../services/areas.service';
import { API_URL } from '../../app.config';
import { TiposGastoService } from '../../services/tipos-gasto.service';
import { ClasesGastoService } from '../../services/clases-gasto.service';
import { UsuariosService } from '../../services/usuarios.service';
import { UtilService } from './../../services/util.service';

@Component({
    selector: 'app-reporte-totalizador',
    templateUrl: './reporte-totalizador.component.html',
    styleUrls: ['./reporte-totalizador.component.css']
})
export class ReporteTotalizadorComponent {

    usrstr = '';

    sociedades: Sociedad[] = [];
    areas: Area[] = [];
    tiposDeClaseDeGasto: TipoGasto[] = [];
    clasesDeGasto: ClaseGasto[] = [];

    sociedad: string = '';
    area: string = '';
    tipoDeClaseDeGasto: string = '';
    claseDeGasto: string = '';
    cuentaContable: string = '';
    numeroDeTrayecto: string = '';
    destino: string = '';
    centroDeCosto: string = '';
    fechaInicio: string = '';
    fechaFin: string = '';
    usuarios: string[] = [];

    cargando: boolean = false;

    reporte: ReporteTotalizadorRow[] = [];

    constructor(
        private areasService: AreasService,
        private usuariosService: UsuariosService,
        private tiposGastoService: TiposGastoService,
        private clasesGastoService: ClasesGastoService,
        private viajesService: ViajesService,
        public utilService: UtilService
    ) {
        this.refrescar();
    }

    removerUsuario(s: string) {
        let index = this.usuarios.findIndex(r => r == s);
        this.usuarios.splice(index, 1);
    }

    agregarUsuario() {
        this.usuarios.push(this.usrstr);
        this.usrstr = '';
    }

    refrescar() {
        this.cargando = true;
        Promise.all([
            this.usuariosService.obtenerSociedades(),
            this.areasService.obtenerAreas()
        ]).then((results: any[]) => {
            this.sociedades = results[0];
            this.areas = results[1];
            this.cargando = false;
        }).catch(r => {
            console.error(r);
            this.cargando = false;
        });
    }

    onAreaChange() {
        this.tipoDeClaseDeGasto = '';
        this.claseDeGasto = '';
        if (this.area == '') {
        } else {
            this.cargando = true;
            this.tiposGastoService
                .obtenerTipos(Number.parseInt(this.area))
                .then(e => this.tiposDeClaseDeGasto = e)
                .catch(e => console.error(e))
                .then(e => this.cargando = false);
        }
    }

    onTipoClaseGastoChange() {
        this.claseDeGasto = '';
        if (this.tipoDeClaseDeGasto == '') {
        } else {
            this.cargando = true;
            this.clasesGastoService
                .obtenerClasesG(Number.parseInt(this.tipoDeClaseDeGasto))
                .then(e => this.clasesDeGasto = e)
                .catch(e => console.error(e))
                .then(e => this.cargando = false);
        }
    }

    generarVistaPrevia() {

        let p = new ReporteTotalizadorParams();
        p.area = Number.parseInt(this.area);
        p.centroCosto = this.centroDeCosto;
        p.clase = Number.parseInt(this.claseDeGasto);
        p.cuenta = this.cuentaContable;
        p.destino = this.destino;
        p.fechaCont = new Date(this.fechaInicio);
        p.fechaContFin = new Date(this.fechaFin);
        p.sociedad = this.sociedad;
        p.tipo = Number.parseInt(this.tipoDeClaseDeGasto);
        p.trayecto = Number.parseInt(this.numeroDeTrayecto);
        p.usuarios = this.usuarios;
        p.setBadFieldsToNull();

        this.cargando = true;
        this.viajesService
            .obtenerReporteTotalizador(p)
            .then(r => this.reporte = r)
            .then(r => console.log(this.reporte))
            .catch(r => alert(r))
            .then(r => this.cargando = false);
    }

    generarReporteXLS() {

        // HORRIBLE CODIGO DUPLICADO
        let params = new ReporteTotalizadorParams();
        params.area = Number.parseInt(this.area);
        params.centroCosto = this.centroDeCosto;
        params.clase = Number.parseInt(this.claseDeGasto);
        params.cuenta = this.cuentaContable;
        params.destino = this.destino;
        params.fechaCont = new Date(this.fechaInicio);
        params.fechaContFin = new Date(this.fechaFin);
        params.sociedad = this.sociedad;
        params.tipo = Number.parseInt(this.tipoDeClaseDeGasto);
        params.trayecto = Number.parseInt(this.numeroDeTrayecto);
        params.usuarios = this.usuarios;
        params.setBadFieldsToNull();
        let search = new URLSearchParams();

        console.log(params);
        for (let property in params) {
            if (typeof params[property] == 'function') continue;
            if (params[property] != null)
                search.set(property, params[property]);
        }
        if (params.fechaCont != null)
            search.set('fechaCont', '"' + params.fechaCont.toJSON().substr(0, 10) + '"');
        if (params.fechaContFin != null)
            search.set('fechaContFin', '"' + params.fechaContFin.toJSON().substr(0, 10) + '"');
        if (params.usuarios != null && Array.isArray(params.usuarios) && params.usuarios.length > 0) {
            let str = "";
            params.usuarios.forEach(u => str = str + ',"' + u + '"');
            str = str.substr(1);
            search.set('usuarios', str);
        }
        console.log(search);

        let s = '' + search;
        if (s.length > 0) {
            s = '?' + s;
        }

        let link = document.createElement('a');
        link.href = API_URL + 'viajes/reporteTotalizadorXls' + s;
        link.target = '_blank';
        link.click();
    }

}
