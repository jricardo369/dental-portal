import { Injectable } from '@angular/core';
import { Subcuenta } from '../../model/subcuenta';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentasContablesService {

	private urlSubcuenta: string;
	subcuenta: Subcuenta[] = [];
	constructor(private http: HttpClient) {
		this.urlSubcuenta = API_URL + 'subcuentas-contables';
	}

    obtenerSubcuentasPorEmpresaYCeco(): Observable<Subcuenta[]> {
		let usuario = JSON.parse(localStorage.getItem('objUsuario'));
		let params = new HttpParams();
        params = params.set('empresa', usuario.organizaciones[0].rfc);
        params = params.set('ceco', usuario.ceco);
		return this.http.get<Subcuenta[]>(this.urlSubcuenta,
		{
			params: params,
			withCredentials: true,
			responseType: 'json',
			headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
		});
	}

	obtenerSubcuentas(): Observable<Subcuenta[]> {
		return this.http.get<Subcuenta[]>(this.urlSubcuenta,
		{
			withCredentials: true,
			responseType: 'json',
			headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
		});
	}


	obtenerSubcuenta(idsubcuenta: number): Promise<Subcuenta> {
		return new Promise((resolve, reject) => {
			this.http
			.get(this.urlSubcuenta + '/' + idsubcuenta,
			{
				withCredentials: true,
				headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
				observe: 'response',
				responseType: 'json'
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

	crear(subcuenta: Subcuenta): Promise<any> {
		let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
		return new Promise((resolve, reject) => {
			this.http
			.post(this.urlSubcuenta + '/insertar/', subcuenta,
			{
				params: params,
				withCredentials: true, observe: 'response',
				headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
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

	eliminar(idsubcuenta: number): Promise<any> {
		let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
		return new Promise((resolve, reject) => {
			this.http
			.delete(this.urlSubcuenta + '/' + idsubcuenta,
			{
				params: params,
				headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
				withCredentials: true, observe: 'response'
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

	editar(idsubcuenta: Subcuenta): Promise<any> {
		let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
		return new Promise((resolve, reject) => {
			this.http
			.put(this.urlSubcuenta  + '/' , idsubcuenta,
			{
				params: params,
				headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
				withCredentials: true, observe: 'response'
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
