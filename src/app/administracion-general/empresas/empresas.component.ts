import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './../../services/util.service';
import { Empresa } from './../../../model/empresa';
import { EmpresasService } from './../../services/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {
  empresa: Empresa[] = [];
  cargando = false;
  constructor(
      private router: Router,
      private empresasService: EmpresasService,
      public utilService: UtilService
  ) {
      this.refresh();
  }


  refresh() {
      this.cargando = true;
      this.empresasService.obtenerEmpresas()
          .subscribe(result => {
              this.empresa = result;
              this.cargando = false;
          },
          error => {
              this.utilService.manejarError(error);
              this.cargando = false;
          });
  }

  nuevo() {
      this.router.navigate(['administracion-general/empresas/nueva-empresa']);
  }
}
