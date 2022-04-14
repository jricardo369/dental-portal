import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Nivel } from 'src/model/nivel';
import { NivelesService } from '../../services/niveles.service';
import { UtilService } from './../../services/util.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-nivel-topes-carga',
    templateUrl: './nivel-topes-carga.component.html',
    styleUrls: ['./nivel-topes-carga.component.css']
})
export class NivelTopesCargaComponent  {

    nivel: Nivel = new Nivel;
    idnivel: string;

    cargandoTV = false;
    msjerrorTV = false;
    msjeliminarTV = false;
    respuestaTV: number;
    msjTV: string;
    editandoCamposDeCabecera = true;
    formatoMonto: Array<String> = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private nivelservice: NivelesService,
        public utilService: UtilService,
		private location: Location
    ) {
        route.params.subscribe(params => {
            this.idnivel = params['id'];
            this.idnivel = this.idnivel.toString();
            if (this.idnivel !== 'nuevo-nivel') {
                this.refresh();
            }
            else
            {
                this.nivel.nivel = 0;
            }

        });
    }

    refresh() {
        this.cargandoTV = true;
        this.nivelservice.obtenerNivel(Number(this.idnivel))
            .then(tv => {
                this.cargandoTV = false;
                this.nivel = tv;
            })
            .catch(tvC => {
                this.utilService.manejarError(tvC);
            });
    }
    
    
    cancel() {
		this.location.back();
	}

    crear() {
        
        this.cargandoTV = true;
        if (this.nivel.nivel < 1 || this.nivel.nivel.toString() === "") {
            
            this.msjTV = 'Ingrese los campos necesarios.';
            this.msjerrorTV = true;
            this.cargandoTV = false;
        } else {
            this.nivelservice.crear(this.nivel)
                .then(r => {
                    this.cargandoTV = false;
                    if (r === 200) {
                        this.cancel();
                        }
                })
                .catch((response: Response) => {
                    alert(response);
                });
        }

    }

    guardar() {
        this.cargandoTV = true;
        if (this.nivel.nivel < 1 || this.nivel.nivel.toString() === "") {
            this.msjTV = 'Ingrese los campos necesarios.';
            this.msjerrorTV = true;
            this.cargandoTV = false;
        } else {
            this.nivelservice.editar(this.nivel)
                .then(r => {
                    this.cargandoTV = false;
                    if (r === 200) {
                        this.cancel();
                        }
                })
                .catch((response: Response) => {
                    this.cargandoTV = false;
                    this.respuestaTV = response.status;
                    this.msjTV = response.statusText;
                    this.msjerrorTV = true;
                });
        }
    }
    
    currentPattern(id: number) {
        switch (id)
        {
            case 0:
                this.formatoMonto[0] = this.utilService.formatoMoneda(this.nivel.totalAlimentosDesayunoDia || 0);
            break;
            case 1:
                this.formatoMonto[1] = this.utilService.formatoMoneda(this.nivel.totalAlimentosComidaDia || 0);
            break;
            case 2:
                this.formatoMonto[2] = this.utilService.formatoMoneda(this.nivel.totalAlimentosCenaDia || 0);
            break;
            case 3:
                this.formatoMonto[3] = this.utilService.formatoMoneda(this.nivel.hospedajeDia || 0);
            break;
            case 4:
                this.formatoMonto[4] = this.utilService.formatoMoneda(this.nivel.propina || 0);
            break;
            case 5:
                this.formatoMonto[5] = this.utilService.formatoMoneda(this.nivel.estacionamiento || 0);
            break;
            case 6:
                this.formatoMonto[6] = this.utilService.formatoMoneda(this.nivel.atencionClientes || 0);
                break;
            case 7:
                this.formatoMonto[7] = this.utilService.formatoMoneda(this.nivel.talachas || 0);
            break;
            case 8:
                this.formatoMonto[8] = this.utilService.formatoMoneda(this.nivel.noDeducibles || 0);
            break;
            case 9:
                this.formatoMonto[9] = this.utilService.formatoMoneda(this.nivel.taxis || 0);
            break;
        }
        
    }

    eliminar()
    {
        this.utilService
            .mostrarDialogoSimple(
                "Eliminar el nivel "+ this.nivel.nivel,
                "Estás a punto de borrar el nivel "+ this.nivel.nivel+", esta operación es irreversible ¿Estás seguro que deseas eliminar?",
                "Eliminar el nivel "+ this.nivel.nivel,
                "Cancelar",
                'accent')
            .then(o => {
                if (o != "ok") return;
                this.cargandoTV = true;
                this.nivelservice.eliminar(Number(this.nivel.id))
                    .then(el => {
                        if (el.status !== 200) {
                            this.cargandoTV = false;
                            this.respuestaTV = el.status;
                            this.msjTV = 'Error al realizar la eliminación';
                            this.msjerrorTV = true;
                        } else {
                            this.cargandoTV = false;
                            this.cancel();
                        }
                    });
            });
    }
}

