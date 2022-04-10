import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoGasto } from '../../model/tipo-gasto';
import { API_URL } from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class TiposGastoService {

    constructor(private http: HttpClient, ) { }

    obtenerTipos(id: number): Promise<TipoGasto[]> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'areas/' + id + '/tiposDeGasto?activeonly=false', { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => resolve((r.body as any).tipoGasto))
            .catch(r => reject(r)));
    }

    obtenerTipo(id: number): Promise<TipoGasto> {

        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'viajes/tiposDeGasto/' + id, { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => resolve((r.body as any).tipoGasto))
            .catch(r => reject(r)));
    }

    eliminar(id: number): Promise<any> {
        return new Promise((resolve, reject) => this.http
            .delete(API_URL + 'viajes/tiposDeGasto/' + id, { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => {
                resolve((r.body as any).result);
            })
            .catch(r => {
                reject(r);
            }));
    }

    crear(n: TipoGasto): Promise<any> {

        return new Promise((resolve, reject) => this.http
            .post(API_URL + 'viajes/tiposDeGasto', { tipoGasto: n }, { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => resolve((r.body as any).tipoGasto))
            .catch(r => reject(r)));

    }
    editar(n: TipoGasto): Promise<any> {
        return new Promise((resolve, reject) => this.http
            .put(API_URL + 'viajes/tiposDeGasto/' + n.id, { tipoGasto: n }, { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => resolve((r.body as any).tipoGasto))
            .catch(r => reject(r)));
    }
    obtenerTiposCG(id: number): Promise<TipoGasto[]> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'areas/' + id + '/tiposDeGasto?activeonly=true', { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => resolve((r.body as any).tipoGasto))
            .catch(r => reject(r)));
    }
}
