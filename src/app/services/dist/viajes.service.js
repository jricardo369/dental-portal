"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReporteTotalizadorRow = exports.ReporteTotalizadorParams = exports.ViajesService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var app_config_1 = require("../app.config");
var viaje_1 = require("src/model/viaje");
var gasto_viaje_1 = require("../../model/gasto-viaje");
var tipo_gasto_1 = require("../../model/tipo-gasto");
var clase_gasto_1 = require("../../model/clase-gasto");
var ViajesService = /** @class */ (function () {
    function ViajesService(http) {
        this.http = http;
    }
    // getPDF(idSolicitud: string){
    //     const url = API_URL + 'reportes-pdf/pdf-solicitud/' + idSolicitud;
    //     const httpOptions = {
    //       'responseType'  : 'arraybuffer' as 'json'
    //        //'responseType'  : 'blob' as 'json'        //This also worked
    //     };
    //     response(this.http.get<any>(url, httpOptions));
    //     }
    ViajesService.prototype.getDescargaFactura = function (idSolicitud) {
        var httpHeaders = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        var options = {
            headers: httpHeaders,
            responseType: 'blob'
        };
        // const body = { IdContratoDocumento: idContratoDocumento };
        return this.http.get(app_config_1.API_URL + 'reportes-pdf/pdf-solicitud/' + idSolicitud, options);
    };
    ViajesService.prototype.validarXML = function (archivoxml) {
        var mp = new FormData();
        mp.append('xml', archivoxml, archivoxml.name);
        return this.http
            .post(app_config_1.API_URL + 'viaticos-usuario/valida-cfdi', mp, {
            //withCredentials: true,
            observe: 'response'
        })
            .toPromise();
    };
    ViajesService.prototype.crearComprobante = function (noSolicitud, comprobante, archivopdf, archivoxml) {
        var _this = this;
        var mp = new FormData();
        mp.append('comprobante', JSON.stringify(comprobante));
        if (archivopdf != null)
            mp.append('pdf', archivopdf, archivopdf.name);
        else
            mp.append("pdf", new Blob());
        if (archivoxml != null)
            mp.append('xml', archivoxml, archivoxml.name);
        else
            mp.append("xml", new Blob());
        return new Promise(function (resolve, reject) {
            _this.http
                .post(app_config_1.API_URL + 'viaticos-usuario/solicitudes-de-viaticos/' + noSolicitud + '/comprobantes', mp, {
                //withCredentials: true,
                observe: 'response'
                // headers: new HttpHeaders().append('Content-Type', 'multipart/form-data').append('Authorization', localStorage.getItem('auth_token'))
                //headers: new HttpHeaders().set('Content-Type', 'multipart/form-data').set('Authorization',  localStorage.getItem('auth_token'))
            })
                .toPromise()
                .then(function (response) {
                console.log(response);
                // let json = (response.body as any).result;
                resolve(response);
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.actualizarComprobante = function (idComprobanteViatico, comprobante) {
        var _this = this;
        console.log(comprobante);
        return new Promise(function (resolve, reject) {
            _this.http
                .put(app_config_1.API_URL + 'viaticos-usuario/comprobantes-de-viaticos/' + idComprobanteViatico, comprobante, {
                withCredentials: true,
                observe: 'response',
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
                .toPromise()
                .then(function (response) {
                console.log(response);
                // let json = (response.body as any).viaje;
                resolve(response.body);
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.eventoNoAplica = function (idComprobanteViatico, aprobacionNoAplica) {
        var params = new http_1.HttpParams();
        params = params.set('aprobacion', aprobacionNoAplica ? '1' : '0');
        return this.http
            .put(app_config_1.API_URL + 'viaticos-usuario/comprobantes-de-viaticos/' + idComprobanteViatico, '', {
            params: params,
            withCredentials: true,
            observe: 'response',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        }).toPromise();
    };
    ViajesService.prototype.obtenerComprobante = function (noTrayecto, idComprobante) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .get(app_config_1.API_URL + 'viaticos-usuario/comprobantes-de-viaticos/' + idComprobante, {
                withCredentials: true,
                observe: 'response',
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
                .toPromise()
                .then(function (response) {
                console.log(response);
                resolve(response.body);
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    /**
     * Se usar parar los rechazos y aprobaciones, aunque de paso modifica
     */
    ViajesService.prototype.actualizarEstatusComprobante = function (numeroDeTrayecto, idComprobante, estatus, subtotal, iva, isr, ish, ieps, tua, total) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .put(app_config_1.API_URL + 'viajes/' + numeroDeTrayecto + '/comprobantes/' + idComprobante + '/estatus', estatus, {
                withCredentials: true,
                observe: 'response',
                params: {
                    subtotal: '' + subtotal,
                    iva: '' + iva,
                    isr: '' + isr,
                    ish: '' + ish,
                    ieps: '' + ieps,
                    tua: '' + tua,
                    total: '' + total
                }
            })
                .toPromise()
                .then(function (response) {
                resolve();
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.actualizarEstatusComprobanteCeco = function (idComprobante, estatus) {
        var _this = this;
        return new Promise(function (ok, err) {
            _this.http
                .put(app_config_1.API_URL + 'viajes/autorizadorcencos/comrpobante/' + idComprobante + '/segregacion/estatus', estatus, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(function (r) { return ok(); })["catch"](function (r) { return err(r); });
        });
    };
    ViajesService.prototype.eliminarComprobante = function (idComprobante) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http["delete"](app_config_1.API_URL + 'viaticos-usuario/comprobantes-de-viaticos/' + idComprobante, {
                withCredentials: true,
                observe: 'response',
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
                .toPromise()
                .then(function (response) {
                console.log(response);
                resolve('OK');
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.obtenerTiposDeViaje = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .get(app_config_1.API_URL + 'viajes/tipos', {
                withCredentials: true,
                observe: 'response',
                params: {}
            })
                .toPromise()
                .then(function (response) {
                var json = response.body.tipoViaje;
                resolve(json);
            })["catch"](function (err) { return reject(err); });
        });
    };
    ViajesService.prototype.obtenerTiposDeGasto = function (idarea, soloActivos) {
        var _this = this;
        if (soloActivos === void 0) { soloActivos = true; }
        return new Promise(function (resolve, reject) {
            _this.http
                .get(app_config_1.API_URL + 'areas/' + idarea + '/tiposDeGasto', {
                withCredentials: true,
                observe: 'response',
                params: { activeonly: "" + soloActivos }
            })
                .toPromise()
                .then(function (response) {
                var json = response.body.tipoGasto;
                resolve(tipo_gasto_1.TipoGasto.fromPlainObjectArray(json));
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.obtenerCentrosDeCosto = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .get(app_config_1.API_URL + 'viajes/responsables/centro-de-costos', {
                withCredentials: true,
                observe: 'response',
                params: {}
            })
                .toPromise()
                .then(function (response) {
                var json = response.body.responsablesCentro;
                resolve(json.map(function (e) { return e.centro_costo; }));
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.obtenerClasesDeGasto = function (id, soloActivos) {
        var _this = this;
        if (soloActivos === void 0) { soloActivos = true; }
        return new Promise(function (resolve, reject) {
            _this.http
                .get(app_config_1.API_URL + 'viajes/tiposDeGasto/' + id + '/clasesdegastos', {
                withCredentials: true,
                observe: 'response',
                params: { activeonly: "" + soloActivos }
            })
                .toPromise()
                .then(function (response) {
                var json = response.body.claseGastoViaje;
                resolve(clase_gasto_1.ClaseGasto.fromPlainObjectArray(json));
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    // *********************************************
    ViajesService.prototype.obtenerComprobantesDeViaje = function (noTrayecto) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .get(app_config_1.API_URL + 'viajes/' + noTrayecto + '/comprobantes', { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(function (response) {
                var json = response.body.gastoViaje;
                resolve(gasto_viaje_1.GastoViaje.fromPlainObjectArray(json));
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.obtenerComprobantesDeViajePendienteDeAutorizacionPorCeco = function (noTrayecto) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .get(app_config_1.API_URL + 'viajes/autorizadorcencos/' + noTrayecto, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(function (response) {
                var json = response.body.gastoViaje;
                resolve(gasto_viaje_1.GastoViaje.fromPlainObjectArray(json));
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.obtenerViaje = function (noSolicitud) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .get(app_config_1.API_URL + 'viaticos-usuario/solicitudes-de-viaticos/' + noSolicitud, {
                withCredentials: true,
                observe: 'response',
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
                .toPromise()
                .then(function (response) {
                console.log(response);
                resolve(response.body);
            })["catch"](function (reason) { return reject(reason); });
        });
    };
    ViajesService.prototype.obtenerAlertasPorSolicitud = function (noSolicitud) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .get(app_config_1.API_URL + 'avisos/' + noSolicitud, {
                withCredentials: true,
                observe: 'response',
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
                .toPromise()
                .then(function (response) {
                console.log(response);
                resolve(response.body);
            })["catch"](function (reason) { return reject(reason); });
        });
    };
    ViajesService.prototype.descargar = function (noComprobante, formato) {
        var _this = this;
        var Archivo_URL = "";
        switch (formato) {
            case 'pdf':
                console.log('pdf');
                /*return new Promise<any>((resolve, reject) => {
                    this.http
                        .get(API_URL + 'archivo/pdf/' + noComprobante,
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
                });*/
                Archivo_URL = 'archivo/pdf/';
                break;
            case 'xml':
                console.log('xml');
                /*return new Promise<any>((resolve, reject) => {
                    this.http
                        .get(API_URL + 'archivo/xml/' + noComprobante,
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
                });*/
                Archivo_URL = 'archivo/xml/';
                break;
            case 'zip':
                console.log('zip');
                /*return new Promise<Solicitud>((resolve, reject) => {
                    this.http
                        .get(API_URL + 'archivo/' + noComprobante,
                        {
                            withCredentials: true,
                            observe: 'response',
                            headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
                        })
                        .toPromise()
                        .then(response => {
                            console.log(response);
                            resolve(response.body as Solicitud);
                        }).catch(reason => reject(reason));
                });*/
                Archivo_URL = 'archivo/';
                break;
            default:
                break;
        }
        return new Promise(function (resolve, reject) {
            _this.http
                .get(app_config_1.API_URL + Archivo_URL + noComprobante, {
                withCredentials: true,
                observe: 'response',
                responseType: 'arraybuffer',
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/octet-stream').append('Authorization', localStorage.getItem('auth_token'))
            })
                .toPromise()
                .then(function (response) {
                resolve(response.body);
            })["catch"](function (reason) { return reject(reason); });
        });
    };
    /*obtenerViaje(noTrayecto: any): Promise<Viaje> {
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
    }*/
    ViajesService.prototype.obtenerViajePendientesDeAutorizacionPorCeco = function (noTrayecto) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .get(app_config_1.API_URL + 'viajes/' + noTrayecto, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(function (response) {
                var json = response.body.viaje;
                var viaje = viaje_1.Viaje.fromPlainObject(json);
                _this.obtenerComprobantesDeViajePendienteDeAutorizacionPorCeco(noTrayecto)
                    .then(function (e) { return viaje.comprobantes = e; })["catch"](function (r) { return reject(r); })
                    .then(function () { return resolve(viaje); });
            })["catch"](function (reason) { return reject(reason); });
        });
    };
    ViajesService.prototype.obtenerViajesPendientesDeAutorizacionPorCeco = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(app_config_1.API_URL + 'viajes/autorizadorcencos', {
                params: {},
                withCredentials: true,
                observe: 'response'
            }).toPromise().then(function (response) {
                // workaround a 204 del servidor en lugar de arreglo vacío
                if (response.status == 204) {
                    resolve([]);
                    return;
                }
                var json = response.body.viaje;
                resolve(viaje_1.Viaje.fromPlainObjectArray(json));
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.obtenerViajesDeAutorizadoresPendientesDeAutorizacion = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(app_config_1.API_URL + 'viajes/autorizadorcencos-cc', {
                params: {},
                withCredentials: true,
                observe: 'response'
            }).toPromise().then(function (response) {
                // workaround a 204 del servidor en lugar de arreglo vacío
                if (response.status == 204) {
                    resolve([]);
                    return;
                }
                var json = response.body.viaje;
                resolve(viaje_1.Viaje.fromPlainObjectArray(json));
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.obtenerViajes = function (viajesAbiertos, viajesCerrados, admin) {
        var _this = this;
        if (viajesAbiertos === void 0) { viajesAbiertos = true; }
        if (viajesCerrados === void 0) { viajesCerrados = false; }
        if (admin === void 0) { admin = false; }
        return new Promise(function (resolve, reject) {
            _this.http.get(app_config_1.API_URL + 'viajes', {
                params: { notclosed: '' + viajesAbiertos, closed: '' + viajesCerrados, admin: '' + admin },
                withCredentials: true,
                observe: 'response'
            }).toPromise().then(function (response) {
                // workaround a 204 del servidor en lugar de arreglo vacío
                if (response.status == 204) {
                    resolve([]);
                    return;
                }
                var json = response.body.viaje;
                resolve(viaje_1.Viaje.fromPlainObjectArray(json));
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.consultarSolicitudesDeUsuarioPorEstatus = function (empleado, estatus) {
        var _this = this;
        var params = new http_1.HttpParams();
        params = params.set('estatus', estatus);
        console.log('params:' + params);
        return new Promise(function (resolve, reject) { return _this.http
            .get(app_config_1.API_URL + 'viaticos-usuario/' + empleado, {
            params: params,
            withCredentials: true,
            observe: 'body',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            resolve(response);
        })["catch"](function (reason) { return reject(reason); }); });
    };
    ViajesService.prototype.consultarSolicitudesDeUsuarioPorEmpresaYEstatus = function (empresas, estatus) {
        var _this = this;
        var params = new http_1.HttpParams();
        params = params.set('empresas', empresas);
        params = params.set('estatus', estatus);
        params = params.set('usuario', localStorage.getItem('usuario'));
        console.log('params:' + params);
        return new Promise(function (resolve, reject) { return _this.http
            .get(app_config_1.API_URL + 'viaticos-usuario/solicitudes-de-viaticos', {
            params: params,
            withCredentials: true,
            observe: 'body',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            resolve(response);
        })["catch"](function (reason) { return reject(reason); }); });
    };
    //#region SOLICITUDES PENDIENTES
    ViajesService.prototype.consultarSolicitudesPendientes = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) { return _this.http
            .get(app_config_1.API_URL + 'autorizaciones/usuarios/' + user + '/solicitudes-pendientes-autorizar', {
            withCredentials: true,
            observe: 'body',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            resolve(response);
        })["catch"](function (reason) { return reject(reason); }); });
    };
    ViajesService.prototype.consultarSolicitudPendiente = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) { return _this.http
            .get(app_config_1.API_URL + 'autorizaciones/usuarios/' + user + '/solicitudes-pendientes-autorizar', {
            withCredentials: true,
            observe: 'body',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            resolve(response);
        })["catch"](function (reason) { return reject(reason); }); });
    };
    // .put(API_URL + 'autorizaciones/solicitudes-viaticos/' + id+'?usuario='+user+'&&tipo='+tipo+'&motivo='+motivo,{
    //     withCredentials: true,
    //      observe: 'response',
    //      headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
    // aprobarSolicitudPendiente(id: string, user: string, tipo: string, motivo: string): Promise<any> {
    //     var token = localStorage.getItem('auth_token');
    //     console.log(token);
    //     // head: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'));
    //     // console.log("AQUI:", head);
    //     return new Promise((resolve, reject) => {
    //         this.http
    //             .put(API_URL + 'autorizaciones/solicitudes-viaticos/' + id +'?usuario='+user+'&tipo='+tipo, {
    //                 withCredentials: true,
    //                 headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
    //                 observe: 'response',
    //             })
    //             .toPromise()
    //             .then(response => {
    //                 resolve(response);
    //                 // alert(response.);
    //             }).catch(reason => {
    //                 reject(reason);
    //             });
    //     });
    // }
    ViajesService.prototype.aprobarRechazar = function (id, user, tipo, motivo) {
        var tok = localStorage.getItem('auth_token');
        return this.http.put(app_config_1.API_URL + 'autorizaciones/solicitudes-viaticos/' + id + '?usuario=' + user + '&tipo=' + tipo + '&motivo=' + motivo, 'solicitud', {
            withCredentials: true,
            observe: 'response',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', tok)
        }).toPromise();
    };
    //#endregion
    ViajesService.prototype.crearViaje = function (solicitud) {
        var _this = this;
        var json = {
            motivo: solicitud.motivo,
            fechaInicio: solicitud.fechaInicio,
            fechaFin: solicitud.fechaFin,
            concepto: solicitud.concepto,
            totalAnticipo: solicitud.totalAnticipo,
            numeroSolicitud: '',
            observaciones: solicitud.observaciones
        };
        return new Promise(function (resolve, reject) {
            _this.http
                .post(app_config_1.API_URL + 'viaticos-usuario/' + localStorage.getItem('usuario') + '/solicitudes-de-viaticos/', json, {
                withCredentials: true,
                observe: 'response',
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
                .toPromise()
                .then(function (response) {
                console.log(response);
                resolve(response.body);
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.actualizarViaje = function (noTrayecto, solicitud) {
        var _this = this;
        solicitud.totalAnticipo = solicitud.totalAnticipo || 0;
        solicitud.totalComprobado = solicitud.totalComprobado || 0;
        console.log(solicitud);
        return new Promise(function (resolve, reject) {
            _this.http
                .put(app_config_1.API_URL + 'viaticos-usuario/solicitudes-de-viaticos/' + noTrayecto, solicitud, {
                withCredentials: true,
                observe: 'response',
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
                .toPromise()
                .then(function (response) {
                console.log(response);
                // let json = (response.body as any).viaje;
                resolve(response.body);
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    ViajesService.prototype.eliminarViaje = function (noTrayecto) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http["delete"](app_config_1.API_URL + 'viaticos-usuario/solicitudes-de-viaticos/' + noTrayecto, {
                withCredentials: true,
                observe: 'response',
                headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
                .toPromise()
                .then(function (response) {
                resolve('OK');
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    // --------------------------------------------
    ViajesService.prototype.solicitarAutorizacion = function (noTrayecto) {
        return this.http
            .put(app_config_1.API_URL + 'viaticos-usuario/solicitudes-de-viaticos/' + noTrayecto + '/aprobacion', 'solicitar aprobacion', {
            withCredentials: true,
            observe: 'response',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        })
            .toPromise();
    };
    // -----------------Autorizaciones por contador --- Inicio ------------
    ViajesService.prototype.solicitarAutorizacionDeComprobacionPorContador = function (numeroSolicitud) {
        return this.http
            .put(app_config_1.API_URL + 'viaticos-usuario/solicitudes-de-viaticos/' + numeroSolicitud + '/comprobante-aprobacion', '', {
            withCredentials: true,
            observe: 'response',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
        })
            .toPromise();
    };
    ViajesService.prototype.autorizarRechazarComprobantePorContador = function (idComprobanteViatico, tipo, motivo) {
        var params = new http_1.HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
        // params = params.set('usuario', 'USER32R');
        params = params.set('tipo', tipo);
        if (tipo == 'RECHAZAR') {
            params = params.set('motivo', tipo);
        }
        return this.http
            .put(app_config_1.API_URL + 'aprobaciones/comprobantes-de-viaticos/comprobante/' + idComprobanteViatico, '', {
            withCredentials: true,
            observe: 'response',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
            params: params
        })
            .toPromise();
    };
    ViajesService.prototype.autorizarRechazarSolicitudPorContador = function (numeroSolicitud, tipo, motivo) {
        var params = new http_1.HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
        // params = params.set('usuario', 'CONTAPI');
        params = params.set('tipo', tipo);
        if (tipo == 'RECHAZAR') {
            params = params.set('motivo', motivo);
        }
        return this.http
            .put(app_config_1.API_URL + 'aprobaciones/comprobantes-de-viaticos/solicitud/' + numeroSolicitud, '', {
            withCredentials: true,
            observe: 'response',
            headers: new http_1.HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
            params: params
        })
            .toPromise();
    };
    // -----------------Autorizaciones por contador --- Fin ---------------
    ViajesService.prototype.rechazarViajePorCeco = function (noTrayecto, comentarios) {
        return this.http
            .put(app_config_1.API_URL + 'viajes/autorizadorcencos/viaje/' + noTrayecto + '/rechazar', '', {
            withCredentials: true, observe: 'response', params: { comentarios: comentarios }
        }).toPromise();
    };
    ViajesService.prototype.aprobarViajePorCeco = function (noTrayecto) {
        return this.http
            .put(app_config_1.API_URL + 'viajes/autorizadorcencos/viaje/' + noTrayecto + '/aprobacion', '', {
            withCredentials: true, observe: 'response', params: {}
        })
            .toPromise();
    };
    ViajesService.prototype.rechazarViajeAutCC = function (noTrayecto, comentarios) {
        return this.http
            .put(app_config_1.API_URL + 'viajes/autorizadorcencos-cc/viaje/' + noTrayecto + '/rechazar', '', {
            withCredentials: true, observe: 'response', params: { comentarios: comentarios }
        }).toPromise();
    };
    ViajesService.prototype.aprobarViajeAutCC = function (noTrayecto) {
        return this.http
            .put(app_config_1.API_URL + 'viajes/autorizadorcencos-cc/viaje/' + noTrayecto + '/aprobacion', '', {
            withCredentials: true, observe: 'response', params: {}
        }).toPromise();
    };
    // http://187.237.62.196:8080/SistemaContabilidad/viajes/185/estatus?fecha_cont=2018-10-05T05:00:00.000Z
    ViajesService.prototype.terminarAprobacion = function (noTrayecto, estatus) {
        // ES PRACTICAMENTE EL MISMO METODO DE ARRIBA, A LO MEJOR VALDRIA LA PENA ABSTRAERLOS LUEGO 
        var _this = this;
        var fecha_cont = app_config_1.safeToISOString(new Date());
        return new Promise(function (resolve, reject) {
            _this.http
                .put(app_config_1.API_URL + 'viajes/' + noTrayecto + '/estatus', estatus, {
                withCredentials: true, observe: 'response', params: { fecha_cont: fecha_cont }
            })
                .toPromise()
                .then(function (response) {
                var json = response.body.result;
                resolve(json);
            })["catch"](function (reason) {
                reject(reason);
            });
        });
    };
    // --------------------------------------------
    ViajesService.prototype.obtenerReporteTotalizador = function (params) {
        var _this = this;
        var search = {};
        console.log(params);
        for (var property in params) {
            if (typeof params[property] == 'function')
                continue;
            if (!params[property])
                continue;
            search[property] = params[property];
        }
        if (params.fechaCont != null)
            search['fechaCont'] = '"' + params.fechaCont.toJSON().substr(0, 10) + '"';
        if (params.fechaContFin != null)
            search['fechaContFin'] = '"' + params.fechaContFin.toJSON().substr(0, 10) + '"';
        if (params.usuarios != null && Array.isArray(params.usuarios) && params.usuarios.length > 0) {
            var str_1 = "";
            params.usuarios.forEach(function (u) { return str_1 = str_1 + ',"' + u + '"'; });
            str_1 = str_1.substr(1);
            search['usuarios'] = str_1;
        }
        console.log(search);
        return new Promise(function (ok, err) {
            _this.http.get(app_config_1.API_URL + 'viajes/reporteTotalizadorSencha', { withCredentials: true, params: search, observe: 'response' })
                .toPromise()
                .then(function (r) {
                var row = r.body.row;
                if (!Array.isArray(row))
                    row = [row];
                ok(row);
            })["catch"](function (r) { return err(r); });
        });
    };
    ViajesService.prototype.cambiarFecha = function (nombre, valor) {
        var _this = this;
        return new Promise(function (resolve, reject) { return _this.http
            .get(app_config_1.API_URL + 'config/set?nombre=' + nombre + '&valor=' + valor, { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(function (r) {
            resolve(r.body.result);
        })["catch"](function (r) { reject(r); }); });
    };
    ViajesService.prototype.obtenerConfig = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return _this.http
            .get(app_config_1.API_URL + 'config?page=1&start=0&limit=25', { withCredentials: true, observe: 'response' })
            .toPromise().then(function (r) { resolve(r.body.propiedad); })["catch"](function (r) { reject(r); }); });
    };
    ViajesService.prototype.enviarTiposViaje = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(app_config_1.API_URL + 'viajes/job/run', { withCredentials: true, observe: 'response', responseType: 'text' })
                .toPromise().then(function (r) {
                resolve(r);
                console.log(r);
            })["catch"](function (r) {
                reject(r);
            });
        });
    };
    ViajesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ViajesService);
    return ViajesService;
}());
exports.ViajesService = ViajesService;
var ReporteTotalizadorParams = /** @class */ (function () {
    function ReporteTotalizadorParams() {
        this.area = null;
        this.tipo = null;
        this.clase = null;
        this.cuenta = null;
        this.trayecto = null;
        this.fechaCont = null;
        this.fechaContFin = null;
        this.destino = null;
        this.centroCosto = null;
        this.sociedad = null;
        this.usuarios = null;
    }
    ReporteTotalizadorParams.prototype.setBadFieldsToNull = function () {
        if (Number.isNaN(this.area))
            this.area = null;
        if (Number.isNaN(this.tipo))
            this.tipo = null;
        if (Number.isNaN(this.clase))
            this.clase = null;
        if (Number.isNaN(this.trayecto))
            this.trayecto = null;
        if (this.cuenta == '')
            this.cuenta = null;
        else
            this.cuenta = '"' + this.cuenta + '"';
        if (this.destino == '')
            this.destino = null;
        else
            this.destino = '"' + this.destino + '"';
        if (this.sociedad == '')
            this.sociedad = null;
        else
            this.sociedad = '"' + this.sociedad + '"';
        if (this.centroCosto == '')
            this.centroCosto = null;
        else
            this.centroCosto = '"' + this.centroCosto + '"';
        if (Number.isNaN(this.fechaCont.getTime()))
            this.fechaCont = null;
        if (Number.isNaN(this.fechaContFin.getTime()))
            this.fechaContFin = null;
        if (this.usuarios.length == 0)
            this.usuarios = null;
    };
    return ReporteTotalizadorParams;
}());
exports.ReporteTotalizadorParams = ReporteTotalizadorParams;
var ReporteTotalizadorRow = /** @class */ (function () {
    function ReporteTotalizadorRow() {
    }
    return ReporteTotalizadorRow;
}());
exports.ReporteTotalizadorRow = ReporteTotalizadorRow;
