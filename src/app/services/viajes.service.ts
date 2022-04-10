import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { API_URL, safeToISOString, removeNullProperties } from '../app.config';
import { Viaje } from 'src/model/viaje';
import { GastoViaje } from '../../model/gasto-viaje';
import { TipoGasto } from '../../model/tipo-gasto';
import { ClaseGasto } from '../../model/clase-gasto';
import { TiposDeViaje } from 'src/model/tipos-de-viaje';

@Injectable({
    providedIn: 'root'
})
export class ViajesService {

    constructor(private http: HttpClient) { }

    // http://187.237.62.196:8080/SistemaContabilidad/
    // viajes/146/comprobantes?deducible=false
    crearComprobante(
        numeroDeTrayecto: number,
        deducible: boolean,
        claseGasto: any,
        moneda: string,
        total: any,
        subtotal: any,
        fecha: any,
        iva: any,
        isr: any,
        ish: any,
        ieps: any,
        tua: any,
        segregaciones: any,
        segregacionCheck: any,
        centroCostoUsuario: any,
        archivopdf: File,
        archivoxml: File
    ): Promise<any> {

        let mp = new FormData();
        if (claseGasto != null) mp.append('claseGasto', claseGasto);
        if (moneda != null) mp.append('moneda', moneda);
        if (total != null) mp.append('total', total);
        if (subtotal != null) mp.append('subtotal', subtotal);
        if (fecha != null) mp.append('fecha', fecha);
        if (iva != null) mp.append('iva', iva);
        if (isr != null) mp.append('isr', isr);
        if (ish != null) mp.append('ish', ish);
        if (ieps != null) mp.append('ieps', ieps);
        if (tua != null) mp.append('tua', tua);
        if (segregaciones != null) mp.append('segregaciones', JSON.stringify(segregaciones));
        if (segregacionCheck != null) mp.append('segregacionCheck', segregacionCheck);
        if (centroCostoUsuario != null) mp.append('centroCostoUsuario', centroCostoUsuario);

        if (archivopdf != null) mp.append('archivopdf', archivopdf);

        if (archivoxml != null) mp.append('archivoxml', archivoxml);
        else mp.append("archivoxml", new Blob());

        return new Promise<any>((resolve, reject) => {
            this.http
                .post(API_URL + 'viajes/' + numeroDeTrayecto + '/comprobantes', mp, {
                    withCredentials: true,
                    observe: 'response',
                    params: { deducible: '' + deducible }
                })
                .toPromise()
                .then(response => {
                    let json = (response.body as any).result;
                    resolve(json);
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    obtenerComprobante(noTrayecto: number, idComprobante: number): any {
        return new Promise<any>((resolve, reject) => {
            this.http
                .get(API_URL + 'viajes/' + noTrayecto + '/comprobantes/' + idComprobante, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(response => {
                    resolve(GastoViaje.fromPlainObject((response.body as any).gastoViaje));
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    /**
     * Se usar parar los rechazos y aprobaciónes, aunque de paso modifica
     */
    actualizarEstatusComprobante(
        numeroDeTrayecto: number,
        idComprobante: number,
        estatus: string,
        subtotal: number,
        iva: number,
        isr: number,
        ish: number,
        ieps: number,
        tua: number,
        total: number,
    ): Promise<any> {

        return new Promise<any>((resolve, reject) => {
            this.http
                .put(API_URL + 'viajes/' + numeroDeTrayecto + '/comprobantes/' + idComprobante + '/estatus', estatus, {
                    withCredentials: true,
                    observe: 'response',
                    params: {
                        subtotal: '' + subtotal,
                        iva: '' + iva,
                        isr: '' + isr,
                        ish: '' + ish,
                        ieps: '' + ieps,
                        tua: '' + tua,
                        total: '' + total,
                    }
                })
                .toPromise()
                .then(response => {
                    resolve();
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    actualizarEstatusComprobanteCeco(idComprobante, estatus) {
        return new Promise<any>((ok, err) => {
            this.http
                .put(API_URL + 'viajes/autorizadorcencos/comrpobante/' + idComprobante + '/segregacion/estatus',
                    estatus,
                    { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => ok())
                .catch(r => err(r));
        });
    }

    eliminarComprobante(noTrayecto: number, idComprobante: number): any {
        return new Promise<any>((resolve, reject) => {
            this.http
                .delete(API_URL + 'viajes/' + noTrayecto + '/comprobantes/' + idComprobante, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(response => {
                    resolve('OK');
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    obtenerTiposDeViaje(): Promise<TiposDeViaje[]> {
        return new Promise<TiposDeViaje[]>((resolve, reject) => {
            this.http
                .get(API_URL + 'viajes/tipos', {
                    withCredentials: true,
                    observe: 'response',
                    params: {}
                })
                .toPromise()
                .then(response => {
                    let json: any[] = (response.body as any).tipoViaje;
                    resolve(json as TiposDeViaje[]);
                })
                .catch(err => reject(err));
        });
    }

    obtenerTiposDeGasto(idarea: number, soloActivos = true): Promise<TipoGasto[]> {
        return new Promise<TipoGasto[]>((resolve, reject) => {
            this.http
                .get(API_URL + 'areas/' + idarea + '/tiposDeGasto', {
                    withCredentials: true,
                    observe: 'response',
                    params: { activeonly: "" + soloActivos }
                })
                .toPromise()
                .then(response => {
                    let json = (response.body as any).tipoGasto;
                    resolve(TipoGasto.fromPlainObjectArray(json));
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    obtenerCentrosDeCosto(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this.http
                .get(API_URL + 'viajes/responsables/centro-de-costos', {
                    withCredentials: true,
                    observe: 'response',
                    params: {}
                })
                .toPromise()
                .then(response => {
                    let json: any[] = (response.body as any).responsablesCentro;
                    resolve(json.map(e => e.centro_costo));
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    obtenerClasesDeGasto(id: number, soloActivos = true): Promise<ClaseGasto[]> {
        return new Promise<ClaseGasto[]>((resolve, reject) => {
            this.http
                .get(API_URL + 'viajes/tiposDeGasto/' + id + '/clasesdegastos', {
                    withCredentials: true,
                    observe: 'response',
                    params: { activeonly: "" + soloActivos }
                })
                .toPromise()
                .then(response => {
                    let json = (response.body as any).claseGastoViaje;
                    resolve(ClaseGasto.fromPlainObjectArray(json));
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    // *******************************************

    obtenerComprobantesDeViaje(noTrayecto: any): Promise<GastoViaje[]> {
        return new Promise<GastoViaje[]>((resolve, reject) => {
            this.http
                .get(API_URL + 'viajes/' + noTrayecto + '/comprobantes', { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(response => {
                    let json = (response.body as any).gastoViaje;
                    resolve(GastoViaje.fromPlainObjectArray(json));
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    obtenerComprobantesDeViajePendienteDeAutorizacionPorCeco(noTrayecto: any) {
        return new Promise<GastoViaje[]>((resolve, reject) => {
            this.http
                .get(API_URL + 'viajes/autorizadorcencos/' + noTrayecto, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(response => {
                    let json = (response.body as any).gastoViaje;
                    resolve(GastoViaje.fromPlainObjectArray(json));
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    obtenerViaje(noTrayecto: any): Promise<Viaje> {
        return new Promise<Viaje>((resolve, reject) => {
            this.http
                .get(API_URL + 'viajes/' + noTrayecto, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(response => {

                    let json = (response.body as any).viaje;
                    let viaje = Viaje.fromPlainObject(json);

                    this.obtenerComprobantesDeViaje(noTrayecto)
                        .then(e => viaje.comprobantes = e)
                        .catch(r => reject(r))
                        .then(() => resolve(viaje));

                }).catch(reason => reject(reason));
        });
    }

    obtenerViajePendientesDeAutorizacionPorCeco(noTrayecto: any): Promise<Viaje> {
        return new Promise<Viaje>((resolve, reject) => {
            this.http
                .get(API_URL + 'viajes/' + noTrayecto, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(response => {

                    let json = (response.body as any).viaje;
                    let viaje = Viaje.fromPlainObject(json);

                    this.obtenerComprobantesDeViajePendienteDeAutorizacionPorCeco(noTrayecto)
                        .then(e => viaje.comprobantes = e)
                        .catch(r => reject(r))
                        .then(() => resolve(viaje));

                }).catch(reason => reject(reason));
        });
    }

    obtenerViajesPendientesDeAutorizacionPorCeco() {
        return new Promise<Viaje[]>((resolve, reject) => {
            this.http.get(API_URL + 'viajes/autorizadorcencos', {
                params: {},
                withCredentials: true,
                observe: 'response'
            }).toPromise().then(response => {

                // workaround a 204 del servidor en lugar de arreglo vacío
                if (response.status == 204) {
                    resolve([]);
                    return;
                }

                let json = (response.body as any).viaje;
                resolve(Viaje.fromPlainObjectArray(json));

            }).catch(reason => {
                reject(reason);
            });
        })
    }

    obtenerViajesDeAutorizadoresPendientesDeAutorizacion() {
        return new Promise<Viaje[]>((resolve, reject) => {
            this.http.get(API_URL + 'viajes/autorizadorcencos-cc', {
                params: {},
                withCredentials: true,
                observe: 'response'
            }).toPromise().then(response => {

                // workaround a 204 del servidor en lugar de arreglo vacío
                if (response.status == 204) {
                    resolve([]);
                    return;
                }

                let json = (response.body as any).viaje;
                resolve(Viaje.fromPlainObjectArray(json));

            }).catch(reason => {
                reject(reason);
            });
        })
    }

    obtenerViajes(viajesAbiertos = true, viajesCerrados = false, admin = false) {
        return new Promise<Viaje[]>((resolve, reject) => {
            this.http.get(API_URL + 'viajes', {
                params: { notclosed: '' + viajesAbiertos, closed: '' + viajesCerrados, admin: '' + admin },
                withCredentials: true,
                observe: 'response'
            }).toPromise().then(response => {

                // workaround a 204 del servidor en lugar de arreglo vacío
                if (response.status == 204) {
                    resolve([]);
                    return;
                }

                let json = (response.body as any).viaje;
                resolve(Viaje.fromPlainObjectArray(json));

            }).catch(reason => {
                reject(reason);
            });
        });
    }

    crearViaje(viaje: Viaje): Promise<Viaje> {
        return new Promise<Viaje>((resolve, reject) => {
            this.http
                .post(API_URL + 'viajes', { viaje: removeNullProperties(viaje) }, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(response => {
                    let json = (response.body as any).viaje;
                    resolve(Viaje.fromPlainObject(json));
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    actualizarViaje(noTrayecto: string, viaje: Viaje): Promise<Viaje> {
        return new Promise<Viaje>((resolve, reject) => {
            this.http
                .put(API_URL + 'viajes/' + noTrayecto, { viaje: viaje }, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(response => {
                    let json = (response.body as any).viaje;
                    resolve(Viaje.fromPlainObject(json));
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    eliminarViaje(noTrayecto: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http
                .delete(API_URL + 'viajes/' + noTrayecto, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(response => {
                    resolve('OK');
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    // --------------------------------------------

    solicitarAutorizacion(noTrayecto: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http
                .put(API_URL + 'viajes/' + noTrayecto + '/estatus', 'Por Autorizar', { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(response => {
                    let json = (response.body as any).result;
                    resolve(json);
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    rechazarViajePorCeco(noTrayecto, comentarios) {
        return this.http
            .put(API_URL + 'viajes/autorizadorcencos/viaje/' + noTrayecto + '/rechazar', '', {
                withCredentials: true, observe: 'response', params: { comentarios: comentarios }
            }).toPromise();
    }

    aprobarViajePorCeco(noTrayecto) {
        return this.http
            .put(API_URL + 'viajes/autorizadorcencos/viaje/' + noTrayecto + '/aprobacion', '', {
                withCredentials: true, observe: 'response', params: {}
            })
            .toPromise();
    }

    rechazarViajeAutCC(noTrayecto, comentarios) {
        return this.http
            .put(API_URL + 'viajes/autorizadorcencos-cc/viaje/' + noTrayecto + '/rechazar', '', {
                withCredentials: true, observe: 'response', params: { comentarios: comentarios }
            }).toPromise();
    }

    aprobarViajeAutCC(noTrayecto) {
        return this.http
            .put(API_URL + 'viajes/autorizadorcencos-cc/viaje/' + noTrayecto + '/aprobacion', '', {
                withCredentials: true, observe: 'response', params: {}
            }).toPromise();
    }

    // http://187.237.62.196:8080/SistemaContabilidad/viajes/185/estatus?fecha_cont=2018-10-05T05:00:00.000Z
    terminarAprobacion(noTrayecto: string, estatus: string): Promise<any> {

        // ES PRACTICAMENTE EL MISMO METODO DE ARRIBA, A LO MEJOR VALDRIA LA PENA ABSTRAERLOS LUEGO 

        let fecha_cont = safeToISOString(new Date());

        return new Promise<any>((resolve, reject) => {
            this.http
                .put(API_URL + 'viajes/' + noTrayecto + '/estatus', estatus, {
                    withCredentials: true, observe: 'response', params: { fecha_cont: fecha_cont }
                })
                .toPromise()
                .then(response => {
                    let json = (response.body as any).result;
                    resolve(json);
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    // --------------------------------------------

    obtenerReporteTotalizador(params: ReporteTotalizadorParams): Promise<ReporteTotalizadorRow[]> {

        let search = {};
        console.log(params);
        for (let property in params) {
            if (typeof params[property] == 'function') continue;
            if (!params[property]) continue;
            search[property] = params[property];
        }
        if (params.fechaCont != null)
            search['fechaCont'] = '"' + params.fechaCont.toJSON().substr(0, 10) + '"';
        if (params.fechaContFin != null)
            search['fechaContFin'] = '"' + params.fechaContFin.toJSON().substr(0, 10) + '"';
        if (params.usuarios != null && Array.isArray(params.usuarios) && params.usuarios.length > 0) {
            let str = "";
            params.usuarios.forEach(u => str = str + ',"' + u + '"');
            str = str.substr(1);
            search['usuarios'] = str;
        }
        console.log(search);

        return new Promise((ok, err) => {
            this.http.get(API_URL + 'viajes/reporteTotalizadorSencha', { withCredentials: true, params: search, observe: 'response' })
                .toPromise()
                .then(r => {
                    let row = (r.body as any).row;
                    if (!Array.isArray(row)) row = [row];
                    ok(row);
                }).catch(r => err(r));
        });
    }

    cambiarFecha(nombre: string, valor: string): Promise<any> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'config/set?nombre=' + nombre + '&valor=' + valor, { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => {
                resolve((r.body as any).result);
            }).catch(r => { reject(r); }));
    }

    obtenerConfig(): Promise<any> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'config?page=1&start=0&limit=25', { withCredentials: true, observe: 'response' })
            .toPromise().then(r => { resolve((r.body as any).propiedad); }).catch(r => { reject(r); }));
    }

    enviarTiposViaje(): Promise<HttpResponse<Object>> {
        return new Promise((resolve, reject) => {
            this.http.get(API_URL + 'viajes/job/run', { withCredentials: true, observe: 'response', responseType: 'text' })
                .toPromise().then(r => {
                    resolve(r);
                    console.log(r);
                })
                .catch(r => {
                    reject(r);
                })
        });
    }
}


export class ReporteTotalizadorParams {

    area: number = null;
    tipo: number = null;
    clase: number = null;
    cuenta: string = null;
    trayecto: number = null;
    fechaCont: Date = null;
    fechaContFin: Date = null;
    destino: string = null;
    centroCosto: string = null;
    sociedad: string = null;
    usuarios: string[] = null;

    setBadFieldsToNull(): void {
        if (Number.isNaN(this.area)) this.area = null;
        if (Number.isNaN(this.tipo)) this.tipo = null;
        if (Number.isNaN(this.clase)) this.clase = null;
        if (Number.isNaN(this.trayecto)) this.trayecto = null;

        if (this.cuenta == '') this.cuenta = null; else this.cuenta = '"' + this.cuenta + '"';
        if (this.destino == '') this.destino = null; else this.destino = '"' + this.destino + '"';
        if (this.sociedad == '') this.sociedad = null; else this.sociedad = '"' + this.sociedad + '"';
        if (this.centroCosto == '') this.centroCosto = null; else this.centroCosto = '"' + this.centroCosto + '"';

        if (Number.isNaN(this.fechaCont.getTime())) this.fechaCont = null;
        if (Number.isNaN(this.fechaContFin.getTime())) this.fechaContFin = null;

        if (this.usuarios.length == 0) this.usuarios = null;
    }
}

export class ReporteTotalizadorRow {

    NUMEMP: number;
    SOCIEDAD: string;
    AREA: string;
    TIPGAS: string;
    CLAGAS: string;
    TOTAL: number;
    SUBTOTAL: number;
    IVA: number;
    ISR: number;
    ISH: number;
    TUA: number;
    IEPS: number;
    MONEDA: string;
    INDIVA: string;
    CTACON: number;
    DEDUCI: string;
    RFCEMI: string;
    UUID: string;
    FECOMP: string;
    FECONT: string;
    NUMTRA: number;
    CENCOS: string;
    ESQVJE: string;
    FECINI: string;
    FECFIN: string;
    DEST: string;
    SALIDA: string;
    MOTIVO: string;
    SEGREGACION: number;
    SEGR_CENCOS: string;
    REPETIDO: boolean;

}