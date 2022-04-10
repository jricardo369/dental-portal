import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { VERSION_PORTAL, EMPRESA_PORTAL } from 'src/app/app.config';
import { UtilService } from 'src/app/services/util.service';
import { Usuario } from 'src/model/usuario';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomI18nService } from 'src/app/custom-i18n.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    dialogVisible: boolean;
    baseHref = document.baseURI;
    version = VERSION_PORTAL;
    empresa = EMPRESA_PORTAL;

    user: Usuario = new Usuario();
    loading: boolean = false;
    recuperandoPassword = false;

    constructor(
        private utilService: UtilService,
        private sessionService: SessionService,
        private router: Router,
        private i18n: CustomI18nService,
    ) {
        this.sessionService
            .isSessionValid()
            .then(valid => {
                if (!valid) return;
                this.router.navigateByUrl('/inicio')
            })
            .catch(err => {
                console.error(err);
            })
    }

    navegarAPaginaInicialSegunUsuario() {
        this.sessionService.getUsuario().then(e => {
            if (e.rol.id == 3) {
                this.router.navigate(['/proveedores']);
            } else {
                this.router.navigate(['/inicio']);
            }
        });
    }

    recuperar() {
        this.utilService.mostrarDialogoLogin(true);
    }

    ingresar() {
        if (this.loading) return;
        this.loading = true;
        this.sessionService
            .iniciarSesion(this.user.usuario, this.user.password)
            .then(success => {
                console.log('BANANA:' + success);
                if (success) {
                    this.navegarAPaginaInicialSegunUsuario();
                } else {
                    this.loading = false;
                    this.utilService.mostrarDialogoSimple(
                        this.i18n.get("Credenciales incorrectas"),
                        this.i18n.get("El usuario o la contraseña no coinciden, verifique sus credenciales y pruebe de nuevo")
                    );
                }
            }).catch(r => {
                if (r instanceof HttpErrorResponse && (r as HttpErrorResponse).status == 0) {
                    this.loading = false;
                    this.utilService.mostrarDialogoSimple(
                        this.i18n.get("Error de conexión"),
                        this.i18n.get("No se logró la conexión con el servidor")
                    );
                } else {
                    console.log(r);
                    alert(r)
                }
            });
    }

    changeLang(lang) {
        document.location.href = document.location.href
            .replace("/en", "/$lang")
            .replace("/es", "/$lang")
            .replace("$lang", lang);
    }

}
