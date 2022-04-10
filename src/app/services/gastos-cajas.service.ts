import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GastoCaja } from '../../model/gasto-caja';
import { API_URL } from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class GastosCajasService {

    gastoscajas: GastoCaja[] = [];
    constructor(private http: HttpClient) { }

    obtenerGastosCajas(sociedad = null, activos = null): Promise<GastoCaja[]> {
        let params: any = {};
        if (sociedad) params.sociedad = sociedad;
        if (activos) params.activos = activos;
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'gastocaja', { withCredentials: true, observe: 'response', params: params })
            .toPromise()
            .then(r => {
                this.gastoscajas = (r.body as any).gastoCaja;
                resolve(this.gastoscajas);
            }).catch(r => {
                reject(r);

            })
        );
    }

    obtenerGastoCaja(idgastocaja: string): Promise<GastoCaja> {

        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'gastocaja/' + idgastocaja, { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => {

                let e: GastoCaja = (r.body as any).gastoCaja;

                // POR MOTIVOS QUE NO VAMOS A DISCUTIR NO REGRESAN LAS SOCIEDADES DESDE PORTAL,
                // VAMOS A AGARRARLAS DEL CACHE O ALGO ASI
                let cache = this.gastoscajas.find(x => x.operacion == idgastocaja);
                if (cache) e.sociedades = cache.sociedades;

                if (e.sociedades == null) e.sociedades = [];
                if (!Array.isArray(e.sociedades)) e.sociedades = [e.sociedades];

                resolve(e);
            })
            .catch(r => {
                reject(r);
            })
        );
    }

    eliminar(idgastocaja: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(API_URL + 'gastocaja/' + idgastocaja, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => {
                    resolve((r.body as any).result);

                })
                .catch(r => {
                    reject(r);
                })
        });
    }

    crear(c: GastoCaja): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(API_URL + 'gastocaja', { gastoCaja: c }, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => {
                    resolve((r.body as any).gastoCaja);

                })
                .catch(r => {
                    reject(r);
                })
        });
    }

    editar(e: GastoCaja): Promise<any> {

        console.log(e);

        return new Promise((resolve, reject) => {
            this.http
                .put(API_URL + 'gastocaja/' + e.operacion, { gastoCaja: e }, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => {
                    resolve((r.body as any).gastoCaja);
                })
                .catch(r => {
                    reject(r);
                })
        });
    }
}
