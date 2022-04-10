import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CajaChica } from '../../model/caja-chica';
import { API_URL } from '../app.config';
import { SolicitudDeContabilizacionDeCajaChica } from '../../model/solicitud-de-contabilizacion-de-caja-chica';
import { SapSociedad } from '../../model/sap-sociedad';
import { GastoDeSolicitudDeContabilizacionDeCajaChica } from '../../model/gasto-de-solicitud-de-contabilizacion-de-caja-chica';

export interface CrearGastoDeSolicitudParams {

    operacionContable: string;  //, required = true) String operacion,
    total: number;  //, required = true) String total,
    textoGastoCaja: string;  //, required = true) String texto,
    asignacionGastoCaja: string;  //, required = true) String asignacion,
    ceco: string;  //, required = false) String centroDeCosto,
    ordenGastoCaja: string;  //, required = false) String orden,
    cebeGastoCaja: string;  //, required = false) String centroDeBeneficio,
    pepGastoCaja: string;  //, required = false) String elementoPep,
    grafoGastoCaja: string;  //, required = false) String grafo,
    operacionGrafo: string;  //, required = false) String operacionGrafo,
    subtotal: number;  //, required = true) String subtotal,
    iva: number;  //, required = false) String iva,
    isr: number;  //, required = false) String isr,
    ish: number;  //, required = false) String ish,
    tua: number;  //, required = false) String tua,
    ieps: number;  //, required = false) String ieps,
    archivoxml: File;  //, required = false) Attachment xml,
    archivopdf: File;  //, required = false) Attachment pdf
}

@Injectable({
    providedIn: 'root'
})
export class CajasChicasService {

    constructor(private http: HttpClient) { }

    cajas: CajaChica[] = [];
    yaHaSidoInvocadoElServicioDeObtenerTodasLasCajas = false;

    actualizarSolicitudDeContabilizacionDeCajaChica(id: number, e: SolicitudDeContabilizacionDeCajaChica): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http
                .put(API_URL + 'contabilizacion-caja-chica/' + id, { solicitudDeContabilizacionDeCajaChica: e },
                    { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => resolve(true))
                .catch(err => reject(err));
        });
    }

    actualizarEstatusGasto(id: number, gastoId: number, estatus: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let params = {};
            this.http
                .put(API_URL + 'contabilizacion-caja-chica/' + id + '/gastos/' + gastoId + '/estatus', estatus,
                    { withCredentials: true, observe: 'response', params: params })
                .toPromise()
                .then(r => resolve(true))
                .catch(err => reject(err));
        });
    }

    terminarAprobacion(id: number, texto: string = ' ', autorizador = false, contabilizador = false): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let params = { texto: texto };
            if (autorizador) params['autorizador'] = true;
            if (contabilizador) params['contabilizador'] = true;
            this.http
                .put(API_URL + 'contabilizacion-caja-chica/' + id + '/estatus', 'Terminar Aprobación',
                    { withCredentials: true, observe: 'response', responseType: 'text', params: params })
                .toPromise()
                .then(r => resolve(r.body))
                .catch(err => reject(err));
        });
    }

    solicitarAprobacion(id: number, texto: string = ' '): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let params = { texto: texto };
            this.http
                .put(API_URL + 'contabilizacion-caja-chica/' + id + '/estatus', 'Por Autorizar',
                    { withCredentials: true, observe: 'response', params: params })
                .toPromise()
                .then(r => resolve(true))
                .catch(err => reject(err));
        });
    }

    eliminarGasto(id: number, gastoId: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http
                .delete(API_URL + 'contabilizacion-caja-chica/' + id + '/gastos/' + gastoId, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => resolve(true))
                .catch(err => reject(err));
        });
    }

    crearGastoDeSolicitud(id: number, i: CrearGastoDeSolicitudParams): Promise<GastoDeSolicitudDeContabilizacionDeCajaChica> {

        let d = new FormData();
        d.append('name', "value");
        if (i.operacionContable != null) d.append("operacionContable", i.operacionContable);
        if (i.total != null) d.append("total", '' + i.total);
        if (i.textoGastoCaja != null) d.append("textoGastoCaja", i.textoGastoCaja);
        if (i.asignacionGastoCaja != null) d.append("asignacionGastoCaja", i.asignacionGastoCaja);
        if (i.ceco != null) d.append("ceco", i.ceco);
        if (i.ordenGastoCaja != null) d.append("ordenGastoCaja", i.ordenGastoCaja);
        if (i.cebeGastoCaja != null) d.append("cebeGastoCaja", i.cebeGastoCaja);
        if (i.pepGastoCaja != null) d.append("pepGastoCaja", i.pepGastoCaja);
        if (i.grafoGastoCaja != null) d.append("grafoGastoCaja", i.grafoGastoCaja);
        if (i.operacionGrafo != null) d.append("operacionGrafo", i.operacionGrafo);
        if (i.subtotal != null) d.append("subtotal", '' + i.subtotal);
        if (i.iva != null) d.append("iva", '' + i.iva);
        if (i.isr != null) d.append("isr", '' + i.isr);
        if (i.ish != null) d.append("ish", '' + i.ish);
        if (i.tua != null) d.append("tua", '' + i.tua);
        if (i.ieps != null) d.append("ieps", '' + i.ieps);
        if (i.archivoxml != null) d.append("archivoxml", i.archivoxml);
        if (i.archivopdf != null) d.append("archivopdf", i.archivopdf);

        return new Promise<GastoDeSolicitudDeContabilizacionDeCajaChica>((resolve, reject) => {
            this.http
                .post(API_URL + 'contabilizacion-caja-chica/' + id + '/gastos', d, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => {
                    let body = r.body as any;
                    resolve(GastoDeSolicitudDeContabilizacionDeCajaChica.fromPlainObject((body as any)
                        .solicitudDeContabilizacionDeCajaChica));
                })
                .catch(err => reject(err));
        });
    }

    eliminarSolicitud(id: number): Promise<SolicitudDeContabilizacionDeCajaChica> {
        return new Promise<SolicitudDeContabilizacionDeCajaChica>((resolve, reject) => {
            this.http
                .delete(API_URL + 'contabilizacion-caja-chica/' + id, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => resolve(null))
                .catch(err => reject(err));
        });
    }

    crearSolicitud(solicitud: SolicitudDeContabilizacionDeCajaChica): Promise<SolicitudDeContabilizacionDeCajaChica> {
        return new Promise<SolicitudDeContabilizacionDeCajaChica>((resolve, reject) => {
            this.http
                .post(API_URL + 'contabilizacion-caja-chica',
                    { solicitudDeContabilizacionDeCajaChica: this.clean(solicitud) },
                    { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => {
                    let body = r.body as any;
                    resolve(SolicitudDeContabilizacionDeCajaChica.fromPlainObject((body as any).solicitudDeContabilizacionDeCajaChica));
                })
                .catch(err => reject(err));
        });
    }

    obtenerGastosSolicitudDeContabilizacionDeCajachica(id: number): Promise<GastoDeSolicitudDeContabilizacionDeCajaChica[]> {
        return new Promise<GastoDeSolicitudDeContabilizacionDeCajaChica[]>((resolve, reject) => {
            this.http
                .get(API_URL + 'contabilizacion-caja-chica/' + id + '/gastos', { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => {
                    let body = r.body as any;
                    resolve(GastoDeSolicitudDeContabilizacionDeCajaChica.fromPlainObjectArray(body.gastoDeSolicitudDeContabilizacionDeCajaChica));
                })
                .catch(err => reject(err));
        });
    }

    obtenerSolicitudDeContabilizacionDeCajachica(id: number, incluirGastos = false, incluirBitacora = false): Promise<SolicitudDeContabilizacionDeCajaChica> {
        let params = {};
        if (incluirGastos) params['gastos'] = true;
        if (incluirBitacora) params['bitacora'] = true;
        return new Promise<SolicitudDeContabilizacionDeCajaChica>((resolve, reject) => {
            this.http
                .get(API_URL + 'contabilizacion-caja-chica/' + id, { withCredentials: true, observe: 'response', params: params })
                .toPromise()
                .then(r => {
                    let body = r.body as any;
                    resolve(SolicitudDeContabilizacionDeCajaChica.fromPlainObject(body.solicitudDeContabilizacionDeCajaChica));
                })
                .catch(err => reject(err));
        });
    }

    obtenerSolicitudesDeContabilizacionDeCajachica(
        noCaja: string,
        sociedad: string,
        contabilizados = true,
        autorizador = false,
        contabilizador = false
    ): Promise<SolicitudDeContabilizacionDeCajaChica[]> {
        let params: any = {};
        if (noCaja) params.cajachica = noCaja;
        if (sociedad) params.sociedad = sociedad;
        if (contabilizados) params.contabilizados = contabilizados;
        if (autorizador) params.autorizador = autorizador;
        if (contabilizador) params.contabilizador = contabilizador;
        return new Promise<SolicitudDeContabilizacionDeCajaChica[]>((resolve, reject) => {
            this.http
                .get(API_URL + 'contabilizacion-caja-chica', { withCredentials: true, observe: 'response', params: params })
                .toPromise()
                .then(r => {
                    let body = r.body as any;
                    resolve(SolicitudDeContabilizacionDeCajaChica.fromPlainObjectArray(body.solicitudDeContabilizacionDeCajaChica));
                })
                .catch(err => reject(err));
        });
    }

    obtenerSociedadesDeCajaChica(noCaja: string): Promise<SapSociedad[]> {
        return new Promise<SapSociedad[]>((resolve, reject) => {
            this.http
                .get(API_URL + "cajachica/" + noCaja + "/sociedades", { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => {
                    let sapSociedad = (r.body as any).sapSociedad
                    resolve(sapSociedad);
                })
                .catch(err => reject(err));
        });
    }

    obtenerCajasChicas(usuario: string = null): Promise<CajaChica[]> {

        let url = API_URL + 'cajachica?activeonly=false';
        if (usuario) url = url + '&user=' + usuario;

        return new Promise((resolve, reject) => this.http
            .get(url, { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => {

                // ESTO ESTA MAL Y NO DEBERÍA SER HECHO POR NADIE,
                // SI EL ARREGLO ES DE UNA SOLA POSICION SOLO REGRESA EL ELEMENTO (EN LUGAR DE UN ARREGLO CON ESE ELEMENTO)
                this.cajas = (r.body as any).cajaChica;
                this.cajas.forEach(c => {
                    if (c.sociedades != null) {
                        if (!Array.isArray(c.sociedades)) {
                            c.sociedades = [c.sociedades];
                        }
                    }
                })

                this.yaHaSidoInvocadoElServicioDeObtenerTodasLasCajas = true;

                resolve(this.cajas);
            })
            .catch(r => reject(r))
        );


    }

    obtenerCajaChica(idcajachica: string): Promise<CajaChica> {
        let a;
        let q = this.cajas.length;
        return new Promise((resolve, reject) => {

            // ESTO ESTA MAL Y VAMOS A CORREGIRLO CUANDO FIXEEMOS EL API,
            // COMO VA A SER POSIBLE QUE TENGAMOS QUE USAR UN CACHE DE LAS CAJAS QUE HAY,
            // QUE PENA DE VERDAD
            let something = () => {
                let out = this.cajas.find(e => e.noCaja == idcajachica);
                resolve(out ? out : null);
            }
            if (this.yaHaSidoInvocadoElServicioDeObtenerTodasLasCajas) something();
            else this.obtenerCajasChicas().then(() => something());
        });
    }

    eliminar(idcajachica: string): Promise<any> {
        //let d = this.cajaschicas.findIndex(cc => cc.noCaja == idcajachica);
        //this.cajaschicas.splice(d, 1);

        return new Promise((resolve, reject) => {
            this.http
                .delete(API_URL + 'cajachica/' + idcajachica, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => {
                    resolve((r.body as any).result);
                })
                .catch(r => {
                    reject(r);
                })
        });

    }

    crear(m: CajaChica): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(API_URL + 'cajachica', { cajaChica: m }, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => {
                    resolve((r.body as any).cajaChica);
                })
                .catch(r => reject(r))
        });

    }

    editar(c: CajaChica): Promise<any> {


        return new Promise((resolve, reject) => {
            this.http
                .put(API_URL + 'cajachica/' + c.noCaja, { cajaChica: c }, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => {
                    resolve((r.body as any).cajaChica);
                })
                .catch(r => {
                    reject(r);

                })
        });
    }

    clean(obj: any) {
        for (let key in obj)
            if (obj[key] == null)
                delete obj[key];
        return obj;
    }




}
