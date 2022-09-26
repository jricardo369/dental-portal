import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { CustomI18nService } from 'src/app/custom-i18n.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
    selector: 'app-tus-credenciales',
    templateUrl: './tus-credenciales.component.html',
    styleUrls: ['./tus-credenciales.component.css']
})
export class TusCredencialesComponent {

    cp = {
        "cont": "",
        "cont2": "",
        "idUsuario": ""
      }

    // expPsw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$^*_=-]).{8,12}$/;

    usuario: Usuario = new Usuario();
    idU;

    cambiandoContrasena: boolean = false;
    cambiandoCorreo: boolean = false;

    cont: string = null;
    cont2: string = null;
    passwordValida: boolean = false;
    confirmarPasswordValida: boolean = false;

    email1: string = "";
    email2: string = "";

    cargando = false;

    constructor(
        private usuariosService: UsuariosService, 
        private sessionService: SessionService, 
        private router: Router, 
        private i18n: CustomI18nService,
        private utilService: UtilService) {
			this.usuariosService
            .obtenerUsuarioPorId(parseInt(localStorage.getItem('idUsuario'))).then(u => {
            this.usuario = u;
            this.idU= u.idUsuario;
            console.log("ID Usuario",this.idU);
            
        }).catch(r => this.utilService.manejarError(r));
    }

    cambiarPassword() {
        let obj = {
            "cont": this.cp.cont,
            "cont2": this.cp.cont2,
            "idUsuario": this.idU
        }

        console.log("Body cambio de pass",obj);


        // if (this.validarPatronContrasenia(this.cp.cont) && this.validarPatronContrasenia(this.cp.cont2)) {
            if (this.cp.cont === this.cp.cont2) {                
                
                this.utilService
                    .mostrarDialogoSimple(
                        this.i18n.get("Cambiar contraseña"),
                        this.i18n.get("Estás a punto de cambiar de contraseña, una vez cambiada se cerrará la sesión y tendrás que ingresar con tus nuevas credenciales"),
                        this.i18n.get("Cambiar contraseña"),
                        this.i18n.get("No cambiar"))
                    // .then(result => {
                    //     if (result == 'ok') {
                    //         this.cargando = true;
                    //         this.sessionService
                    //             .cambiarCredenciales(this.cont, null)
                    //             .then(exito => {
                    //                 if (exito) {
                    //                     this.sessionService.cerrarSesion();
					// 					this.router.navigate(['/ingresar']);
                    //                 } else {
                    //                     this.utilService.mostrarDialogoSimple("Error", this.i18n.get("No se cambió la contraseña, verifica que tu sesión sea valida"));
                    //                 }
                    //             })
                    //             .catch(r => this.utilService.mostrarDialogoSimple("Error", r))
                    //             .then(() => this.cargando = false);
                    //     }
                    // });
            } else {
                this.utilService.mostrarDialogoSimple(
                    this.i18n.get("Error al reiniciar la contraseña"),
                    this.i18n.get("Las contraseñas ingresadas en el campo 'contraseña nueva' y 'confirmar contraseña nueva' no coinciden, verifique por favor.")
                );
            }
        // } else {
        //     this.utilService.mostrarDialogoSimple(
        //         this.i18n.get("La contraseña no cumple los aspectos requeridos"),
        //         this.i18n.get("La contraseña debe contener por lo menos un número, una letra en mayúscula, una letra en minúscula, un carácter especial(!@$^*_=-), la longitud mínima es de 8 y la longitud máxima es de 12, verifique por favor.")
        //     );
        // }
    }
    
    // validarPatronContrasenia(obj: string): boolean {
    //     if (obj.match(this.expPsw)) return true;
    //     else return false;
    // }

    cambiarCorreo() {
        if (this.email1.length < 3) {
            this.utilService.mostrarDialogoSimple(this.i18n.get("La dirección es muy corta"), this.i18n.get("La longitud de la dirección de correo debe ser mas larga"));
        } else if (this.email1 != this.email2) {
            this.utilService.mostrarDialogoSimple(this.i18n.get("Las direcciones no coinciden"), this.i18n.get("Ambas direcciones deben coincidir"));
        } else {
            this.utilService
                .mostrarDialogoSimple(
                    this.i18n.get("Cambiar correo electrónico"),
                    this.i18n.get("Estás a punto de cambiar tu dirección de correo electrónico, una vez cambiada se cerrará la sesión para que los cambios surtan efecto"),
                    this.i18n.get("Cambiar correo electrónico"),
                    this.i18n.get("No cambiar")
                ).then(result => {
                    if (result == 'ok') {
                        this.cargando = true;
                        this.sessionService
                            .cambiarCredenciales(null, this.email1)
                            .then(exito => {
                                if (exito) {
									this.sessionService.cerrarSesion();
									this.router.navigate(['/ingresar']);
                                } else {
                                    this.utilService.mostrarDialogoSimple("Error", this.i18n.get("No se cambió la dirección de correo electrónico, verifica que tu sesión sea valida"));
                                }
                            })
                            .catch(r => this.utilService.mostrarDialogoSimple("Error", r))
                            .then(() => this.cargando = false);
                    }
                });
        }
    }
}
