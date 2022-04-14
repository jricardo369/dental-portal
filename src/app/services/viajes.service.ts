import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from '../app.config';
import { Solicitud } from 'src/model/solicitud';
import { Comprobante } from './../../model/comprobante';
import { Alerta } from 'src/model/alerta';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ViajesService {

    constructor(private http: HttpClient) { }

    getDescargaFactura(idSolicitud: string): Observable<Blob> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
        //   Authorization: this.token
        });
        const options = {
            headers: httpHeaders,
            responseType: 'blob' as 'json'
        };
        // const body = { IdContratoDocumento: idContratoDocumento };
        return this.http.get<any>(
            API_URL + 'reportes-pdf/pdf-solicitud/' + idSolicitud,
            options
        );
    }

    validarXML(archivoxml: File) {
        let mp = new FormData();
        mp.append('xml', archivoxml, archivoxml.name);

        return this.http
            .post(API_URL + 'viaticos-usuario/valida-cfdi', mp,
            {
                //withCredentials: true,
                observe: 'response'
            })
            .toPromise();
    }

    crearComprobante(noSolicitud: number, comprobante: Comprobante, archivopdf: File, archivoxml: File) {
        let mp = new FormData();
        mp.append('comprobante', JSON.stringify(comprobante));
        if (archivopdf != null) mp.append('pdf', archivopdf, archivopdf.name);
        else mp.append("pdf", new Blob());
        if (archivoxml != null) mp.append('xml', archivoxml, archivoxml.name);
        else mp.append("xml", new Blob());

        return new Promise<any>((resolve, reject) => {
            this.http
                .post(API_URL + 'viaticos-usuario/solicitudes-de-viaticos/' + noSolicitud + '/comprobantes', mp,
                {
                    //withCredentials: true,
                    observe: 'response'
                    // headers: new HttpHeaders().append('Content-Type', 'multipart/form-data').append('Authorization', localStorage.getItem('auth_token'))
                    //headers: new HttpHeaders().set('Content-Type', 'multipart/form-data').set('Authorization',  localStorage.getItem('auth_token'))
                })
                .toPromise()
                .then(response => {
                    resolve(response);
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    actualizarComprobante(idComprobanteViatico: string, comprobante: Comprobante): Promise<Comprobante> {
        return new Promise<Comprobante>((resolve, reject) => {
            this.http
                .put(API_URL + 'viaticos-usuario/comprobantes-de-viaticos/' + idComprobanteViatico, comprobante,
                {
                    withCredentials: true,
                    observe: 'response',
                    headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
                })
                .toPromise()
                .then(response => {
                    resolve(response.body as Comprobante);
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    eventoNoAplica(idComprobanteViatico: number, aprobacionNoAplica: boolean): Promise<any> {
        let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
        params = params.set('aprobacion', aprobacionNoAplica ? '1' : '0');
        return this.http
            .put(API_URL + 'viaticos-usuario/comprobantes-de-viaticos/' + idComprobanteViatico, '',
            {
                params: params,
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            }).toPromise();
    }

    obtenerComprobante(idComprobante: number): any {
        return new Promise<any>((resolve, reject) => {
            this.http
                .get(API_URL + 'viaticos-usuario/comprobantes-de-viaticos/' + idComprobante,
                {
                    withCredentials: true,
                    observe: 'response',
                    headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
                })
                .toPromise()
                .then(response => {
                    resolve(response.body as Comprobante);
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    eliminarComprobante(idComprobante: number): any {
        return new Promise<any>((resolve, reject) => {
            this.http
                .delete(API_URL + 'viaticos-usuario/comprobantes-de-viaticos/' + idComprobante,
                {
                    withCredentials: true,
                    observe: 'response',
                    headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
                })
                .toPromise()
                .then(response => {
                    resolve('OK');
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    // *********************************************

    obtenerViaje(noSolicitud: string): Promise<Solicitud> {
        return new Promise<Solicitud>((resolve, reject) => {
            this.http
                .get(API_URL + 'viaticos-usuario/solicitudes-de-viaticos/' + noSolicitud,
                {
                    withCredentials: true,
                    observe: 'response',
                    headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
                })
                .toPromise()
                .then(response => {
                    resolve(response.body as Solicitud);
                }).catch(reason => reject(reason));
        });
    }

    obtenerAlertasPorSolicitud(noSolicitud: string): Promise<Alerta[]> {
        return new Promise<Alerta[]>((resolve, reject) => {
            this.http
                .get(API_URL + 'avisos/' + noSolicitud,
                {
                    withCredentials: true,
                    observe: 'response',
                    headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
                })
                .toPromise()
                .then(response => {
                    resolve(response.body as Alerta[]);
                }).catch(reason => reject(reason));
        });
    }

    descargar(noComprobante: string, formato: string): Promise<any> {
        let Archivo_URL: string = "";
        switch (formato) {
            case 'pdf':
                Archivo_URL = 'archivo/pdf/';
                break;
            case 'xml':
                Archivo_URL = 'archivo/xml/';
                break;
            case 'zip':
                Archivo_URL = 'archivo/';
                break;
            default:
                break;
        }
        return new Promise<any>((resolve, reject) => {
            this.http
                .get(API_URL + Archivo_URL + noComprobante,
                {
                    withCredentials: true,
                    observe: 'response',
                    responseType: 'arraybuffer',
                    headers: new HttpHeaders().append('Content-Type', 'application/octet-stream').append('Authorization', localStorage.getItem('auth_token'))
                })
                .toPromise()
                .then(response => {
                    resolve(response.body);
                }).catch(reason => reject(reason));
        });
    }

    consultarSolicitudesDeUsuarioPorEstatus(empleado: string, estatus: string): Promise<Solicitud[]> {
        let params = new HttpParams();
        params = params.set('estatus', estatus);
        
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'viaticos-usuario/' + empleado,
            {
                params: params,
                withCredentials: true,
                observe: 'body',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
            })
            .toPromise()
            .then(response => {
                resolve(response as Solicitud[]);
            })
            .catch(reason => reject(reason))
        );
    }

    consultarSolicitudesDeUsuarioPorEmpresaYEstatus(empresas: string, estatus: string, fechaI: string, fechaF: string, director: boolean): Promise<Solicitud[]> {
        let params = new HttpParams();
        params = params.set('empresas', empresas);
        params = params.set('estatus', estatus);
        params = params.set('usuario', localStorage.getItem('usuario'));
        if (director) {
            params = params.set('fechaI', fechaI);
            params = params.set('fechaF', fechaF);
        }
        
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'viaticos-usuario/solicitudes-de-viaticos',
            {
                params: params,
                withCredentials: true,
                observe: 'body',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
            })
            .toPromise()
            .then(response => {
                resolve(response as Solicitud[]);
            })
            .catch(reason => reject(reason))
        );
    }
//#region SOLICITUDES PENDIENTES
    consultarSolicitudesPendientes(user: string): Promise<Solicitud[]> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'autorizaciones/usuarios/' + user+'/solicitudes-pendientes-autorizar',
            {
                withCredentials: true,
                observe: 'body',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
            })
            .toPromise()
            .then(response => {
                resolve(response as Solicitud[]);
            })
            .catch(reason => reject(reason))
        );
    }

    consultarSolicitudPendiente(user: string): Promise<Solicitud[]> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'autorizaciones/usuarios/' + user+'/solicitudes-pendientes-autorizar',
            {
                withCredentials: true,
                observe: 'body',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
            })
            .toPromise()
            .then(response => {
                resolve(response as Solicitud[]);
            })
            .catch(reason => reject(reason))
        );
    }

    aprobarRechazar(id: string, user: string, tipo: string, motivo?: string) {
        var tok = localStorage.getItem('auth_token');
        return this.http.put(API_URL + 'autorizaciones/solicitudes-viaticos/' + id +'?usuario='+user+'&tipo='+tipo+'&motivo='+motivo,'solicitud', {
            withCredentials: true,
            observe: 'response',
            headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', tok),
        }).toPromise();
    }

//#endregion

    crearViaje(solicitud: Solicitud): Promise<Solicitud> {
        let json = {
            motivo: solicitud.motivo,
            fechaInicio: solicitud.fechaInicio,
            fechaFin: solicitud.fechaFin,
            concepto: solicitud.concepto,
            totalAnticipo: solicitud.totalAnticipo,
            numeroSolicitud: '',
            observaciones: solicitud.observaciones
        };

        return new Promise<Solicitud>((resolve, reject) => {
            this.http
                .post(API_URL + 'viaticos-usuario/' + localStorage.getItem('usuario') + '/solicitudes-de-viaticos/', json,
                {
                    withCredentials: true,
                    observe: 'response',
                    headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
                })
                .toPromise()
                .then(response => {
                    resolve(response.body as Solicitud);
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    actualizarViaje(noTrayecto: string, solicitud: Solicitud): Promise<Solicitud> {
        solicitud.totalAnticipo = solicitud.totalAnticipo || 0;
        solicitud.totalComprobado = solicitud.totalComprobado || 0;
        
        return new Promise<Solicitud>((resolve, reject) => {
            this.http
                .put(API_URL + 'viaticos-usuario/solicitudes-de-viaticos/' + noTrayecto, solicitud,
                {
                    withCredentials: true,
                    observe: 'response',
                    headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
                })
                .toPromise()
                .then(response => {
                    resolve(response.body as Solicitud);
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    eliminarViaje(noTrayecto: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http
                .delete(API_URL + 'viaticos-usuario/solicitudes-de-viaticos/' + noTrayecto,
                {
                    withCredentials: true,
                    observe: 'response',
                    headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
                })
                .toPromise()
                .then(() => {
                    resolve('OK');
                }).catch(reason => {
                    reject(reason);
                });
        });
    }

    // --------------------------------------------

    solicitarAutorizacion(noTrayecto: string): Promise<any> {
        return this.http
            .put(API_URL + 'viaticos-usuario/solicitudes-de-viaticos/' + noTrayecto + '/aprobacion','solicitar aprobacion',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise();
    }

    // -----------------Autorizaciones por contador --- Inicio ------------

    solicitarAutorizacionDeComprobacionPorContador(numeroSolicitud: string) {
        return this.http
            .put(API_URL + 'viaticos-usuario/solicitudes-de-viaticos/'+ numeroSolicitud +'/comprobante-aprobacion', '',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise();
    }

    autorizarRechazarComprobantePorContador(idComprobanteViatico: string, tipo: string) {
        let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
        params = params.set('tipo', tipo);
        if (tipo == 'RECHAZAR') {
            params = params.set('motivo', tipo);
        }
        return this.http
            .put(API_URL + 'aprobaciones/comprobantes-de-viaticos/comprobante/' + idComprobanteViatico, '',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
                params: params
            })
            .toPromise();
    }

    autorizarRechazarSolicitudPorContador(numeroSolicitud: string, tipo: string, motivo?: string) {
        let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
        params = params.set('tipo', tipo);
        params = params.set('motivo', motivo);
        return this.http
            .put(API_URL + 'aprobaciones/comprobantes-de-viaticos/solicitud/' + numeroSolicitud, '',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
                params: params
            })
            .toPromise();
    }

    autorizarRechazarSolicitudesPorContador(numerosSolicitudes: string, tipo: string, motivo?: string) {
        let params = new HttpParams();
        params = params.set('solicitudes', numerosSolicitudes);
        params = params.set('usuario', localStorage.getItem('usuario'));
        params = params.set('tipo', tipo);
        params = params.set('motivo', motivo);
        return this.http
            .put(API_URL + 'aprobaciones/comprobantes-de-viaticos/solicitudes', '',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
                params: params
            })
            .toPromise();
    }

    // -----------------Autorizaciones por contador --- Fin ---------------

    
}