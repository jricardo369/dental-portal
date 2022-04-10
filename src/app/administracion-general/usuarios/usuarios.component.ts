import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { PaginationManager } from '../../../util/pagination';

import { Router } from '@angular/router';
import { UsuariosService, Filter } from '../../services/usuarios.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    mostrandoResultadosFiltrados = false;
    mostrarMensajeDeEliminar = false;
    cargando = false;
    mostrarMensaje = false;

    filters: Filter[] = [];
    usuarios: Usuario[] = [];
    seleccion: string[] = [];

    paginacion: PaginationManager = new PaginationManager();

    constructor(
        private router: Router,
        private usuariosService: UsuariosService,
        public utilService: UtilService
    ) {
        this.refrescar();
        this.limpiarFiltros();
    }

    ngOnInit(): void { }

    estanTodosSeleccionados() {
        return this.seleccion.length == this.usuarios.length;
    }

    checkAll(event: Event, id: string) {
        if (this.estanTodosSeleccionados()) this.seleccion = [];
        else {
            this.seleccion = [];
            this.usuarios.forEach(u => this.seleccion.push(u.id));
        }
    }

    estaSeleccionado(id: string) {
        return this.seleccion.find(e => e == id) != null;
    }

    check(event: Event, id: string) {
        if ((event.srcElement as HTMLInputElement).checked) {
            //add
            if (!this.estaSeleccionado(id)) this.seleccion.push(id);
        } else {
            //remove
            if (this.estaSeleccionado(id)) this.seleccion.splice(this.seleccion.indexOf(id), 1);
        }
    }

    agregarFiltro() {
        let filter: Filter = { campo: 'usuario', operador: '==', valor: '' };
        this.filters.push(filter);
    }

    eliminarFiltro(filter: Filter) {
        this.filters.splice(this.filters.indexOf(filter), 1);
        if (this.filters.length == 0) this.limpiarFiltros();
    }

    refrescarConFiltros() {
        this.cargando = true;
        this.usuariosService.obtenerUsuarios(this.filters).then(r => {
            this.usuarios = r;
            this.paginacion.setArray(r);
            this.cargando = false;
        });
        this.mostrandoResultadosFiltrados = true;
        this.seleccion = [];
    }

    limpiarFiltros() {
        this.filters = [];
        if (this.mostrandoResultadosFiltrados) {
            this.refrescarConFiltros();
            this.mostrandoResultadosFiltrados = false;
        }
    }

    crear() {
        this.router.navigate([this.router.url + '/crear-usuario']);
    }

    refrescar() {
        this.cargando = true;
        this.usuariosService.obtenerUsuarios().then(r => {
            this.usuarios = r;
            this.paginacion.setArray(r);
            this.cargando = false;
        }).catch(err => this.utilService.manejarError(err));
        this.mostrandoResultadosFiltrados = false;
        this.seleccion = [];
    }

    eliminar() {
        this.mostrarMensajeDeEliminar = true;
    }

    confirmarEliminar() {
        this.cargando = true;
        this.mostrarMensajeDeEliminar = false;
        let promises = [];
        this.seleccion.forEach(id => promises.push(this.usuariosService.eliminarUsuario(id)));
        Promise
            .all(promises)
            .then(results => {
                this.cargando = false;
                let failed = [];
                results.forEach(r => { if (r.success == false) failed.push(r) });
                if (failed.length > 0) this.mostrarMensaje = true;
                this.refrescar();
            }).catch(e => {
                window.alert("ALGO NO SALIO BIEN");
                console.log(e);
                this.cargando = false;
            });
    }

    cargaMasiva = () => this.router.navigate(['./administracion/general/usuarios/carga-masiva']);

}
