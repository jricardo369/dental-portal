import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../model/usuario';
import { API_URL } from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    usuarioPromise: Promise<Usuario> = null;

    constructor(private http: HttpClient) {}

    obtenerUsuario(usuario: string): Promise<Usuario> {
        this.usuarioPromise = new Promise((resolve, reject) => this.http
            .get(API_URL + 'usuarios/' + usuario,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Usuario);
            })
            .catch(reason => reject(reason))
        );
        return this.usuarioPromise;
    }
}
