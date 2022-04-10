import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../../model/area';
import { API_URL } from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class AreasService {

    constructor(private http: HttpClient) { }

    obtenerAreas(): Promise<Area[]> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'areas?activeonly=false', { withCredentials: true, observe: 'response' }).toPromise()
            .then(r => resolve((r.body as any).area))
            .catch(r => reject(r)));
    }

    obtenerAreastg(): Promise<Area[]> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'areas?activeonly=true', { withCredentials: true, observe: 'response' }).toPromise()
            .then(r => resolve((r.body as any).area))
            .catch(r => reject(r)));
    }

    obtenerArea(idarea: number): Promise<Area> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'areas/' + idarea, { withCredentials: true, observe: 'response' }).toPromise()
            .then(r => resolve((r.body as any).area))
            .catch(r => reject(r)));
    }

    eliminar(idarea: number): Promise<any> {
        return new Promise((resolve, reject) => this.http
            .delete(API_URL + 'areas/' + idarea, { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => { resolve((r.body as any).result); })
            .catch(r => { reject(r); }));
    }

    crear(n: Area): Promise<any> {
        return new Promise((resolve, reject) => this.http
            .post(API_URL + 'areas', { area: n }, { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => resolve((r.body as any).area))
            .catch(r => reject(r)));

    }

    editar(n: Area): Promise<any> {
        return new Promise((resolve, reject) => this.http
            .put(API_URL + 'areas/' + n.idarea, { area: n }, { withCredentials: true, observe: 'response' })
            .toPromise()
            .then(r => resolve((r.body as any).area))
            .catch(r => reject(r)));
    }
}
