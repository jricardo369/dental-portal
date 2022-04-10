import { Injectable } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { API_URL } from '../app.config';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

export interface SessionServiceListener { onCerrarSesion(); onIniciarSesion(); }

const IDIOMA_ESPAÑOL_MEXICO = "es_mx";
const IDIOMA_ESPAÑOL_ESPAÑA = "es_es";
const IDIOMA_PORTUGUES = "pt";
const IDIOMA_INGLES = "en";

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    idiomaCambiado = false
    public xmlObligatorio = true
    lastValidation: number = 0

    private usuarioPromise: Promise<Usuario>;

    private listeners: SessionServiceListener[];

    constructor(private http: HttpClient) {
        this.listeners = [];

        if (this.idiomaCambiado == false) {
            let lang = "es";
            if (document.location.href.includes("/en")) lang = "en";
            if (document.location.href.includes("/es")) lang = "es";
            this.cambiarIdioma(lang).then(e0 => { }).catch(e => { });
            this.idiomaCambiado = true;
        }
    }

    addListener(listener: SessionServiceListener) {
        if (!this.listeners.includes(listener))
            this.listeners.push(listener);
    }

    isSessionValid(): Promise<boolean> {
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'auth/' + "user", { withCredentials: true, observe: "response" }).toPromise()
            .then(response => {
                if (response.status == 200) resolve(true)
                else resolve(false)
            })
            .catch(reason => {
                if (reason instanceof HttpErrorResponse) resolve(false)
                else reject(reason);
            })
        );
    }

    sessionUsuarioPromise: Promise<Usuario> = null;
    timeOfLastSessionUserRequest: number = 0;

    getUsuario(): Promise<Usuario> {

        let t = (new Date().getTime() - this.timeOfLastSessionUserRequest) / 1000;
        console.log("T desde que solicitaron usuario :" + t);
        if (this.sessionUsuarioPromise == null || t > 15) {
            this.sessionUsuarioPromise = new Promise((resolve, reject) => this.http
                .get(API_URL + 'auth/' + "user", { withCredentials: true }).toPromise()
                .then(response => {

                    // XMLOBLIGATORIO
                    /*this.http.get(API_URL + 'auth/' + "user/xml-obligatorio", { withCredentials: true, observe: "response" })
                        .toPromise()
                        .then(e => {
                            this.xmlObligatorio = (""+e.body) == 'true'*/

                            // RESOLVE NORMAL
                            resolve(response["usuario"] ? Usuario.fromPlainObject(response["usuario"]) : null)
                        /*})
                        .catch(reason => {
                            reject(reason)
                        })*/
                })
                .catch(reason => reject(reason))
            );
            this.timeOfLastSessionUserRequest = new Date().getTime();
        }
        return this.sessionUsuarioPromise;
    }

    iniciarSesion(usuario: string, password: string): Promise<boolean> {
        this.sessionUsuarioPromise = null;
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'auth/' + "login", {
                params: new HttpParams().set("user", usuario).set("pass", password),
                withCredentials: true,
                observe: "response",
            }).toPromise()
            .then(response => {
                if (response.status == 200) {

                    let lang = "es";

                    if (document.location.href.includes("/en")) lang = "en";
                    if (document.location.href.includes("/es")) lang = "es";

                    this.cambiarIdioma(lang).then(e0 => { }).catch(e => { });

                    this.listeners.forEach(e => e.onIniciarSesion());
                    resolve(true);

                } else resolve(false);
            })
            .catch(reason => reject(reason))
        );
    }

    cambiarIdioma(idioma: string) {
        return new Promise((resolve, reject) =>
            this.http.put(API_URL + "config/idioma", idioma, { withCredentials: true }).toPromise().then(e => resolve(e)).catch(e => reject(e)));
    }

    cerrarSesion(): Promise<boolean> {
        this.sessionUsuarioPromise = null;
        return new Promise((resolve, reject) => this.http
            .get(API_URL + 'auth/' + "logout", { params: null, withCredentials: true }).toPromise()
            .then(response => {
                this.listeners.forEach(e => e.onCerrarSesion());
                resolve(true)
            })
            .catch(reason => reject(reason))
        );
    }


    cambiarCredenciales(password: string, email: string) {
        return new Promise((resolve, reject) => {
            this.getUsuario()
                .then(u => {
                    let params = new HttpParams();
                    this.http
                        .put(API_URL + "users/" + u.id + "/credentials", null, {
                            params: {
                                password: password,
                                email: email
                            },
                            withCredentials: true,
                            observe: 'response'
                        })
                        .toPromise()
                        .then(r => {
                            if (r.status == 204) resolve(true);
                            else resolve(false);
                        }).catch(r => {
                            if (r.status == 401) resolve(false);
                            else reject(r);
                        });
                }).catch(r => reject(r));
        });
    }

    recupera(usuario: string): Promise<any> {

        return new Promise((resolve, reject) => {
            this.http.get(API_URL + 'auth/' + "resetpassword?username=" + usuario, { withCredentials: true, observe: 'response' })
                .toPromise()
                .then(r => resolve(r.body))
                .catch(r => {
                    if (r.status == 401) resolve(null);
                    else reject(r)
                });
        });

    }

}
