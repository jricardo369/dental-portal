import { CajaChica } from "./caja-chica";
import { SapSociedad } from "./sap-sociedad";
import { Sociedad } from "./sociedad";
import { GastoDeSolicitudDeContabilizacionDeCajaChica } from './gasto-de-solicitud-de-contabilizacion-de-caja-chica';
import { EventoSolicitudCajaChica } from './evento-solicitud-caja-chica';

export class SolicitudDeContabilizacionDeCajaChica {

    añoContabilizacionSap: number = null;
    documentoContable: number = null;
    estatus: string = null;
    fechaContabilizacion: any = null;
    fechaDocumento: any = null;
    id: number = null;
    referencia: string = null;
    tieneAjustes: boolean = null;
    
    cajaChica: CajaChica = null;
    sociedad: Sociedad = null;

    gastos: GastoDeSolicitudDeContabilizacionDeCajaChica[] = null;
    bitacora: EventoSolicitudCajaChica[] = null;
    
    static fromPlainObject(o: any): SolicitudDeContabilizacionDeCajaChica {
        if (!o) return null;
        let e = new SolicitudDeContabilizacionDeCajaChica();
        for (let key in e) e[key] = o[key];
        if (e.cajaChica) e.cajaChica = CajaChica.fromPlainObject(e.cajaChica);
        if (e.sociedad) e.sociedad = Sociedad.fromPlainObject(e.sociedad);
        if (e.gastos) e.gastos = GastoDeSolicitudDeContabilizacionDeCajaChica.fromPlainObjectArray(e.gastos);
        if (e.bitacora) e.bitacora = EventoSolicitudCajaChica.fromPlainObjectArray(e.bitacora);
        return e;
    }

    static fromPlainObjectArray(O: any[]): SolicitudDeContabilizacionDeCajaChica[] {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof SolicitudDeContabilizacionDeCajaChica)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}