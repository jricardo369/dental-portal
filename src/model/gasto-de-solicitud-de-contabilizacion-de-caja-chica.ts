import { GastoCaja } from "./gasto-caja";

export class GastoDeSolicitudDeContabilizacionDeCajaChica {

    asignacion: string = null;
    centroDeBeneficio: string = null;
    centroDeCosto: string = null;
    elementoPep: string = null;
    estatus: string = null;
    documentoContable: string = null;
    grafo: any = null;
    id: number = null;

    totalFactura: number = 0;
    subtotal: number = 0;
    descuento: number = 0;
    importe: number = 0;
    ish: number = 0;
    isr: number = 0;
    iva: number = 0;
    ieps: number = 0;
    tua: number = 0;

    operacionGrafo: string = null;
    orden: string = null;
    rfcEmisor: string = null;
    rutaPdf: string = null;
    rutaXml: string = null;
    solicitud: any = null;
    texto: string = null;
    uuid: string = null;

    gastoCaja: GastoCaja = null;

    static fromPlainObject(o: any): GastoDeSolicitudDeContabilizacionDeCajaChica {
        if (!o) return null;
        let e = new GastoDeSolicitudDeContabilizacionDeCajaChica();
        for (let key in e) e[key] = o[key];
        if (e.gastoCaja) e.gastoCaja = GastoCaja.fromPlainObject(e.gastoCaja);

        ["totalFactura", "subtotal", "importe", "descuento", "importe", "ish", "isr", "iva", "ieps", "tua"].forEach(key => {
            if (typeof e[key] == 'string') {
                try { e[key] = Number.parseFloat(e[key]); }
                catch (err) { console.error(err); }
            } else if (!e[key]) {
                e[key] = 0;
            }
        })

        return e;
    }

    static fromPlainObjectArray(O: any[]): GastoDeSolicitudDeContabilizacionDeCajaChica[] {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof GastoDeSolicitudDeContabilizacionDeCajaChica)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}