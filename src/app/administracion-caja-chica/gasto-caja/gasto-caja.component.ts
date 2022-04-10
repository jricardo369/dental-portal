import { Component, OnInit } from '@angular/core';
import { GastoCaja } from '../../../model/gasto-caja';
import { Sociedad } from '../../../model/sociedad';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { GastosCajasService } from '../../services/gastos-cajas.service';

@Component({
    selector: 'app-gasto-caja',
    templateUrl: './gasto-caja.component.html',
    styleUrls: ['./gasto-caja.component.css']
})
export class GastoCajaComponent {

    countIva = 0;
    countIsr = 0;
    countIsh = 0;
    countTua = 0;
    countIeps = 0;
    cargandoGC = false;
    ivaB = false;
    isrB = false;
    ishB = false;
    tuaB = false;
    iepsB = false;
    msjeliminarGC = false;
    msjerrorGC = false;
    respuestaGC: string;
    msjGC: string;

    idgastocaja: string;
    gastocaja: GastoCaja = new GastoCaja();
    sociedades: Sociedad[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private gastoscajasService: GastosCajasService,
        private usuariosService: UsuariosService,
    ) {

        Promise.all([
            this.usuariosService.obtenerSociedades()
        ]).then((r: any) => {
            this.sociedades = r[0];
        }).catch(err => console.log(err));

        route.params.subscribe(params => {
            this.idgastocaja = params['idgastocaja'];
            if (this.idgastocaja.toString() != "nuevo-gasto") {
                this.refresh();
            }

        });
    }

    botonQuit(s: Sociedad) {
        let index = this.gastocaja.sociedades.findIndex(r => r.soc == s.sociedad);
        this.gastocaja.sociedades.splice(index, 1);
    }

    botonSoc() {
        let s = { soc: this.sociedades[0].sociedad, rfc: this.sociedades[0].rfc }
        this.gastocaja.sociedades.push(s);
    }

    refresh() {

        this.cargandoGC = true;

        this.gastoscajasService.obtenerGastoCaja(this.idgastocaja)
            .then(gc => {

                this.cargandoGC = false;
                this.gastocaja = gc;

                console.log(this.gastocaja);

                if (gc.indicadorIva != "") {
                    this.ivaB = true;
                } else {
                    this.ivaB = false;
                }


                if ((gc.indicadorIsr != "") || (gc.cuentaContableISR != "")) {
                    this.isrB = true;
                }
                else {
                    this.isrB = false;
                }

                if ((gc.indicadorIsh != "") || (gc.cuentaContableISH != "")) {
                    this.ishB = true;
                }
                else {
                    this.ishB = false;
                }

                if ((gc.indicadorTua != "") || (gc.cuentaContableTUA != "")) {
                    this.tuaB = true;
                }
                else {
                    this.tuaB = false;
                }

                if ((gc.indicadorIeps != "") || (gc.cuentaContableIEPS != "")) {
                    this.iepsB = true;
                }
                else {
                    this.iepsB = false;
                }
            });
    }

    eliminar() {
        this.msjeliminarGC = true;
    }

    deleteConfirmGC() {
        this.msjeliminarGC = false;
        this.cargandoGC = true;

        this.gastoscajasService.eliminar(this.idgastocaja)
            .then(egc => {
                if (egc.status != 'OK') {
                    this.cargandoGC = false;
                    this.msjerrorGC = true;
                    this.respuestaGC = egc.status;
                    this.msjGC = egc.message;

                } else {
                    this.cargandoGC = true;
                    this.router.navigate(['administracion/caja-chica/gastos-caja']);
                }
            })
    }


    cancel() {
        this.router.navigate(['administracion/caja-chica/gastos-caja']);
    }

    crear() {

        this.cargandoGC = true;


        if ((this.gastocaja.operacion == "" || this.gastocaja.descripcionGasto == ""
            || this.gastocaja.cuentaDeMayor == null)) {
            this.msjerrorGC = true;
            this.respuestaGC = "Advertencia";
            this.msjGC = "Ingresa los campos necesarios";
            this.cargandoGC = false;
        } else {
            if ((this.ivaB && this.gastocaja.indicadorIva == "") || (this.isrB && this.gastocaja.indicadorIsr == "")
                || (this.ishB && this.gastocaja.indicadorIsh == "") || (this.tuaB && this.gastocaja.indicadorTua == "")
                || (this.iepsB && this.gastocaja.indicadorIeps == "")) {
                this.msjerrorGC = true;
                this.respuestaGC = "Advertencia";
                this.msjGC = "Ingresa los campos necesarios";
                this.cargandoGC = false;
            } else {
                this.gastoscajasService.crear(this.gastocaja)
                    .then(r => {
                        console.log(r.operacion);
                        if (r.operacion != 'E') {
                            this.cargandoGC = false;
                            this.router.navigate(['administracion/caja-chica/gastos-caja']);
                        }
                        else {
                            this.msjerrorGC = true;
                            this.respuestaGC = "Advertencia";
                            this.msjGC = "Ya existe este gasto de caja";
                            this.cargandoGC = false;
                        }

                    })
                    .catch((response: Response) => {
                        if ((this.gastocaja.operacion == null) || (this.gastocaja.descripcionGasto == "")
                            || (this.gastocaja.cuentaDeMayor == null)) {
                            this.msjerrorGC = true;
                            this.respuestaGC = response.status.toString();
                            this.msjGC = response.statusText;
                            this.cargandoGC = false;
                        }
                    });
            }
        }
    }

    guardar() {

        this.cargandoGC = true;

        let noRepetidas = [];
        this.gastocaja.sociedades.forEach(s => {
            if (!noRepetidas.find(n => n.soc == s.soc)) noRepetidas.push(s);
        }); this.gastocaja.sociedades = noRepetidas;

        console.log("cuentaDeMayor " + this.gastocaja.cuentaDeMayor);
        if (this.gastocaja.operacion == null || this.gastocaja.descripcionGasto == ""
            || this.gastocaja.cuentaDeMayor == null || this.gastocaja.cuentaDeMayor == 0) {
            console.log(this.gastocaja.cuentaDeMayor);
            this.msjerrorGC = true;
            this.respuestaGC = "Advertencia";
            this.msjGC = "Ingresa los campos necesarios";
            console.log("Ingresa los campos");
            this.cargandoGC = false;
        } else {
            if ((this.ivaB && this.gastocaja.indicadorIva == "") || (this.isrB && this.gastocaja.indicadorIsr == "")
                || (this.ishB && this.gastocaja.indicadorIsh == "") || (this.tuaB && this.gastocaja.indicadorTua == "")
                || (this.iepsB && this.gastocaja.indicadorIeps == "")) {
                this.msjerrorGC = true;
                this.respuestaGC = "Advertencia";
                this.msjGC = "Ingresa los campos necesarios";
                console.log("Ingresa los campos");
                this.cargandoGC = false;
            } else {
                if (this.gastocaja && !this.gastocaja.sociedades) this.gastocaja.sociedades = [];
                this.gastoscajasService.editar(this.gastocaja)
                    .then(r => {
                        this.router.navigate(['administracion/caja-chica/gastos-caja']);
                    })
                    .catch((response: Response) => {
                        this.msjerrorGC = true;
                        this.respuestaGC = response.status.toString();
                        this.msjGC = response.statusText;
                    })
                    .then(() => this.cargandoGC = false);
            }
        }

    }

    countIVA() {
        if (!this.ivaB) {
            this.countIva++;
            if (this.countIva == 1) {
                this.gastocaja.indicadorIva = "";
            }
        }
    }

    countISR() {
        if (!this.isrB) {
            this.countIsr++;
            if (this.countIsr == 1) {
                this.gastocaja.cuentaContableISR = "";
                this.gastocaja.indicadorIsr = "";
            }
        }
    }

    countISH() {
        if (!this.ishB) {
            this.countIsh++;
            if (this.countIsh == 1) {
                this.gastocaja.cuentaContableISH = "";
                this.gastocaja.indicadorIsh = "";
            }
        }
    }

    countTUA() {
        if (!this.tuaB) {
            this.countTua++;
            if (this.countTua == 1) {
                this.gastocaja.cuentaContableTUA = "";
                this.gastocaja.indicadorTua = "";
            }
        }
    }

    countIEPS() {
        if (!this.iepsB) {
            this.countIeps++;
            if (this.countIeps == 1) {
                this.gastocaja.cuentaContableIEPS = "";
                this.gastocaja.indicadorIeps = "";
            }
        }
    }
}