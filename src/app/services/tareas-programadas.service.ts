import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from '../app.config';
import { Observable } from 'rxjs';
import { TareasProgramadas } from 'src/model/tareas-programadas';

@Injectable({
  providedIn: 'root'
})
export class TareasProgramadasService {

  constructor(private http: HttpClient) { }

      getTareas(): Observable<TareasProgramadas[]> {
        return this.http.get<TareasProgramadas[]>(API_URL + 'tareas-programadas',
            {
              withCredentials: true,
              headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            });
      }

      asignarVariable(arrTareas: TareasProgramadas) {
      let params = new HttpParams();
      params = params.set('usuario', localStorage.getItem('usuario'));
        return this.http.put(API_URL + 'tareas-programadas', arrTareas, {
          params: params,
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
            observe: 'response'
        }).toPromise();
      }
  
      polizaFox() {
        var tok = localStorage.getItem('auth_token');
        return this.http.get(API_URL + 'jobs/poliza-fox'  , {
            withCredentials: true,
            observe: 'response',
            headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', tok),
        }).toPromise();
      }

      polizaSYS21() {
        var tok = localStorage.getItem('auth_token');
        return this.http.get(API_URL + 'jobs/poliza-sys21'  , {
            withCredentials: true,
            observe: 'response',
            headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', tok),
        }).toPromise();
      }

      polizaSapB1() {
        var tok = localStorage.getItem('auth_token');
        return this.http.get(API_URL + 'jobs/poliza-sapb1'  , {
            withCredentials: true,
            observe: 'response',
            headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', tok),
        }).toPromise();
      }
  
      cargaEntrega(fecha: string) {
        var tok = localStorage.getItem('auth_token');
        return this.http.get(API_URL + 'jobs/carga-entrega/'+fecha  , {
            withCredentials: true,
            observe: 'response',
            headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', tok),
        }).toPromise();
      }
  
      cargaComprobacion(fecha: string) {
        var tok = localStorage.getItem('auth_token');
        return this.http.get(API_URL + 'jobs/carga-comprobacion/'+fecha  , {
            withCredentials: true,
            observe: 'response',
            headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', tok),
        }).toPromise();
    }
}
