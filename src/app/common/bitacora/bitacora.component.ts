import { Component, Input, OnInit } from '@angular/core';
import { BitacoraService } from '../../services/bitacora.service';
import { Bitacora } from '../../../model/bitacora';
import { UtilService } from '../../services/util.service';

@Component({
	selector: 'app-bitacora',
	templateUrl: './bitacora.component.html',
	styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

	@Input() numeroSolicitud: string;
	//bitacora: Bitacora = new Bitacora();
	mostrarBitacora: boolean = false;
	nuevaSolicitud: boolean = false;
	bitacora: Bitacora[] = [];
	constructor(private bitacoraService: BitacoraService, private utilService: UtilService) { 
		//this.refresh();
		this.mostrarBitacora = false;
	}

	ngOnInit(): void {
		// this.refresh();
		this.mostrarBitacora = false;
	}


	refresh() {
		this.bitacoraService
			.obtenerBitacora(this.numeroSolicitud)
			.subscribe(result => {
				this.bitacora = result;
			},
			error => {
				this.utilService.manejarError(error);
			});
	}

}
