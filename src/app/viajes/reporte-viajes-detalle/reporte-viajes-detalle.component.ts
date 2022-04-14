import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ViajesService } from 'src/app/services/viajes.service';
import { Solicitud } from './../../../model/solicitud';
import { Comprobante } from 'src/model/comprobante';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reporte-viajes-detalle',
  templateUrl: './reporte-viajes-detalle.component.html',
  styleUrls: ['./reporte-viajes-detalle.component.css']
})
export class ReporteViajesDetalleComponent  {

  mostrarCamposOcultos = false;
  loading = false;
  rechazar = false;
  idSolicitud: string;
  solicitud: Solicitud = new Solicitud;
  solicitudes: Solicitud[];
  totalgv: Comprobante = new Comprobante();
  

  constructor(
    private viajesService: ViajesService,
    public utilService: UtilService,
    private route: ActivatedRoute,
    private router: Router,
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
          this.actualizarSumaDeComprobantes();
          this.loading = false;
        })
        .catch(reason => this.utilService.manejarError(reason))
      .then(() => this.loading = false)
  }

  cancel() {
		this.location.back();
	}

  actualizarSumaDeComprobantes() {
    let com = this.solicitud.comprobantes;
    if (!com) return;
    this.totalgv = new Comprobante();
    this.totalgv.total = com.map(e => e.total).reduce((a, b) => a + b, 0);
    this.totalgv.subTotal = com.map(e => e.subTotal).reduce((a, b) => a + b, 0);
    this.totalgv.impuesto = com.map(e => e.impuesto).reduce((a, b) => a + b, 0);
    this.totalgv.iva = com.map(e => e.iva).reduce((a, b) => a + b, 0);
    this.totalgv.isr = com.map(e => e.isr).reduce((a, b) => a + b, 0);
    this.totalgv.ieps = com.map(e => e.ieps).reduce((a, b) => a + b, 0);
    this.totalgv.propina = com.map(e => e.propina).reduce((a, b) => a + b, 0);
  }
  
  descargar(idComprobanteViatico:string, ruta: string, formato: string) {
    var filenameWithExtension = ruta.replace(/^.*[\\\/]/, '');
    var filename = filenameWithExtension.split('.')[0];
    
    this.viajesService
        .descargar(idComprobanteViatico, formato)
        .then(response => {
            this.saveByteArray(filename, response, formato);
        })
        .catch(reason => this.utilService.manejarError(reason))
        .then(() => this.loading = false);
  }
  
  
saveByteArray(reportName: string, byte: ArrayBuffer, formato: string) {
  var file = (formato === 'pdf' ? new Blob([byte], {type: 'application/pdf'}) 
                  : (formato === 'xml' ? new Blob([byte], {type: 'application/xml'}) 
                  : new Blob([byte], {type: 'application/zip'}))
              );
  var fileURL = URL.createObjectURL(file);
  let link: any = window.document.createElement('a');
  link.href = fileURL;
  link.download = reportName;
  link.click();
}

  
  ordenarSolicitudes() {
    this.solicitudes.sort((a: Solicitud, b: Solicitud) => parseInt(a.numeroSolicitud) > parseInt(b.numeroSolicitud) ? -1 : 1);
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

  poliza() {
    this.router.navigate(['/poliza/'+this.idSolicitud]);
  }

}
