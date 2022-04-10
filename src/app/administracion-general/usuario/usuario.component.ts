import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { Permiso } from '../../../model/permiso';
import { Rol } from '../../../model/rol';
import { Sociedad } from '../../../model/sociedad';
import { Area } from '../../../model/area';
import { Router, ActivatedRoute } from '@angular/router';

import { AreasService } from '../../services/areas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuariosService } from '../../services/usuarios.service';
import { UtilService } from 'src/app/services/util.service';
import { CustomI18nService } from 'src/app/custom-i18n.service';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

    id: string;
    usuario: Usuario = new Usuario();

    roles: Rol[];
    permisos: Permiso[] = [];
    sociedades: Sociedad[];
    areas: Area[];

    cargando: boolean = true;
    creando: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private usuariosService: UsuariosService,
        private areasService: AreasService,
        private utilService: UtilService,
        private i18n: CustomI18nService
    ) {
        this.usuario.permisos = [];
        Promise.all([
            this.usuariosService.obtenerPermisos(),
            this.usuariosService.obtenerSociedades(),
            this.usuariosService.obtenerRoles(),
            this.areasService.obtenerAreas()
        ]).then((r: any) => {
            this.permisos = r[0];
            this.permisos.forEach(e => {
                if (!(e as any).traducido) {
                    e.nombre = this.i18n.get(e.nombre);
                    (e as any).traducido = true;
                }
            });
            this.sociedades = r[1];
            this.roles = r[2];
            this.areas = r[3];
            route.params.subscribe(params => {
                this.id = params['id'];
                this.creando = this.id == 'crear-usuario';
                if (this.creando) {
                    this.cargando = false;
                    this.usuario.permisos = [];
                    this.usuario.rol = this.roles.find(r => r.id == 1);
                    this.usuario.area = this.areas[0];
                } else this.refrescar();
            });
        }).catch(err => console.log(err));
    }

    estaSeleccionado(permiso: Permiso) {
        return this.usuario.permisos.find(p => p.id == permiso.id) != null;
    }

    check(event: Event, permiso: Permiso) {
        if ((event.srcElement as HTMLInputElement).checked) {
            //add
            if (!this.estaSeleccionado(permiso)) this.usuario.permisos.push(permiso);
        } else {
            //remove
            if (this.estaSeleccionado(permiso)) this.usuario.permisos.splice(this.usuario.permisos.indexOf(permiso), 1);
        }
    }

    refrescar() {
        this.cargando = true;
        Promise
            .all([this.usuariosService.obtenerUsuario(this.id)])
            .then((array: any[]) => {

                this.cargando = false;
                this.usuario = array[0];

                // (para facilitar la integración de código legado)

                // vamos a reemplazar el area del usuario por el area equivalente de esta pantalla 
                if (this.usuario.area != null) // REF
                    this.usuario.area = this.areas.find(a => this.usuario.area.idarea == a.idarea);

                // vamos a reemplazar el area del usuario por el area equivalente de esta pantalla 
                if (this.usuario.rol != null) // REF
                    this.usuario.rol = this.roles.find(r => this.usuario.rol.id == r.id);

                // vamos a reemplazar los permisos del usuario por los permisos equivalentes de esta pantalla 
                if (this.usuario.permisos)
                    this.usuario.permisos =
                        this.usuario.permisos
                            .map(e => this.permisos.find(p => p.id == e.id))
                            .filter(e => e);

                // precaución para nulls
                if (!this.usuario.permisos) this.usuario.permisos = [];

            })
            .catch(r => console.error(r));
    }

    esEmpleado(): boolean {
        if (this.usuario == null || this.usuario.rol == null) return false;
        return this.usuario.rol.id == 2;
    }

    esProveedor(): boolean {
        if (this.usuario == null || this.usuario.rol == null) return false;
        return this.usuario.rol.id == 3;
    }

    crear() {
        if (this.usuario.rol.id == 3)
            this.usuario.area = null;
        this.procesarMensaje(this.usuariosService.crearUsuario(this.usuario));
    }

    guardar() {
        this.procesarMensaje(this.usuariosService.actualizarUsuario(this.usuario));
    }

    eliminar() {
        this.borrando = true;
        this.mostrarMensaje = true;
        this.tituloMensaje = "Eliminar usuario de '" + this.usuario.nombre + "'";
        this.textoMensaje = "Estás a punto de eliminar al usuario de '" + this.usuario.nombre + "'" +
            ", esta operación es irreversible ¿estás seguro de que deseas eliminarlo?";
    }

    confirmarEliminar() {
        this.mostrarMensaje = false;
        this.procesarMensaje(this.usuariosService.eliminarUsuario(this.id));
    }

    esPermisoDeRol(p: Permiso): boolean {
        if (!this.usuario.rol) return false;
        if (this.usuario.rol.id == 3) {
            if (p.id == 10) return true;
            return false;
        } else {
            if (p.id == 10) return false;
            return true;
        }
    }

    mostrarMensaje: boolean = false;
    tituloMensaje: string = "";
    textoMensaje: string = "";
    borrando: boolean = false;

    procesarMensaje(p: Promise<any>): void {
        this.cargando = true;
        p.then(r => {
            if (r.success) {
                this.cancelar();
            } else {
                this.borrando = false;
                this.cargando = false;
                this.mostrarMensaje = true;
                this.tituloMensaje = "Ocurrió un error";
                this.textoMensaje = r.message;
            }
        }).catch(r => {
            this.borrando = false;
            this.cargando = false;
            this.mostrarMensaje = true;
            this.tituloMensaje = "Error";
            console.log("HERE#");
            if (r instanceof HttpErrorResponse) this.textoMensaje = r.message;
            else this.textoMensaje = r;
        });
    }

    cancelar() {
        this.router.navigate(['/administracion/general/usuarios']);
    }

    agregarSociedadAuxiliar() {
        this.utilService.mostrarDialogoCombobox(
            'Agregar sociedad auxiliar',
            'Seleccione de la caja de abajo la sociedad auxiliar que quiere agregar al usuario',
            'Agregar sociedad auxiliar',
            'Cancelar',
            'Sociedades', this.sociedades,
            'sociedad',
            null
        ).then(e => {

            if (!e) return;

            if (!this.usuario.sociedadesAuxiliares) this.usuario.sociedadesAuxiliares = [];
            if (e) {
                e.soc = e.sociedad; // horrible parche por diferencia en nomenclaturas
                if (!this.usuario.sociedadesAuxiliares.includes(e)) {
                    this.usuario.sociedadesAuxiliares.push(e);
                }
            }

        }).catch(err => this.utilService.manejarError(err));
    }
}
