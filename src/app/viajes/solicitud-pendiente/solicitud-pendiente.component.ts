import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from '../../app.config';
import { UtilService } from 'src/app/services/util.service';
import { ViajesService } from 'src/app/services/viajes.service';
import { Solicitud } from './../../../model/solicitud';
import { Location } from '@angular/common';
import { Alerta } from 'src/model/alerta';


@Component({
  selector: 'app-solicitud-pendiente',
  templateUrl: './solicitud-pendiente.component.html',
  styleUrls: ['./solicitud-pendiente.component.scss']
})
export class SolicitudPendienteComponent {

  alertas: Alerta[] = [];
  contadorAlertas: number = 0;

  loading = false;
  rechazar = false;
  idSolicitud: string;
  solicitud: Solicitud = new Solicitud;
  solicitudes: Solicitud[];
  constructor(
    private viajesService: ViajesService,
    public utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute,
		private location: Location
  ) {
    route.params.subscribe(params => {
      this.idSolicitud = params['id'];
    });
    
    this.obtenerSolicitud();
  }

  obtenerSolicitud() {
    this.rechazar = false;
    this.loading = true;
    this.viajesService
        .obtenerViaje(this.idSolicitud)
        .then(solicitudes => {
          this.solicitud = solicitudes;
          
            this.actualizarAlertas();
          
          this.loading = false;
        })
        .catch(reason => this.utilService.manejarError(reason))
      .then(() => this.loading = false)
  }

  actualizarAlertas() {
      this.viajesService
          .obtenerAlertasPorSolicitud(this.idSolicitud)
          .then(alertas => {
              this.contadorAlertas = 0;
              alertas.forEach(alerta => {
                  if (alerta.tipo === 'W' || alerta.tipo === 'E') {
                      this.contadorAlertas++;
                  }
                  alerta.tipo = alerta.tipo === 'S'? 'alert-success' : 
                                  (alerta.tipo === 'W'? 'alert-warning' : 
                                  (alerta.tipo === 'E'? 'alert-danger' : 'alert-info'));
              });
              this.alertas = alertas;
          })
          .catch(reason => this.utilService.manejarError(reason))
          .then(() => this.loading = false);
  }
  
  cancel() {
		this.location.back();
	}

  imprimir()
  {
    let url = API_URL + 'reportes-pdf/pdf-solicitud/' + this.idSolicitud;      
    window.open(url, "_blank");
  }


  descargaFactura() {
    this.viajesService
      .getDescargaFactura(this.idSolicitud)
      .subscribe(
        data => {
          const file = new Blob([data], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        }
      );
  }

  aprobarViaje() {
    let campos = [];
    campos.push({ label: "¿Desea agregar algún comentario?", type: "textarea", placeholder: "Comentario ...", value: "" , maxLength:"45"});
    this.utilService
          .mostrarDialogoConFormulario(
            "Aprobar solicitud",
            "Está a punto de aprobar la solicitud, "+
            " esta operación es irreversible",
            "Aprobar solicitud",
            "Cancelar",
            campos,
            'accent')
        .then(o => {
            if (o != "ok") return;
            this.loading = true;
            this.viajesService
            .aprobarRechazar(this.idSolicitud,localStorage.getItem('usuario'),'AUTORIZAR',campos[0].value)
            .then(response => {
                this.utilService.mostrarDialogoSimple("Cambio realizado correctamente", "");
                this.loading = false;
                this.cancel();
            }).catch(reason => this.utilService.manejarError(reason))
            .then(() => this.loading = false)
        });
}

  rechazarViaje()
  {
    let campos = [];
    campos.push({ label: "Motivo", type: "textarea", placeholder: "El motivo del rechazo de la solicitud es ...", value: "" , maxLength:"45"});
    this.utilService
        .mostrarDialogoSimple(
            "Rechazar solicitud",
            "Está a punto de rechazar la solicitud" +
            " esta operación rechazará la solicitud y se tendrá que volver a solicitar la aprobación",
            "Rechazar solicitud",
            "Cancelar", 'accent')
        .then(o => {
          if (o != "ok") return;
          
          this.utilService
            .mostrarDialogoConFormulario(
              "Motivo de rechazo",
              "Por favor ingrese el motivo de rechazo: ",
              "Rechazar solicitud",
              "Cancelar",
              campos,
              'accent')
            .then(o => {
                if (o != "ok") return;
                if(campos[0].value.trim() =="" || campos[0].value.length === 0 )
                {
                  this.utilService.mostrarDialogoSimple("Error", "Ingrese un motivo de rechazo con longitud valida");
                }
                else
                {
                 this.loading = true;
                 this.viajesService
                   .aprobarRechazar(this.idSolicitud, localStorage.getItem('usuario'), 'RECHAZAR', campos[0].value)
                   .then(response => {
                     this.utilService.mostrarDialogoSimple("Cambio realizado correctamente", "");
                     this.loading = false;
                     this.cancel();
                   }).catch(reason => this.utilService.manejarError(reason))
                   .then(() => this.loading = false)
              }
            })
        });
  }


}
