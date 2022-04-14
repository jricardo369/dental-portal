import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { Solicitud } from './../../../model/solicitud';
import { ReporteService } from '../../services/reporte.service';
import { PaginationManager } from 'src/util/pagination';
import { Prepoliza } from 'src/model/prepoliza';
import { Location } from '@angular/common';


@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.css']
})
export class PolizaComponent {
   
  mostrarFiltros = false;
  estSel : string = "";
  orgSel : string = "";
  titulo: string = 'Prepoliza';
  idSolicitud: string = "";
  solicitudes: Solicitud[] = [];
  prepolizas: Prepoliza[] = [];
  loading: boolean = false;
  paginacion: PaginationManager = new PaginationManager();

  constructor(
    private reporteService: ReporteService,
    public utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
  )
  {
    route.params.subscribe(params => {
      this.idSolicitud = params['id'];
    });
    this.obtenerPoliza();
   }



  obtenerPoliza() {
    this.loading = true;
    this.reporteService.consultarPrepoliza(this.idSolicitud)
        .then(prepolizas => {
          this.prepolizas = prepolizas;
          this.paginacion.setArray(this.prepolizas);
        })
        .catch(reason => this.utilService.manejarError(reason))
        .then(() => this.loading = false)
  }

  cancel() {
    //this.router.navigate(['/reporte-viajes/'+this.idSolicitud]);
    this.location.back();
  }
}
