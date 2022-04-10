import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Rol } from '../../model/rol';
import { Permiso } from '../../model/permiso';
import { Sociedad } from '../../model/sociedad';
import { Usuario } from '../../model/usuario';
import { API_URL, removeNullProperties } from '../app.config';

export interface Filter {
    campo: string;
    operador: string;
    valor: any;
}



@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    private urlUsuarios: string;
    private urlSociedades: string;
    private urlCecos: string;

    private roles: Rol[] = [
        { id: 1, nombre: "Administrador" },
        { id: 2, nombre: "Empleado" },
        { id: 3, nombre: "Proveedor" }
    ];

    private permisos: Permiso[] = [
        { id: 1, nombre: "Cargar gastos de viajes" },
        { id: 2, nombre: "Autorizar viajes" },
        //{ id: 3, nombre: "Cargar nómina" },
        { id: 4, nombre: "Cargar facturas con orden de compra" },
        { id: 5, nombre: "Cargar facturas sin orden de compra" },
        { id: 6, nombre: "Autorizar gastos de viaje por centro de costo" },
        { id: 7, nombre: "Responsable de caja chica" },
        //{ id: 8, nombre: "Carga de uuid" },
        //{ id: 9, nombre: "Validar por fiel" },
        { id: 10, nombre: "Proveedor hotel" },
        { id: 11, nombre: "Autorizador de caja chica" },
        { id: 12, nombre: "Autorizar gastos de viaje de autorizador de centro de costos" },
        //{ id: 13, nombre: "Proveedor nacional con orden de compra técnica" },
        //{ id: 14, nombre: "Carga de facturas con ordend de compra técnica de proveedores extranjeros" },
        { id: 16, nombre: "Contabilizar Caja Chica" },
        { id: 25, nombre: "Consulta de facturas" }
    ];

    private permisosDeEmpleados: Permiso[] = [
    ];

    private permisosDeProveedor: Permiso[] = [
    ];

    private sociedades: Sociedad[] = null;
    private usuarios: Usuario[] = null;

    constructor(private http: HttpClient) {
        this.urlUsuarios = API_URL + "users";
        this.urlSociedades = API_URL + "config/sociedades";
    }

    obtenerUsuarios(filters: Filter[] = null): Promise<Usuario[]> {
        return new Promise((resolve, reject) => this.http
            .get(this.urlUsuarios, { withCredentials: true, observe: 'response', responseType: 'json' }).toPromise()
            .then(r => {
                this.usuarios = Usuario.fromPlainObjectArray((r.body as any).usuario);
                this.usuarios.sort((a, b) => {
                    if (a.id < b.id) return -1;
                    if (a.id > b.id) return 1;
                    return 0;
                });
                this.yaHaSidoInvocadoElServicioDeObtenerTodosoLosUsuarios = true;
                if (filters == null) resolve(this.usuarios);
                else {
                    let filtered = [];
                    u: for (let i = 0; i < this.usuarios.length; i++) {
                        let usuario = this.usuarios[i];
                        for (let j = 0; j < filters.length; j++) {
                            let f = filters[j];

                            let v = undefined;
                            if (f.campo.includes('.')) {
                                let parts = f.campo.split('.');
                                let temp = usuario[parts[0]];
                                for (let i = 1; i < parts.length; i++) {
                                    if (temp) temp = temp[parts[i]];
                                    else break;
                                }
                                v = temp;
                            } else {
                                v = ('' + usuario[f.campo]).toLowerCase();
                            }

                            let val = ('' + f.valor).toLowerCase();
                            switch (f.operador) {
                                case "==": if (!(v == val)) continue u; break;
                                case ">=": if (!(v >= val)) continue u; break;
                                case "<=": if (!(v <= val)) continue u; break;
                                case ">": if (!(v > val)) continue u; break;
                                case "<": if (!(v < val)) continue u; break;
                                case "startsWith": if (!(('' + v).startsWith(val))) continue u; break;
                                case "endsWith": if (!(('' + v).endsWith(val))) continue u; break;
                                case "includes": if (!(('' + v).includes(val))) continue u; break;
                            }
                        }
                        filtered.push(usuario);
                    };
                    resolve(filtered);
                }
            }).catch(r => {
                reject(r);
                console.log(r);
            }));
    }

    yaHaSidoInvocadoElServicioDeObtenerTodosoLosUsuarios = false;
    obtenerUsuario(id: string): Promise<Usuario> {

        return new Promise((resolve, reject) => {

            // ESTO ESTA MAL Y VAMOS A CORREGIRLO CUANDO FIXEEMOS EL API,
            // COMO VA A SER POSIBLE QUE TENGAMOS QUE USAR UN CACHE DE LAS CAJAS QUE HAY,
            // QUE PENA DE VERDAD
            let something = () => {
                let usuario = this.usuarios.find(e => e.id == id);
                if (!usuario) {
                    let mock = new HttpErrorResponse({ status: 404, error: 'Usuario no encontrado' });
                    reject(mock);
                } else {
                    Promise.all([
                        this.obtenerPermisosDeUsuario(usuario.id),
                        this.obtenerSociedadesAuxiliaresDeUsuario(usuario.id)
                    ]).then(respuestas => {
                        usuario.permisos = respuestas[0];
                        usuario.sociedadesAuxiliares = respuestas[1];
                        resolve(usuario);
                    }).catch(reason => {
                        reject(reason);
                    });
                }
            }
            if (this.yaHaSidoInvocadoElServicioDeObtenerTodosoLosUsuarios) something();
            else this.obtenerUsuarios().then(() => something());
        });

        /* 
        // EN INFRA NO EXISTE ESTE SERVICIO 
        return new Promise((resolve, reject) => this.http
            .get(this.urlUsuarios + "/" + id, { withCredentials: true, observe: 'response', responseType: 'json' }).toPromise()
            .then(r => resolve(Usuario.fromPlainObject((r.body as any).usuario)))
            .catch(r => reject(r)));
            */
    }

    obtenerPermisosDeUsuario(id: string): Promise<Permiso[]> {
        return new Promise((resolve, reject) => this.http
            .get(this.urlUsuarios + "/" + id + "/permisos", { withCredentials: true, observe: 'response', responseType: 'json' }).toPromise()
            .then(r => {
                let E: any[] = (r.body as any).permisos;
                resolve(E.map(e => new Permiso(e.permiso_id)));
            }).catch(r => reject(r)));
    }

    obtenerSociedadesAuxiliaresDeUsuario(id: string): Promise<Sociedad[]> {
        return new Promise((resolve, reject) => this.http
            .get(this.urlUsuarios + "/" + id + "/sociedades-auxiliares", { withCredentials: true, observe: 'response', responseType: 'json' }).toPromise()
            .then(r => {
                let E: any[] = (r.body as any).sociedad;
                resolve(E.map(e => Sociedad.fromPlainObject(e)));
            }).catch(r => reject(r)));
    }

    obtenerRoles(): Promise<Rol[]> {
        return new Promise((resolve, reject) => resolve(this.roles));
    }

    obtenerPermisos(): Promise<Permiso[]> {
        return new Promise((resolve, reject) => resolve(this.permisos));
    }

    obtenerSociedades(): Promise<Sociedad[]> {
        return new Promise((resolve, reject) => {
            if (this.sociedades != null) {
                resolve(this.sociedades);
            } else this.http
                .get(this.urlSociedades, { withCredentials: true, observe: 'response', responseType: 'json' }).toPromise()
                .then(r => {
                    this.sociedades = (r.body as any).sapSociedad;
                    resolve(this.sociedades);
                }).catch(r => reject(r))
        });
    }

    actualizarUsuario(usuario: Usuario): Promise<any> {
        // POR CULPA DEL API MAL HECHA
        (usuario as any).username = usuario.usuario;
        return new Promise((resolve, reject) => {
            this.http
                .post(this.urlUsuarios + "/" + usuario.id, { usuario: usuario }, { withCredentials: true, observe: 'response', responseType: 'json' })
                .toPromise()
                .then(r => {
                    if ((r.body as any).success == false) resolve(r.body);
                    else if ((r.body as any).success == true) resolve(r.body);
                    else resolve(Usuario.fromPlainObject(r.body as any))
                })
                .catch(r => reject(r));
        });
    }

    crearUsuario(usuario: Usuario): Promise<any> {
        // POR CULPA DEL API MAL HECHA
        (usuario as any).username = usuario.usuario;
        removeNullProperties(usuario);
        return new Promise((resolve, reject) => {
            this.http
                .post(this.urlUsuarios, { usuario: usuario }, { withCredentials: true, observe: 'response', responseType: 'json' })
                .toPromise()
                .then(r => resolve(Usuario.fromPlainObject(r.body as any)))
                .catch(r => reject(r));
        });
    }

    eliminarUsuario(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(this.urlUsuarios + "/" + id, { withCredentials: true, observe: 'response', responseType: 'json' })
                .toPromise()
                .then(r => resolve((r.body as any)))
                .catch(r => reject(r));
        });
    }

    cargaMasivaDeUsuarios(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            let d = new FormData();
            d.append('layout_xml', file);
            let r = new XMLHttpRequest();
            r.open('post', API_URL + "config/users/layout");
            r.withCredentials = true;
            r.send(d);
            r.onreadystatechange = () => {
                if (r.readyState == 4) {
                    if (r.status == 200) resolve(JSON.parse(r.responseText).result);
                    else reject(r);
                }
            }
        });
    }
}
