import { Component, OnInit } from '@angular/core';
import { TiposDeViaje } from '../../../model/tipos-de-viaje';
import { Router, ActivatedRoute } from '@angular/router';
import { TiposDeViajeService } from '../../services/tipos-de-viaje.service';

@Component({
    selector: 'app-tipo-de-viaje',
    templateUrl: './tipo-de-viaje.component.html',
    styleUrls: ['./tipo-de-viaje.component.css']
})
export class TipoDeViajeComponent {


    tiposdeviaje: TiposDeViaje = new TiposDeViaje();
    idtipoviaje: string;

    cargandoTV = false;
    msjerrorTV = false;
    msjeliminarTV = false;
    respuestaTV: number;
    msjTV: string;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private tiposviajeService: TiposDeViajeService,
    ) {
        route.params.subscribe(params => {
            this.idtipoviaje = params['idtipoviaje'];
            if (this.idtipoviaje.toString() != 'nuevoviaje') {
                this.refresh();
            }
        });
    }

    refresh() {
        this.cargandoTV = true;
        this.tiposviajeService.obtenerTipoDeViaje(Number.parseInt(this.idtipoviaje))
            .then(tv => {
                this.cargandoTV = false;
                this.tiposdeviaje = tv;
            })
            .catch(tvC => {

            });

    }
    cancel() {
        this.router.navigate(['administracion/viajes/tipos-de-viaje']);
    }

    crear() {
        this.cargandoTV = true;


        if (this.tiposdeviaje.descripcion == null || this.tiposdeviaje.descripcion == "") {
            this.msjerrorTV = true;
            //console.log("Ingrese los campos llenos");
            this.msjTV = "Ingrese los campos necesarios.";
            this.cargandoTV = false;
        } else {
            this.tiposviajeService.crear(this.tiposdeviaje)
                .then(r => {
                    this.cargandoTV = false;

                    // if (this.tiposdeviaje.descripcion == null ||
                    //   this.tiposdeviaje.descripcion == "") {
                    //   this.cargandoTV = false;
                    //} else {    
                    this.router.navigate(['administracion/viajes/tipos-de-viaje']);
                    //}
                })
                .catch((response: Response) => {

                });
        }

    }

    eliminar() {
        this.msjeliminarTV = true;
    }
    deleteConfirmTV() {
        this.msjeliminarTV = false;
        this.cargandoTV = true;

        this.tiposviajeService.eliminar(Number.parseInt(this.idtipoviaje))
            .then(el => {
                if (el.status != 'OK') {
                    this.cargandoTV = false;
                    this.msjerrorTV = true;
                    this.respuestaTV = el.status;
                    this.msjTV = el.message;

                } else {
                    this.cargandoTV = true;
                    this.router.navigate(['administracion/viajes/tipos-de-viaje']);
                }
            })
    }

    guardar() {
        this.cargandoTV = true;

        if (this.tiposdeviaje.descripcion == null || this.tiposdeviaje.descripcion == "") {
            this.msjerrorTV = true;
            //console.log("Ingrese los campos llenos");
            this.msjTV = "Ingrese los campos necesarios.";
            this.cargandoTV = false;
        } else {
            this.tiposviajeService.editar(this.tiposdeviaje)
                .then(r => {
                    this.cargandoTV = false;
                    this.router.navigate(['administracion/viajes/tipos-de-viaje']);
                })
                .catch((response: Response) => {
                    this.msjerrorTV = true;
                    this.respuestaTV = response.status;
                    this.msjTV = response.statusText;
                });
        }



    }

}
