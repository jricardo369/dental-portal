import { Component, OnInit } from '@angular/core';
import { Area } from '../../../model/area';
import { Router, ActivatedRoute } from '@angular/router';
import { AreasService } from '../../services/areas.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent {
    
    area: Area = new Area();
    idarea: string;
    cargando = false;
    msjdel = false;
    error = false;
    tituloerror: string;
    msjerror: string;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private areaService: AreasService,

    ) {
        route.params.subscribe(params => {
            this.idarea = params['idarea'];
            this.refrescar();
        })

    }
    cancelar() {
        this.router.navigate(['/administracion/viajes/areas']);
    }

    eliminar() {
        this.msjdel = true;
    }
    confirmarDel() {
        this.msjdel = false;
        this.cargando = true;
        this.areaService.eliminar(Number.parseInt(this.idarea)).then(result => {

            if (result.status != 'OK') {
                this.cargando = false;
                this.tituloerror = result.status;
                this.msjerror = result.message;
                this.error = true;

            }
            else {
                this.router.navigate(['/administracion/viajes/areas']);
            }
        });

    }

    refrescar() {
        if (this.idarea.toString() != 'nuevo') {
            this.cargando = true;
            this.areaService.obtenerArea(Number.parseInt(this.idarea))
                .then(ar => {
                    this.area = ar;
                    this.cargando = false;
                })
                .catch((response: Response) => {
                    if (response.status == 0) {
                        this.cargando = false;
                        this.tituloerror = "Error de conexión";
                        this.msjerror = "Se perdió la conexión con el Servidor";
                        this.error = true;
                    }
                });
        }

    }

    guardar() {

        this.cargando = true;
        this.areaService.editar(this.area).then(area => {


            this.router.navigate(['administracion/viajes/areas']);


        })
            .catch((response: Response) => {
                if (response.status == 404) {
                    this.cargando = false;
                    this.tituloerror = "No se modificó el elemento, Error " + response.status;
                    this.msjerror = "No existe una área con ese ID ";
                    this.error = true;
                } else {
                    this.cargando = false;
                    this.tituloerror = "Error " + response.status;
                    this.msjerror = response.statusText;
                    this.error = true;
                }
            });

    }

    crear() {
        this.cargando = true;
        this.areaService.crear(this.area).then(r => {

            this.router.navigate(['administracion/viajes/areas']);

        })
            .catch((response: Response) => {
                this.cargando = false;
                this.tituloerror = "Error " + response.status;
                this.msjerror = response.statusText;
                this.error = true;
            });
    }

}