import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { PaginationManager } from 'src/util/pagination';
import { DialogoPagoComponent } from './../dialogo-pago/dialogo-pago.component';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

	cargando: boolean = false;
	esPaciente: boolean = false;
	titulo: string = "";

	fecha: string = "";

	paginacion: PaginationManager = new PaginationManager();

	constructor(
        activatedRoute: ActivatedRoute,
		private router: Router,
		public utilService: UtilService,
        private dialog: MatDialog) {
			if (activatedRoute.routeConfig.path == 'pagos') {
				this.esPaciente = false;
				this.titulo = "Pagos"
			}
			else if (activatedRoute.routeConfig.path == 'mis-pagos') {
				this.esPaciente = true;
				this.titulo = "Mis pagos"
			}
		}

	ngOnInit(): void {
	}

	refrescar() {}

	crearPago() {
		this.dialog.open(DialogoPagoComponent, {
            data: {},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'creado') this.refrescar();
        }).catch(reason => this.utilService.manejarError(reason));
	}

	descargarPdf() {}

}
