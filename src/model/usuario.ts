import { Rol } from "./rol";
import { Area } from "./area";
import { Permiso } from "./permiso";
import { Sociedad } from './sociedad';

export const PERMISO_CARGAR_GASTOS_DE_VIAJE = 1;
export const PERMISO_AUTORIZAR_VIAJES = 2;
export const PERMISO_AUTORIZAR_GASTOS_DE_VIAJE_POR_CENTRO_DE_COSTO = 6;
export const PERMISO_AUTORIZAR_GASTOS_DE_VIAJE_DE_AUTORIZADOR_DE_CENTRO_DE_COSTO = 12;

export const PERMISO_RESPONSABLE_CAJA_CHICA = 7;
export const PERMISO_AUTORIZADOR_CAJA_CHICA = 11;
export const PERMISO_CONTABILIZADOR_CAJA_CHICA = 16;
export const PERMISO_CONSULTAR_FACTURAS = 25;

export const PERMISO_CARGAR_FACTURAS_CON_ORDEN_DE_COMPRA = 4;
export const PERMISO_CARGAR_FACTURAS_SIN_ORDEN_DE_COMPRA = 5;

export class Usuario {

    id: string = null;
    email: string = null;
    nombre: string = null;
    usuario: string = null;
    password: string = null;
    rfc: string = null;
    sociedad: string = null;
    centro_costo: string = null;
    rol: Rol = null;
    area: Area = null;

    permisos: Permiso[] = null;

    sociedadesAuxiliares: Sociedad[] = null;

    viajes: any = null;

    tieneElPermiso(id: number): boolean {
        if (this.permisos) {
            for (let i = 0; i < this.permisos.length; i++) {
                if (this.permisos[i].id == id) return true;
            }
        }
        return false;
    }

    tieneTodosLosPermisos(...ids: number[]): boolean {
        for (let i = 0; i < ids.length; i++) {
            if (!this.tieneElPermiso(ids[i])) {
                return false;
            }
        }
        return true;
    }

    tieneAlgunoDeLosPermisos(...ids: number[]): boolean {
        for (let i = 0; i < ids.length; i++) {
            if (this.tieneElPermiso(ids[i])) {
                return true;
            }
        }
        return false;
    }

    static fromPlainObject(o: any): Usuario {

        // parche porque no supimos ponerle usuario en lugar de username a contelec-api hace 5 años
        if (o.username && !o.usuario) o.usuario = o.username;

        if (!o) return null;
        let e = new Usuario();
        for (let key in e) {
            if (typeof e[key] == 'function') continue;
            e[key] = o[key];
        }
        if (e.rol) e.rol = Rol.fromPlainObject(e.rol);
        if (e.area) e.area = Area.fromPlainObject(e.area);
        if (e.permisos) e.permisos = Permiso.fromPlainObjectArray(e.permisos);
        if (e.sociedadesAuxiliares) e.sociedadesAuxiliares = Sociedad.fromPlainObjectArray(e.sociedadesAuxiliares);

        // parche temporal
        if (!e.usuario) e.usuario = o.username;

        // parche temporal 2, es por el success y fail del servicio
        if (o.success) (e as any).success = o.success;
        if (o.message) (e as any).message = o.message;

        return e;
    }

    static fromPlainObjectArray(O: any[]): any {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof Usuario)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}