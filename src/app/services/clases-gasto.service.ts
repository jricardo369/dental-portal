import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClaseGasto } from '../../model/clase-gasto';
import { API_URL } from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class ClasesGastoService {

    constructor(private http: HttpClient) { }

    obtenerClasesG(id: number): Promise<ClaseGasto[]> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'viajes/tiposDeGasto/' + id + '/clasesdegastos?activeonly=false', {withCredentials:true, observe:'response'})
            .toPromise()
            .then(r => resolve((r.body as any).claseGastoViaje))
            .catch(r => reject(r)));
    }

    obtenerClaseG(id: number): Promise<ClaseGasto> {

        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'viajes/clasesdegastos/' + id, {withCredentials:true, observe:'response'})
            .toPromise()
            .then(r => resolve((r.body as any).claseGastoViaje))
            .catch(r => reject(r)));
    }

    eliminar(id: number): Promise<any> {
        return new Promise((resolve, reject) => this.http
            .delete(API_URL + 'viajes/clasesdegastos/' + id, {withCredentials:true, observe:'response'})
            .toPromise()
            .then(r => {
                resolve((r.body as any).result);

            })
            .catch(r => {
                reject(r);

            }
            ));
    }

    crear(n: ClaseGasto): Promise<any> {
        console.log(n);
        return new Promise((resolve, reject) => this.http
            .post(API_URL + 'viajes/clasesdegastos', { claseGastoViaje: n }, {withCredentials:true, observe:'response'})
            .toPromise()
            .then(r => resolve((r.body as any).claseGastoViaje))
            .catch(r => reject(r)));

    }
    editar(n: ClaseGasto): Promise<any> {
        return new Promise((resolve, reject) => this.http
            .put(API_URL + 'viajes/clasesdegastos/' + n.id, { claseGastoViaje: n }, {withCredentials:true, observe:'response'})
            .toPromise()
            .then(r => resolve((r.body as any).claseGastoViaje))
            .catch(r => reject(r)));
    }

}
