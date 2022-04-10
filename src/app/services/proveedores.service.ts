import { Injectable } from '@angular/core';
import { OrdenCompra } from '../../model/orden-compra';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_URL } from '../app.config';
import { EntradaMercancia } from '../../model/entrada-mercancia';

class Posicion {

    idOrdenCompra: string;
    noPosicion: string;
    cantidad: number;
    ejerDocMatnr: string;
    fecha_cont: string;
    idMaterial: string;
    importeOC: number;
    indicadorIva: string;
    posDocMatnr: string;
    precioUnitarioOC: number;
    referencia: string;
    unidad: string;

    clase_cond: string;
    doc_ref: string;
    poscicion_doc: number;
    denominacion: string;
    texto_breve: string;
    orderpr_un: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProveedoresService {

    obtenerXmlObligatorio(numeroDeProveedor: string): Promise<boolean> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'Proveedores/ZVIMRFCLOGON/' + numeroDeProveedor, {
                withCredentials: true,
                observe: 'response',
                responseType: 'text'
            })
            .toPromise()
            .then(response => resolve(('' + response.body) == 'X'))
            .catch(reason => reject(reason)))
    }

    constructor(private http: HttpClient) {

    }

    obtenerOrdenesDeCompra(
        numeroDeProveedor: string,
        pagina: number,
        diasAtras: number,
        tipoDeOperacion: string,
        ordenDeCompra: string = undefined
    ): Promise<OrdenCompra[]> {
        let params = {
            num_proveedor: numeroDeProveedor,
            tipo_de_operacion: tipoDeOperacion,
        };
        if (pagina) params['pagina'] = pagina;
        if (diasAtras) params['dias_atras'] = diasAtras;
        if (ordenDeCompra) params['orden_de_compra'] = ordenDeCompra;
        return new Promise<OrdenCompra[]>((resolve, reject) => {
            this.http
                .get(API_URL + 'Proveedores/OrdenesDeCompra', {
                    withCredentials: true,
                    params: params,
                    observe: 'response'
                })
                .toPromise()
                .then(response => resolve(OrdenCompra.fromPlainObjectArray((response.body as any).ordenCompra)))
                .catch(reason => reject(reason));
        });
    }

    obtenerEntradasDeMercancia(
        numeroDePedido: string,
        tipoDeOperacion: string
    ) {
        return new Promise<OrdenCompra[]>((resolve, reject) => {
            this.http
                .get(API_URL + 'Proveedores/EntradasDeMercancia', {
                    withCredentials: true,
                    params: {
                        num_pedido: numeroDePedido,
                        tipo_op: tipoDeOperacion
                    },
                    observe: 'response',
                    responseType: 'text'
                })
                .toPromise()
                .then(response => {

                    if (response.status == 204) {
                        let mock = new HttpErrorResponse({ status: 401, error: 'Necesita iniciar sesión' });
                        reject(mock);
                        return;
                    }

                    let dumbString = response.body as string;
                    let jsonString = dumbString.substr(5, dumbString.length - 7);
                    let json = JSON.parse(jsonString);
                    resolve(EntradaMercancia.fromPlainObjectArray(json.results));
                })
                .catch(reason => reject(reason));
        });
    }

    enviarFacturaNotaCredito(
        archivoPdf: File,
        archivoXml: File,
        numeroDeOc: string = null,
        tipoDeOperacion: string = null) {

        let formData = new FormData();
        // formData.append('num_ord_comp', archivoPdf);
        // formData.append('tipo_op', archivoPdf);

        formData.append('pdf', archivoPdf);
        if (archivoXml == null) formData.append('xml', new Blob());
        else formData.append('xml', archivoXml);
        if (numeroDeOc) formData.append('num_ord_comp', numeroDeOc);
        if (tipoDeOperacion) formData.append('tipo_op', tipoDeOperacion);

        return new Promise((resolve, reject) => {
            this.http
                .post(API_URL + 'Proveedores/EnviarFacturaNotaCredito', formData, {
                    observe: 'response',
                    withCredentials: true,
                    params: {
                        id: new Date().getTime().toFixed()
                    }
                })
                .toPromise()
                .then(response => {
                    /*
                    if ((response.body as any).result) {
                        let mock = new HttpErrorResponse({ status: 400, error: (response.body as any).result.message });
                        reject(mock);
                        return;
                    }
                    */
                    console.log(response);
                    resolve(response);
                })
                .catch(reason => {
                    alert("B");
                    reject(reason);
                })
        })
    }

    enviarFacturaPO(
        numeroDeProveedor: string,
        sociedad: string,
        archivoXml: File,
        archivoPdf: File,
        tipo_op: string,
        ordenDeCompra: OrdenCompra,
        entradasDeMercancia: EntradaMercancia[]
    ) {

        let cabeceraOrdenDeCompra = {
            idOrdenCompra: ordenDeCompra.num_doc_compras,
            condPago: ordenDeCompra.clave_cond, // Revisar si es el correcto
            idProveedor: '' + numeroDeProveedor,
            moneda: ordenDeCompra.clave_moneda,
            sociedad: sociedad,
            // ----------------------------------------------------------------
            flag: ordenDeCompra.flag,
            importeFactura: ordenDeCompra.imp_fact,
            tipoDeImputacion: ordenDeCompra.tipo_imputacion,
            totalOc: ordenDeCompra.valor_neto,
            indicadorWebre: ordenDeCompra.ind_em
        };

        let posicionesOrdenDeCompra: Posicion[] = entradasDeMercancia.map(e => {
            let o = new Posicion();
            o.cantidad = e.cantidad;
            o.clase_cond = e.clase_cond;
            o.denominacion = e.denominacion;
            o.doc_ref = e.doc_ref;
            o.ejerDocMatnr = '' + e.ejercicio; // <-
            o.fecha_cont = e.fecha_cont;
            o.idMaterial = e.num_doc_material; // <-
            o.idOrdenCompra = e.num_doc_comp; // <-
            o.importeOC = e.importe; // <-
            o.indicadorIva = e.ind_iva; // <-
            o.noPosicion = '' + e.num_pos_doc_comp; // <-
            o.orderpr_un = e.orderpr_un;
            o.poscicion_doc = e.poscicion_doc;
            o.posDocMatnr = '' + e.num_apunte; // adiviné
            o.precioUnitarioOC = e.precio_neto; // <-
            o.referencia = e.num_doc_ref; // <-
            o.unidad = e.unidad;
            o.texto_breve = e.texto_breve;
            return o;
        });


        let formData = new FormData();

        if (archivoXml != null) {
            formData.append('archivoxml', archivoXml);
        } else {
            formData.append('archivoxml', '');
        }

        formData.append('archivopdf', archivoPdf);
        formData.append('ordenCompra', JSON.stringify(cabeceraOrdenDeCompra));
        formData.append('entradaMercancia', JSON.stringify(posicionesOrdenDeCompra));
        formData.append('fac_oc', "M");  // M de orden de coMpra ... (así venía en sencha)
        formData.append('tipo_op', tipo_op);

        return new Promise((resolve, reject) => {
            this.http
                .post(API_URL + 'Proveedores/RecibirFacturaPO', formData, { observe: 'response', withCredentials: true })
                .toPromise()
                .then(response => {
                    if ((response.body as any).result) {
                        let mock = new HttpErrorResponse({ status: 400, error: (response.body as any).result.message });
                        reject(mock);
                        return;
                    }
                    console.log(response);
                    resolve(response);
                })
                .catch(reason => {
                    reject(reason);
                })
        })
    }

    ZMFMM_CONSULTA_FACT(I_BUKRS, I_EBELN, I_FECHA_INI, I_FECHA_FIN, I_LIFNR, I_XBLNR, proveedor?: string) {
        let params: any = {};
        if (I_BUKRS) params.I_BUKRS = I_BUKRS;
        if (I_EBELN) params.I_EBELN = I_EBELN;
        if (I_FECHA_INI) params.I_FECHA_INI = I_FECHA_INI;
        if (I_FECHA_FIN) params.I_FECHA_FIN = I_FECHA_FIN;
        if (I_LIFNR) params.I_LIFNR = I_LIFNR;
        if (I_XBLNR) params.I_XBLNR = I_XBLNR;
        if (proveedor) params.PROVEEDOR = proveedor;
        return new Promise((resolve, reject) => {
            this.http
                .get(API_URL + '/Proveedores/ZMFMM_CONSULTA_FACT', {
                    params: params,
                    observe: 'response',
                    withCredentials: true
                })
                .toPromise()
                .then(response => {
                    resolve(response.body);
                })
                .catch(reason => {
                    reject(reason);
                })
        });
    }

    cargarFacturaFB60E(
        archivoXml: File,
        archivoPdf: File,
    ) {
        let formData = new FormData();
        formData.append('pdf', archivoPdf);
        formData.append('xml', archivoXml);

        return new Promise((resolve, reject) => {
            this.http
                .post(API_URL + 'Proveedores/EnviarFacturaFB60E', formData, {
                    observe: 'response',
                    withCredentials: true,
                    params: {
                        id: new Date().getTime().toFixed()
                    }
                })
                .toPromise()
                .then(response => {
                    console.log(response);
                    resolve(response);
                })
                .catch(reason => {
                    console.log(reason);
                    reject(reason);
                })
        })
    }
}
