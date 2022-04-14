import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';
import { Empresa } from './../../model/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

	empresa: Empresa[] = [];
	constructor(private http: HttpClient) {}

    obtenerEmpresas(): Observable<Empresa[]> {
		return this.http.get<Empresa[]>(API_URL + 'empresa',
		{
			withCredentials: true,
			responseType: 'json',
			headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
		});
	}


	obtenerEmpresa(empresa: string): Promise<Empresa> {
		return new Promise((resolve, reject) => {
			this.http
			.get(API_URL + 'empresa/' + empresa,
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

	crear(empresa: Empresa): Promise<any> {
		let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
		return new Promise((resolve, reject) => {
			this.http
			.post(API_URL + 'empresa', empresa,
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

	eliminar(id: number): Promise<any> {
		let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
		return new Promise((resolve, reject) => {
			this.http
			.delete(API_URL + 'empresa/' + id,
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

	editar(empresa: Empresa): Promise<any> {
		let params = new HttpParams();
        params = params.set('usuario', localStorage.getItem('usuario'));
		return new Promise((resolve, reject) => {
			this.http
			.put(API_URL + 'empresa' , empresa,
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
