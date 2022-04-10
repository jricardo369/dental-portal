import { Component, OnInit } from '@angular/core';

import { TipoGasto } from '../../../model/tipo-gasto';
import { Area } from '../../../model/area';
import { ClaseGasto } from '../../../model/clase-gasto';
import { Router, ActivatedRoute } from '@angular/router';
import { TiposGastoService } from '../../services/tipos-gasto.service';
import { AreasService } from '../../services/areas.service';
import { ClasesGastoService } from '../../services/clases-gasto.service';

@Component({
  selector: 'app-clase-gasto',
  templateUrl: './clase-gasto.component.html',
  styleUrls: ['./clase-gasto.component.css']
})
export class ClaseGastoComponent {

    countIva = 0;
    countIsr = 0;
    countIsh = 0;
    countTua = 0;
    countIeps = 0;
    ivaB = false;
    isrB = false;
    ishB = false;
    tuaB = false;
    iepsB = false;
    tiposgasto: TipoGasto[] = [];
    areas: Area[] = [];
    clasesGasto: ClaseGasto = new ClaseGasto();
    public idarea: number = -3;
    public idtcg: number = -3;
    id: string;
    cargando = false;
    msjdel = false;
    error = false;
    tituloerror: string;
    msjerror: string;
    campos = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private tiposService: TiposGastoService,
        private AreasService: AreasService,
        private ClaseGService: ClasesGastoService

    ) {
        route.params.subscribe(params => {
            this.id = params['id'];
            this.refrescar();
            console.log(this.id);
        })

    }

    cancelar() {
        this.router.navigate(['/administracion/viajes/clases-gasto']);
    }

    eliminar() {
        this.msjdel = true;
    }
    confirmarDel() {
        this.msjdel = false;
        this.cargando = true;
        this.ClaseGService.eliminar(Number.parseInt(this.id)).then(result => {

            if (result.status != 'OK') {
                this.cargando = false;
                this.tituloerror = result.status;
                this.msjerror = result.message;
                this.error = true;

            }
            else {
                this.router.navigate(['/administracion/viajes/clases-gasto']);
            }
        });

    }

    refrescar() {
        if (this.id.toString() != 'nuevo') {
            this.cargando = true;
            this.ClaseGService.obtenerClaseG(Number.parseInt(this.id))
                .then(cg => {
                    this.clasesGasto = cg;
                    this.cargando = false;
                    console.log(this.clasesGasto);
                    if (cg.indicador_iva != "") { this.ivaB = true; }
                    if (cg.cuentaContableISR != "" || cg.indicador_isr != "") { this.isrB = true; }
                    if (cg.indicador_ish != "" || cg.cuentaContableISH != "") { this.ishB = true; }
                    if (cg.indicador_tua != "" || cg.cuentaContableTUA != "") { this.tuaB = true; }
                    if (cg.indicador_ieps != "" || cg.cuentaContableIEPS != "") { this.iepsB = true; }
                });


        }
        else {
            //Obtiene Areas
            this.cargando = true;
            this.AreasService.obtenerAreastg().then(ar => {
                this.areas = ar;
                this.cargando = false;

            });
            if (this.idarea != -3) {
                //Obtiene tipos de gasto
                this.cargando = true;
                this.tiposService.obtenerTiposCG(this.idarea).then(tg => {
                    this.tiposgasto = tg;
                    this.cargando = false;
                });
            }
        }

    }

    guardar() {

        this.cargando = true;
        this.verifica();
        if (!this.campos) {
            this.ClaseGService.editar(this.clasesGasto).then(tg => {

                this.cargando = false;
                this.router.navigate(['administracion/viajes/clases-gasto']);
            })
                .catch((response: Response) => {

                    this.cargando = false;
                    this.tituloerror = "Error " + response.status;
                    this.msjerror = response.statusText;
                    this.error = true;

                });
        }
    }

    crear() {


        this.cargando = false;
        this.clasesGasto.tipo_gasto.id = this.idtcg;
        delete this.clasesGasto.tipo_gasto.areaBean;
        this.crearArregloImpuestos();
        this.verifica();
        if (!this.campos) {
            this.ClaseGService.crear(this.clasesGasto).then(r => {
                this.router.navigate(['administracion/viajes/clases-gasto']);

            })
                .catch((response: Response) => {
                    this.cargando = false;
                    this.tituloerror = "Error " + response.status;
                    this.msjerror = response.statusText;
                    this.error = true;
                });
        }

    }
    filtro() {
        this.idtcg = -3;
        this.refrescar();
    }


    //Mostrar contenedores de Impuestos
    countIVA() {
        if (!this.ivaB) {
            this.countIva++;
            if (this.countIva == 1) {
                this.clasesGasto.indicador_iva = "";
            }
        }
    }

    countISR() {
        if (!this.isrB) {
            this.countIsr++;
            if (this.countIsr == 1) {
                this.clasesGasto.cuentaContableISR = "";
                this.clasesGasto.indicador_isr = "";
            }
        }
    }
    countISH() {
        if (!this.ishB) {
            this.countIsh++;
            if (this.countIsh == 1) {
                this.clasesGasto.cuentaContableISH = "";
                this.clasesGasto.indicador_ish = "";
            }
        }
    }
    countTUA() {
        if (!this.tuaB) {
            this.countTua++;
            if (this.countTua == 1) {
                this.clasesGasto.cuentaContableTUA = "";
                this.clasesGasto.indicador_tua = "";
            }
        }
    }
    countIEPS() {
        if (!this.iepsB) {
            this.countIeps++;
            if (this.countIeps == 1) {
                this.clasesGasto.cuentaContableIEPS = "";
                this.clasesGasto.indicador_ieps = "";
            }
        }
    }

    crearArregloImpuestos() {
        this.clasesGasto.impuestos = [];

        if (this.clasesGasto.indicador_iva != "") {
            let impuesto = { id: 1 };
            this.clasesGasto.impuestos.push(impuesto);
        }
        if (this.clasesGasto.indicador_isr != "" || this.clasesGasto.cuentaContableISR != "") {
            let impuesto = { id: 2 };
            this.clasesGasto.impuestos.push(impuesto);
        }
        if (this.clasesGasto.indicador_ish != "" || this.clasesGasto.cuentaContableISH != "") {
            let impuesto = { id: 3 };
            this.clasesGasto.impuestos.push(impuesto);

        }
        if (this.clasesGasto.indicador_tua != "" || this.clasesGasto.cuentaContableTUA != "") {
            let impuesto = { id: 4 };
            this.clasesGasto.impuestos.push(impuesto);
        }
        if (this.clasesGasto.indicador_ieps != "" || this.clasesGasto.cuentaContableIEPS != "") {
            let impuesto = { id: 5 };
            this.clasesGasto.impuestos.push(impuesto);
        }


    }
    verifica() {
        if (this.clasesGasto.descripcion == "" || this.clasesGasto.cuentaContable == "" ||
            (this.clasesGasto.indicador_iva == "" && this.ivaB) ||
            ((this.clasesGasto.indicador_isr == "" || this.clasesGasto.indicador_isr == "") && this.isrB) ||
            ((this.clasesGasto.indicador_ish == "" || this.clasesGasto.cuentaContableISH == "") && this.ishB) ||
            ((this.clasesGasto.indicador_tua == "" || this.clasesGasto.cuentaContableTUA == "") && this.tuaB) ||
            ((this.clasesGasto.indicador_ieps == "" || this.clasesGasto.cuentaContableIEPS == "") && this.iepsB)) {

            this.cargando = false;
            this.msjerror = "Complete los campos";
            this.tituloerror = "ERROR";
            this.error = true;
            this.campos = true;

        }

    }

}
