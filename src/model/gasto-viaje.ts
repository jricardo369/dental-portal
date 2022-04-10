import { parse_DD_MM_YYYY } from "../app/app.config";
import { Segregacion } from './segregacion';

export class GastoViaje {

    idComprobante: number = null;
    
    viaje: number = null;
    claseGasto: string = null;

    total: number = null;
    subtotal: number = null;
    iva: number = null;
    isr: number = null;
    ish: number = null;
    ieps: number = null;
    tua: number = null;

    porcentajeImpuesto: number = null;
    deducible: string = null;
    estatus: string = null;
    fecha: Date = null;
    moneda: string = null;
    rutaPdf: string = null;

    segregacions: Segregacion[] = null;

    static fromPlainObject(o: any): GastoViaje {

        if (!o) return null;
        let e = new GastoViaje();
        for (let key in e) e[key] = o[key];
        // if (e.rol) e.rol = Rol.fromPlainObject(e.rol);

        if (o.fecha) e.fecha = parse_DD_MM_YYYY(o.fecha);

        // POR ALGUNA RAZON LOS REGRESA COMO STRING, API DEBE SER CORREGIDA
        if (e.total) e.total = Number.parseFloat('' + e.total);
        if (e.subtotal) e.subtotal = Number.parseFloat('' + e.subtotal);
        if (e.iva) e.iva = Number.parseFloat('' + e.iva);
        if (e.ish) e.ish = Number.parseFloat('' + e.ish);
        if (e.isr) e.isr = Number.parseFloat('' + e.isr);
        if (e.ieps) e.ieps = Number.parseFloat('' + e.ieps);
        if (e.tua) e.tua = Number.parseFloat('' + e.tua);

        if (e.segregacions) e.segregacions = Segregacion.fromPlainObjectArray(e.segregacions);

        return e;
    }

    static fromPlainObjectArray(O: any[]): any {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof GastoViaje)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}