import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';

@Component({
    selector: 'app-tus-credenciales',
    templateUrl: './tus-credenciales.component.html',
    styleUrls: ['./tus-credenciales.component.css']
})
export class TusCredencialesComponent {

    usuario: Usuario = new Usuario();

    cambiandoContrasena: boolean = false;
    cambiandoCorreo: boolean = false;

    password1: string = "";
    password2: string = "";

    email1: string = "";
    email2: string = "";

    cargando = false;

    constructor(private sessionService: SessionService, private router: Router, private utilService: UtilService) {
        this.sessionService.getUsuario().then(u => {
            this.usuario = u;
        }).catch(r => alert(r));
    }

    cambiarPassword() {

        if (this.password1.length < 3) {
            this.utilService.mostrarDialogoSimple("La contraseña es muy corta", "La longitud de la contraseña debe ser mas larga");
        } else if (this.password1 != this.password2) {
            this.utilService.mostrarDialogoSimple("Las contraseñas no coinciden", "Ambas contraseñas deben coincidir");
        } else {
            this.utilService
                .mostrarDialogoSimple(
                    "Cambiar contraseña",
                    "Estás a punto de cambiar de contraseña, una vez cambiada se cerrará la sesión y tendras que ingresar con tus nuevas credenciales",
                    "Cambiar contraseña",
                    "No cambiar contraseña")
                .then(result => {

                    if (result == 'ok') {

                        this.cargando = true;
                        this.sessionService
                            .cambiarCredenciales(this.password1, null)
                            .then(exito => {
                                if (exito) {
                                    let elo = r => this.router.navigate(['/ingresar']);
                                    this.sessionService.cerrarSesion().then(elo).catch(elo);
                                } else {
                                    this.utilService.mostrarDialogoSimple("Error", "No se cambió la contraseña, verifica que tu sesión sea valida");
                                }
                            })
                            .catch(r => this.utilService.mostrarDialogoSimple("Error", r))
                            .then(() => this.cargando = false);

                    }

                });
        }
    }

    cambiarCorreo() {

        if (this.email1.length < 3) {
            this.utilService.mostrarDialogoSimple("La dirección es muy corta", "La longitud de la dirección de correo debe ser mas larga");
        } else if (this.email1 != this.email2) {
            this.utilService.mostrarDialogoSimple("Las direcciones no coinciden", "Ambas direcciones deben coincidir");
        } else {
            this.utilService
                .mostrarDialogoSimple(
                    "Cambiar correo electrónico",
                    "Estás a punto de cambiar tu dirección de correo electrónico, una vez cambiada se cerrará la sesión para que los cambios surtan efecto",
                    "Cambiar correo electrónico",
                    "No cambiar"
                ).then(result => {
                    if (result == 'ok') {
                        this.cargando = true;
                        this.sessionService
                            .cambiarCredenciales(null, this.email1)
                            .then(exito => {
                                if (exito) {
                                    let elo = r => this.router.navigate(['/ingresar']);
                                    this.sessionService.cerrarSesion().then(elo).catch(elo);
                                } else {
                                    this.utilService.mostrarDialogoSimple("Error", 'No se cambió la dirección de correo electrónico, verifica que tu sesión sea valida');
                                }
                            })
                            .catch(r => this.utilService.mostrarDialogoSimple("Error", r))
                            .then(() => this.cargando = false);
                    }
                });
        }
    }
}
