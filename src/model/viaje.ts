import { Usuario } from "./usuario";
import { parse_DD_MM_YYYY } from "../app/app.config";
import { GastoViaje } from "./gasto-viaje";
import { TiposDeViaje as TiposViaje } from './tipos-de-viaje';

export class Viaje {

    // numeroTrayecto: number = null;
    noTrayecto: number = null;
    empleado: Usuario = null;
    usuario: number = null;

    comentarios: string = null;
    destino: string = null;
    esquema: string = null;
    estatus: string = null;
    fechaFin: Date = null;
    fechaInicio: Date = null;
    horaF: Date = null;
    horaI: Date = null;
    motivo: string = null;
    pais: string = null;
    numeroAnticipo: string = null;
    sociedadAnticipo: string = null;
    autorizadoConAjustes: boolean = null;
    salidaDesde: string = null;
    tipoViaje: TiposViaje = null;

    comprobantes: GastoViaje[] = null;

    static fromPlainObject(o: any): Viaje {

        if (!o) return null;
        let e = new Viaje();
        for (let key in e) e[key] = o[key];
        // if (e.rol) e.rol = Rol.fromPlainObject(e.rol);

        if (o.fechaInicio) e.fechaInicio = parse_DD_MM_YYYY(o.fechaInicio);
        if (o.fechaFin) e.fechaFin = parse_DD_MM_YYYY(o.fechaFin);

        return e;
    }

    static fromPlainObjectArray(O: any[]): any {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof Viaje)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}