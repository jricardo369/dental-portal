import { Injectable } from '@angular/core';
import { TiposDeViaje } from '../../model/tipos-de-viaje';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class TiposDeViajeService {

    tiposdeViaje: TiposDeViaje[] = [];

    constructor(
        private http: HttpClient,
    ) {

    }

    obtenerTiposDeViaje(): Promise<TiposDeViaje[]> {
        return new Promise((resolve, reject) => {
            this.http
                .get(API_URL + 'viajes/tiposAll', {withCredentials:true,observe:'response'})
                .toPromise()
                .then(r => {
                    resolve((r.body as any).tipoViaje);
                })
                .catch(r => {
                    reject(r);
                })
        });
    }

    obtenerTipoDeViaje(idtipoviaje: number): Promise<TiposDeViaje> {
        return new Promise((resolve, reject) => {
            this.http
                .get(API_URL + 'viajes/tipos/' + idtipoviaje, {withCredentials:true,observe:'response'})
                .toPromise()
                .then(r => {
                    resolve((r.body as any).tipoViaje);
                })
                .catch(r => {
                    reject(r);
                })
        });
    }

     crear(c: TiposDeViaje): Promise<any> {
 
         return new Promise((resolve, reject) => {
             this.http
                 .post(API_URL + 'viajes/tipos/', { tipoViaje: c }, {withCredentials:true,observe:'response'})
                 .toPromise()
                 .then(r => {
                     resolve(r);
                 })
                 .catch(r => {
                     reject(r);
                     
                     
                 })
         });
     }

    eliminar(idtipoviaje: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(API_URL + 'viajes/tipos/' + idtipoviaje, {withCredentials:true,observe:'response'})
                .toPromise()
                .then(r => {
                    resolve((r.body as any).result);
                })
                .catch(r => {
                    reject(r);
                })
        });
    }

    editar(e: TiposDeViaje): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .put(API_URL + 'viajes/tipos/' + e.id, {tipoViaje: e} ,{withCredentials:true,observe:'response'})
                .toPromise()
                .then(r => {
                    resolve((r.body as any).tipoViaje);
                })
                .catch(r => {
                    reject(r);
                })
        });
    }
}
