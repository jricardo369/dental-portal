import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from '../app.config';
import { Observable } from 'rxjs';
import { Configuracion } from 'src/model/configuracion';

@Injectable({
    providedIn: 'root'
})
    
export class ConfiguracionService {
    config = null;
    //arrconfi = new Configuracion;
    constructor(private http: HttpClient) {}

    asignarVariable(arrconfi: Configuracion) {
		let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
        return this.http.put(API_URL + 'configuraciones', arrconfi, {
            params: params,
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
            observe: 'response'
        }).toPromise();
    }

    obtenerVariable(name: string) {
        return this.http.get(API_URL + "config/get", {
            withCredentials: true,
            params: { nombre: name },
            observe: 'response'
        }).toPromise();
    }

    getConf(): Observable<Configuracion[]> {
        return this.http.get<Configuracion[]>(API_URL + 'configuraciones',
            {
                withCredentials: true,
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            });
    }

}
