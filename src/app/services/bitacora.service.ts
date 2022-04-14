import { Injectable } from '@angular/core';
import { Bitacora } from 'src/model/bitacora';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../app.config';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
	providedIn: 'root'
})
export class BitacoraService {

	constructor(private http: HttpClient) {}

	obtenerBitacora(numeroSolicitud: string): Observable<Bitacora[]> {
		return this.http.get<Bitacora[]>(API_URL + 'evento-de-solicitud/' + numeroSolicitud,
			{
				withCredentials: true,
				responseType: 'json',
				headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
			});
	}

}
