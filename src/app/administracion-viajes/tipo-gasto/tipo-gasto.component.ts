import { Component } from '@angular/core';
import { TipoGasto } from '../../../model/tipo-gasto';
import { Area } from '../../../model/area';
import { Router, ActivatedRoute } from '@angular/router';
import { TiposGastoService } from '../../services/tipos-gasto.service';
import { AreasService } from '../../services/areas.service';

@Component({
    selector: 'app-tipo-gasto',
    templateUrl: './tipo-gasto.component.html',
    styleUrls: ['./tipo-gasto.component.css']
})
export class TipoGastoComponent {

    tgasto: TipoGasto = new TipoGasto();
    areas: Area[] = [];
    idarea: number = -3;
    id: string;
    cargando = false;
    msjdel = false;
    error = false;
    tituloerror: string;
    msjerror: string;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private tipoService: TiposGastoService,
        private AreasService: AreasService

    ) {
        route.params.subscribe(params => {
            this.id = params['id'];
            this.refrescar();
        })

    }

    cancelar() {
        this.router.navigate(['/administracion/viajes/tipos-gasto']);
    }

    eliminar() {
        this.msjdel = true;
    }
    confirmarDel() {
        this.msjdel = false;
        this.cargando = true;
        this.tipoService.eliminar(Number.parseInt(this.id)).then(result => {

            if (result.status != 'OK') {
                this.cargando = false;
                this.tituloerror = result.status;
                this.msjerror = result.message;
                this.error = true;

            }
            else {
                this.router.navigate(['/administracion/viajes/tipos-gasto']);
            }
        });

    }

    refrescar() {
        if (this.id.toString() != 'nuevo') {
            this.cargando = true;
            this.tipoService.obtenerTipo(Number.parseInt(this.id))
                .then(tg => {
                    this.tgasto = tg;
                    this.cargando = false;
                    console.log(this.tgasto);
                });

        }
        else {
            this.AreasService.obtenerAreastg().then(ar => {
                this.areas = ar;
                this.cargando = false;

            });
        }

    }

    guardar() {

        this.cargando = true;
        this.tipoService.editar(this.tgasto).then(tg => {


            this.router.navigate(['administracion/viajes/tipos-gasto']);


        })
            .catch((response: Response) => {
                if (response.status == 404) {
                    this.cargando = false;
                    this.tituloerror = "No se modificó el elemento";
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
        this.cargando = false;
        this.tgasto.areaBean.idarea = this.idarea;
        this.tipoService.crear(this.tgasto).then(r => {
            this.router.navigate(['administracion/viajes/tipos-gasto']);

        })
            .catch((response: Response) => {
                this.cargando = false;
                this.tituloerror = "Error " + response.status;
                this.msjerror = response.statusText;
                this.error = true;
            });
    }

    obtenerArea(): Promise<number> {
        return new Promise((resolve, reject) =>
            this.idarea);

    }

}
