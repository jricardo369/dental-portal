import { Injectable } from '@angular/core';
import { Nivel } from '../../model/nivel';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from '../app.config';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NivelesService {

  private urlNiveles: string;
  niveles: Nivel[] = [];
  constructor(
    private http: HttpClient,)
  { this.urlNiveles = API_URL + 'niveles'; }

  obtenerNiveles(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(API_URL + 'niveles',
        {
          withCredentials: true,
          responseType: 'json',
          headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
 });
}


  obtenerNivel(idnivel: number): Promise<Nivel> {
      return new Promise((resolve, reject) => {
          this.http
            .get(this.urlNiveles + '/' + idnivel,
              {
                withCredentials: true,
                observe: 'response',
                responseType: 'json',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
              })
              .toPromise()
            .then(r => {
                  resolve(r.body as any);
              })
              .catch(r => {
                  reject(r);
              });
      });
  }

  crear(nivel: Nivel): Promise<any> {
		let params = new HttpParams();
    params = params.set('usuario', localStorage.getItem('usuario'));
      return new Promise((resolve, reject) => {
          this.http
            .post(this.urlNiveles + '/', nivel,
              {
                params: params,
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
              })
              .toPromise()
              .then(r => {
                  resolve(r.status);
              })
              .catch(r => {
                  reject(r);
              });
      });
  }

  eliminar(idnivel: number): Promise<any> {
		let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
      return new Promise((resolve, reject) => {
          this.http
            .delete(this.urlNiveles + '/' + idnivel,
              {
                params: params,
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
              })
              .toPromise()
              .then(r => {
                  resolve(r);
              })
              .catch(r => {
                  reject(r);
              });
      });
  }

  editar(nivel: Nivel): Promise<any> {
		let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
      return new Promise((resolve, reject) => {
          this.http
            .put(this.urlNiveles + '/' , nivel,
              {
                params: params,
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
              })
              .toPromise()
              .then(r => {
                  resolve(r.status);
              })
              .catch(r => {
                reject(r);
              });
      });
  }

}
