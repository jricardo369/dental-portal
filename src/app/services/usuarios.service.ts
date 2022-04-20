import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuario } from '../../model/usuario';
import { API_URL } from '../app.config';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    usuarioPromise: Promise<Usuario> = null;

    constructor(private http: HttpClient) {}

    obtenerUsuarios(): Promise<Usuario[]> {
        return new Promise<Usuario[]>((resolve, reject) => this.http
            .get(API_URL + 'usuarios',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Usuario[]);
            })
            .catch(reason => reject(reason))
        );
    }

    obtenerUsuario(usuario: string): Promise<Usuario> {
        let params = new HttpParams();
        params = params.set('usuario', usuario);
        this.usuarioPromise = new Promise((resolve, reject) => this.http
            .get(API_URL + 'usuarios/por-usuario',
            {
                params: params,
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body[0] as Usuario);
            })
            .catch(reason => reject(reason))
        );
        return this.usuarioPromise;
    }

    insertarUsuario(usuario: Usuario): Promise<Usuario> {
        this.usuarioPromise = new Promise((resolve, reject) => this.http
            .post(API_URL + 'usuarios', usuario,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body[0] as Usuario);
            })
            .catch(reason => reject(reason))
        );
        return this.usuarioPromise;
    }

    editarUsuario(usuario: Usuario): Promise<Usuario> {
        this.usuarioPromise = new Promise((resolve, reject) => this.http
            .put(API_URL + 'usuarios', usuario,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body[0] as Usuario);
            })
            .catch(reason => reject(reason))
        );
        return this.usuarioPromise;
    }

    eliminarUsuario(idUsuario: number): Promise<Usuario> {
        this.usuarioPromise = new Promise((resolve, reject) => this.http
            .delete(API_URL + 'usuarios',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body[0] as Usuario);
            })
            .catch(reason => reject(reason))
        );
        return this.usuarioPromise;
    }
}
