import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Division } from 'src/model/division';
import { API_URL } from '../app.config';

@Injectable({
	providedIn: 'root'
})
export class DivisionService {

	constructor(private http: HttpClient) {}

	consultarDivisiones(): Promise<Division[]> {
		return new Promise((resolve, reject) => this.http
			.get(API_URL + 'division',
			{
				withCredentials: true,
				observe: 'body',
				headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
			})
			.toPromise()
			.then(response => {
				resolve(response as Division[]);
			})
			.catch(reason => reject(reason))
		);
	}
}
