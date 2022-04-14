import { Component } from '@angular/core';
import { TareasProgramadasService } from '../../services/tareas-programadas.service';
import { HttpResponse } from '@angular/common/http';
import { UtilService } from './../../services/util.service';
import { TareasProgramadas } from 'src/model/tareas-programadas';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-tareas-programadas',
    templateUrl: './tareas-programadas.component.html',
    styleUrls: ['./tareas-programadas.component.css']
})
export class TareasProgramadasComponent {

    arrTareas: Array<TareasProgramadas> = [];
    envTareas = new TareasProgramadas;
    todayISOString: string = new Date().toISOString();

    cargando: boolean = false;
    dias: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    
    cambiandoDiaGeneracionLayoutEntrega: boolean = false;
    diaGeneracionLayout: string = 'Lunes';
    diaGeneracionLayoutOld: string = 'Lunes';
    horaGeneracionLayout: string = '00:00';
    horaGeneracionLayoutOld: string = '00:00';

    cambiandoDiaGeneracionLayoutComprobaciones: boolean = false;
    diaGeneracionLayoutComprobaciones: string = 'Lunes';
    diaGeneracionLayoutComprobacionestOld: string = 'Lunes';
    horaGeneracionLayoutComprobaciones: string = '00:00';
    horaGeneracionLayoutComprobacionesOld: string = '00:00';

    cambiandoDiaGeneracionLayoutPoliza: boolean = false;
    diaGeneracionLayoutPoliza: string = 'Lunes';
    diaGeneracionLayoutPolizaOld: string = 'Lunes';
    horaGeneracionLayoutPoliza: string = '00:00';
    horaGeneracionLayoutPolizaOld: string = '00:00';

    cambiandoDiaGeneracionLayoutPolizaSYS21: boolean = false;
    diaGeneracionLayoutPolizaSYS21: string = 'Lunes';
    diaGeneracionLayoutPolizaOldSYS21: string = 'Lunes';
    horaGeneracionLayoutPolizaSYS21: string = '00:00';
    horaGeneracionLayoutPolizaOldSYS21: string = '00:00';

    cambiandoDiaGeneracionLayoutPolizaSAPB1: boolean = false;
    diaGeneracionLayoutPolizaSAPB1: string = 'Lunes';
    diaGeneracionLayoutPolizaOldSAPB1: string = 'Lunes';
    horaGeneracionLayoutPolizaSAPB1: string = '00:00';
    horaGeneracionLayoutPolizaOldSAPB1: string = '00:00';

    constructor(public tareasService: TareasProgramadasService,
        public utilService: UtilService) {
        this.obtenerTareas();
    }

    obtenerTareas() {
        this.cargando = true;
        this.tareasService.getTareas()
            .subscribe(result => {
                this.arrTareas = result;
                this.procesarTareas();
            },
            error => {
                this.utilService.manejarError(error);
            });
    }

    procesarTareas() {
        for (let index = 0; index < this.arrTareas.length; index++) {
            switch (Number(this.arrTareas[index].id))
            {
                case 1:
                    this.diaGeneracionLayout = this.arrTareas[index].dia;
                    this.horaGeneracionLayout = this.arrTareas[index].hora;
                    this.diaGeneracionLayoutOld = this.diaGeneracionLayout;
                    this.horaGeneracionLayoutOld = this.horaGeneracionLayout;
                    break;
                case 2:
                    this.diaGeneracionLayoutComprobaciones = this.arrTareas[index].dia;
                    this.horaGeneracionLayoutComprobaciones = this.arrTareas[index].hora;
                    this.diaGeneracionLayoutComprobacionestOld = this.diaGeneracionLayoutComprobaciones;
                    this.horaGeneracionLayoutComprobacionesOld = this.horaGeneracionLayoutComprobaciones;
                    break;
                case 3:
                    this.diaGeneracionLayoutPoliza = this.arrTareas[index].dia;
                    this.horaGeneracionLayoutPoliza = this.arrTareas[index].hora;
                    this.diaGeneracionLayoutPolizaOld = this.diaGeneracionLayoutPoliza;
                    this.horaGeneracionLayoutPolizaOld = this.horaGeneracionLayoutPoliza;
                    break;
                case 4:
                    this.diaGeneracionLayoutPolizaSYS21 = this.arrTareas[index].dia;
                    this.horaGeneracionLayoutPolizaSYS21 = this.arrTareas[index].hora;
                    this.diaGeneracionLayoutPolizaOldSYS21 = this.diaGeneracionLayoutPolizaSYS21;
                    this.horaGeneracionLayoutPolizaOldSYS21 = this.horaGeneracionLayoutPolizaSYS21;
                    break;
                case 5:
                    this.diaGeneracionLayoutPolizaSAPB1 = this.arrTareas[index].dia;
                    this.horaGeneracionLayoutPolizaSAPB1 = this.arrTareas[index].hora;
                    this.diaGeneracionLayoutPolizaOldSAPB1 = this.diaGeneracionLayoutPolizaSAPB1;
                    this.horaGeneracionLayoutPolizaOldSAPB1 = this.horaGeneracionLayoutPolizaSAPB1;
                    break;
            }
        }
        this.cargando = false;
    }

    cambiarDato(caso: number) {
        var fecha = this.todayISOString.split('T', 1);
        this.envTareas.id = caso;
        this.envTareas.codigo = this.arrTareas[caso - 1].codigo;
        this.envTareas.descripcion = this.arrTareas[caso - 1].descripcion;
        this.envTareas.fechaModificacion = fecha.toString();
        switch (caso) {
            case 1:
                this.envTareas.dia = this.diaGeneracionLayout;
                this.envTareas.hora = this.horaGeneracionLayout;
                break;
            case 2:
                this.envTareas.dia = this.diaGeneracionLayoutComprobaciones;
                this.envTareas.hora = this.horaGeneracionLayoutComprobaciones;
                break;
            case 3:
                this.envTareas.dia = this.diaGeneracionLayoutPoliza;
                this.envTareas.hora = this.horaGeneracionLayoutPoliza;
                break;
            case 4:
                this.envTareas.dia = this.diaGeneracionLayoutPolizaSYS21;
                this.envTareas.hora = this.horaGeneracionLayoutPolizaSYS21;
                break;
            case 5:
                this.envTareas.dia = this.diaGeneracionLayoutPolizaSAPB1;
                this.envTareas.hora = this.horaGeneracionLayoutPolizaSAPB1;
                break;
        }
        
        this.cargando = true;
        this.tareasService
            .asignarVariable(this.envTareas)
            .then(response => {
                this.utilService.mostrarDialogoSimple("Cambio realizado correctamente", "");
                if (response.status === 200) {
                    switch (caso) {
                        case 1:
                            this.diaGeneracionLayoutOld = this.diaGeneracionLayout;
                            this.horaGeneracionLayoutOld = this.horaGeneracionLayout;
                            this.cambiandoDiaGeneracionLayoutEntrega = false;
                            break;
                        case 2:
                            this.diaGeneracionLayoutComprobacionestOld = this.diaGeneracionLayoutComprobaciones;
                            this.horaGeneracionLayoutComprobacionesOld = this.horaGeneracionLayoutComprobaciones;
                            this.cambiandoDiaGeneracionLayoutComprobaciones = false;
                            break;
                        case 3:
                            this.diaGeneracionLayoutPolizaOld = this.diaGeneracionLayoutPoliza;
                            this.horaGeneracionLayoutPolizaOld = this.horaGeneracionLayoutPoliza;
                            this.cambiandoDiaGeneracionLayoutPoliza = false;
                            break;
                        case 4:
                            this.diaGeneracionLayoutPolizaOldSYS21 = this.diaGeneracionLayoutPolizaSYS21;
                            this.horaGeneracionLayoutPolizaOldSYS21 = this.horaGeneracionLayoutPolizaSYS21;
                            this.cambiandoDiaGeneracionLayoutPolizaSYS21 = false;
                            break;
                        case 5:
                            this.diaGeneracionLayoutPolizaOldSAPB1 = this.diaGeneracionLayoutPolizaSAPB1;
                            this.horaGeneracionLayoutPolizaOldSAPB1 = this.horaGeneracionLayoutPolizaSAPB1;
                            this.cambiandoDiaGeneracionLayoutPolizaSAPB1 = false;
                            break;
                    }
                    this.obtenerTareas();
                    this.cargando = false;
                }
            }).catch(error => {
                this.cargando = false;
                this.utilService.mostrarDialogoSimple("Error: " + error.message, "No fue posible realizar la modificación");
                this.cancelarCambio(caso);
            });
    }

    cancelarCambio(caso: number) {
        switch (caso) {
            case 1:
                this.cambiandoDiaGeneracionLayoutEntrega = false;
                this.diaGeneracionLayout = this.diaGeneracionLayoutOld;
                this.horaGeneracionLayout = this.horaGeneracionLayoutOld;
                break;
            case 2:
                this.cambiandoDiaGeneracionLayoutComprobaciones = false;
                this.diaGeneracionLayoutComprobaciones = this.diaGeneracionLayoutComprobacionestOld;
                this.horaGeneracionLayoutComprobaciones = this.horaGeneracionLayoutComprobacionesOld;
                break;
            case 3:
                this.cambiandoDiaGeneracionLayoutPoliza = false;
                this.diaGeneracionLayoutPoliza = this.diaGeneracionLayoutPolizaOld;
                this.horaGeneracionLayoutPoliza = this.horaGeneracionLayoutPolizaOld;
                break;
            case 4:
                this.cambiandoDiaGeneracionLayoutPolizaSYS21 = false;
                this.diaGeneracionLayoutPolizaSYS21 = this.diaGeneracionLayoutPolizaOldSYS21;
                this.horaGeneracionLayoutPolizaSYS21 = this.horaGeneracionLayoutPolizaOldSYS21;
                break;
            case 5:
                    this.cambiandoDiaGeneracionLayoutPolizaSAPB1 = false;
                    this.diaGeneracionLayoutPolizaSAPB1 = this.diaGeneracionLayoutPolizaOldSAPB1;
                    this.horaGeneracionLayoutPolizaSAPB1 = this.horaGeneracionLayoutPolizaOldSAPB1;
                    break;
        }
    }


    job(caso: number)
    {
        let campos = [];
        campos.push({ label: "Fecha", type: "date", placeholder: "fecha", value: "" , });
        this.utilService
            .mostrarDialogoConFormulario(
                "Ejecutar job",
                "Por favor ingrese la fecha para la ejecución",
                "Ejecutar",
                "Cancelar",
                campos, 'accent')
            .then(o => {
                if (o != "ok") return;
                if(campos[0].value.trim() =="" || campos[0].value.length === 0 )
                {
                    this.utilService.mostrarDialogoSimple("Error", "Ingrese una fecha valida");
                }
                else
                {
                    switch (caso) {
                        case 1:
                            this.cargando = true;
                            this.tareasService
                                .cargaEntrega(campos[0].value)
                                .then(response => {
                                    this.utilService.mostrarDialogoSimple("Job ejecutado correctamente", "");
                                    this.cargando = false;
                                }).catch(reason => this.utilService.manejarError(reason))
                                .then(() => this.cargando = false)
                            break;
                        case 2:
                            this.cargando = true;
                            this.tareasService
                                .cargaComprobacion(campos[0].value)
                                .then(response => {
                                    this.utilService.mostrarDialogoSimple("Job ejecutado correctamente", "");
                                    this.cargando = false;
                                }).catch(reason => this.utilService.manejarError(reason))
                                .then(() => this.cargando = false)
                            break;
                    }
                }
            });
    }

    jobFox()
    {
        this.utilService
            .mostrarDialogoSimple(
                "Ejecutar job FOX",
                "¿Desea ejecutar el job?",
                "Ejecutar",
                "Cancelar",
                'accent')
            .then(o => {
                if (o != "ok") return;
                this.cargando = true;
                this.tareasService
                    .polizaFox()
                    .then(response => {
                        this.utilService.mostrarDialogoSimple("Job FOX ejecutado correctamente", "");
                        this.cargando = false;
                    }).catch(reason => this.utilService.manejarError(reason))
                    .then(() => this.cargando = false)
            });
    }

    jobSys21()
    {
        this.utilService
            .mostrarDialogoSimple(
                "Ejecutar job SYS21",
                "¿Desea ejecutar el job?",
                "Ejecutar",
                "Cancelar",
                'accent')
            .then(o => {
                if (o != "ok") return;
                this.cargando = true;
                this.tareasService
                    .polizaSYS21()
                    .then(response => {
                        this.utilService.mostrarDialogoSimple("Job SYS21 ejecutado correctamente", "");
                        this.cargando = false;
                    }).catch(reason => this.utilService.manejarError(reason))
                    .then(() => this.cargando = false)
            });
    }

    jobSapB1()
    {
        this.utilService
            .mostrarDialogoSimple(
                "Ejecutar job SAP Business One",
                "¿Desea ejecutar el job?",
                "Ejecutar",
                "Cancelar",
                'accent')
            .then(o => {
                if (o != "ok") return;
                this.cargando = true;
                this.tareasService
                    .polizaSapB1()
                    .then(response => {
                        this.utilService.mostrarDialogoSimple("Job SAP Business One ejecutado correctamente", "");
                        this.cargando = false;
                    }).catch(reason => this.utilService.manejarError(reason))
                    .then(() => this.cargando = false)
            });
    }
}
