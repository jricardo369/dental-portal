import { Component, OnInit } from '@angular/core';
import { CajaChica } from '../../../model/caja-chica';
import { Sociedad } from '../../../model/sociedad';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { CajasChicasService } from '../../services/cajas-chicas.service';
import { UtilService } from '../../services/util.service';
import { CustomI18nService } from 'src/app/custom-i18n.service';

@Component({
    selector: 'app-caja-chica',
    templateUrl: './caja-chica.component.html',
    styleUrls: ['./caja-chica.component.css']
})
export class CajaChicaComponent {

    titulo = ""

    idcajachica: string;
    crea = 0;
    r: string;
    msjeliminar = false;
    msjerror = false;
    cargando = false;
    respuesta: string;
    lista = [];
    posc = [];
    msjCaja = "Ya existe esta caja chica";
    msjUser = "Error el usuario SAP no se encuentra";

    cajachica: CajaChica = new CajaChica();
    sociedades: Sociedad[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cajaschicasService: CajasChicasService,
        private usuariosService: UsuariosService,
        private utilService: UtilService,
        private i18nService: CustomI18nService
    ) {

        route.params.subscribe(params => {

            this.idcajachica = params['idcajachica'];
            this.refresh();

            this.cargando = true;
            let array: any = [this.usuariosService.obtenerSociedades()];

            if (this.idcajachica == 'nueva-caja') {
                this.titulo = i18nService.get('Nueva caja chica');
                array.push(this.cajaschicasService.obtenerCajasChicas());
            } else this.titulo = i18nService.get('Caja chica') + ' ' + this.idcajachica;

            Promise
                .all(array)
                .then((r: any) => {
                    this.sociedades = r[0];
                    if (this.idcajachica == 'nueva-caja') {
                        this.cajachica.noCaja = "" + (r[1].map(e => Number.parseInt("" + e.noCaja)).reduce((a, b) => Math.max(a, b)) + 1);
                    }
                })
                .catch(err => console.log(err))
                .then(() => this.cargando = false);
        });

    }

    botonQuit(s: Sociedad) {
        let index = this.cajachica.sociedades.findIndex(r => r.soc == s.sociedad);
        this.cajachica.sociedades.splice(index, 1);
    }

    botonSoc() {
        let s = { soc: this.sociedades[0].sociedad, rfc: this.sociedades[0].rfc }
        this.cajachica.sociedades.push(s as Sociedad);
    }

    eliminar() {
        this.msjeliminar = true;
    }

    deleteConfirm() {

        this.msjeliminar = false;
        this.cargando = true;

        this.cajaschicasService.eliminar(this.idcajachica)
            .then(el => {
                if (el.status != 'OK') {
                    this.cargando = false;
                    this.msjerror = true;

                    //this.respuesta = el.status;
                    //this.msj = el.message;
                    this.utilService.mostrarDialogoSimple(el.status, el.message);
                } else {
                    this.router.navigate(['administracion/caja-chica/cajas-chicas']);

                }
            });


    }

    refresh() {

        if (this.idcajachica == 'nueva-caja') return;

        this.cargando = true;
        this.cajaschicasService
            .obtenerCajaChica(this.idcajachica)
            .then(caja => {
                this.cajachica = caja;
                console.log(this.cajachica);
            })
            .catch(e => this.utilService.manejarError(e))
            .then(e => this.cargando = false);

    }


    cancel() {
        this.router.navigate(['administracion/caja-chica/cajas-chicas']);
    }

    crear() {

        this.cargando = true;
        this.cajaschicasService.crear(this.cajachica)
            .then(r => {

                let titulo = "Error";
                let texto = null;

                if (r.usuarioSap == this.msjCaja) {
                    this.respuesta = "Error";
                    texto = this.msjCaja;
                    this.utilService.mostrarDialogoSimple(titulo, texto);
                } else if (r.usuarioSap == this.msjUser) {
                    this.respuesta = "Error";
                    texto = this.msjUser;
                    this.utilService.mostrarDialogoSimple(titulo, texto);
                } else {
                    this.router.navigate(['administracion/caja-chica/cajas-chicas']);
                }


            })
            .catch((response: Response) => {
                this.utilService.manejarError(response);
            }).then(() => {
                this.cargando = false;
            })

    }

    guardar() {
        this.cargando = true;

        let noRepetidas = [];
        this.cajachica.sociedades.forEach(s => {
            if (!noRepetidas.find(n => n.soc == s.soc)) noRepetidas.push(s);
        }); this.cajachica.sociedades = noRepetidas;

        this.cajaschicasService
            .editar(this.cajachica)
            .then(g => {
                this.cargando = false;
                this.router.navigate(['administracion/caja-chica/cajas-chicas']);
            }).catch(err => {
                this.cargando = false;
                //this.msjerror = true;
                //this.respuesta = "Error " + err.status;
                //this.msj = err;
                this.utilService.mostrarDialogoSimple("Error " + err.status, err);
            });
    }

}