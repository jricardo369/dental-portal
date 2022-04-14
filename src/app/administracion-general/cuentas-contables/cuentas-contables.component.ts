import { Component, OnInit } from '@angular/core';
import { Subcuenta } from '../../../model/subcuenta';
import { CuentasContablesService } from '../../services/cuentas-contables.service';
import { UtilService } from './../../services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Interface } from 'readline';
import { PaginationManager } from 'src/util/pagination';

interface Filtro {
    campo:  string,
    valor: string,
}

@Component({
  selector: 'app-cuentas-contables',
  templateUrl: './cuentas-contables.component.html',
  styleUrls: ['./cuentas-contables.component.css']
})
export class CuentasContablesComponent {

    filtro: Filtro = {campo: "", valor: ""};

    subcuenta: Subcuenta[] = [];
    subcuentaSinFiltrar: Subcuenta[] = [];
    cargando = false;

    paginacion: PaginationManager = new PaginationManager();

    constructor(
        private router: Router,
        private cuentasService: CuentasContablesService,
        public utilService: UtilService
    ) {
        this.refresh();
    }


    refresh() {
        this.cargando = true;
        this.cuentasService.obtenerSubcuentas()
            .subscribe(result => {
                this.subcuenta = result;
                this.subcuentaSinFiltrar = this.subcuenta;
                this.filtro = {campo: "", valor: ""};
                this.paginacion.setArray(this.subcuenta);
                this.cargando = false;
            },
            error => {
                this.utilService.manejarError(error);
                this.cargando = false;
            });
    }

    nuevo() {
        this.router.navigate(['/cuenta/nueva-cuenta']);
    }

    aplicarFiltro(){
        let filtered = [];
        for (let i = 0; i < this.subcuentaSinFiltrar.length; i++) {
            let r = this.subcuentaSinFiltrar[i];

            let v = null;

            switch (this.filtro.campo) {
                case 'codigo': v = r.codigo; break;
                case 'descripcion': v = r.descripcion; break;
                case 'empresa': v = r.empresa; break;
                case 'ceco': v = r.ceco; break;
                case 'tipo': v = r.tipo; break;
            }

            if (('' + v).toLowerCase().includes(('' + this.filtro.valor).toLowerCase())) filtered.push(r);
        }
        this.subcuenta = filtered;
        this.paginacion.setArray(this.subcuenta);
    }

}
