import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class ConfiguracionService {

    public syncronizandoConSAP: boolean = false;

    constructor(private http: HttpClient) {
    }

    realizarSincronizacionConSAP() {
        this.syncronizandoConSAP = true;
        return this.http.get(API_URL + "config/job/run", { withCredentials: true }).toPromise().then(r => {
            this.syncronizandoConSAP = false;
        }).catch(r => {
            this.syncronizandoConSAP = false;
        });
    }

    asignarVariable(name: string, value: string) {
        return this.http.get(API_URL + "config/set", {
            withCredentials: true,
            params: { nombre: name, valor: value },
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
}
