import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilService } from '../../services/util.service';
import { DialogoSimpleComponent } from '../dialogo-simple/dialogo-simple.component';
import { CustomI18nService } from 'src/app/custom-i18n.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

    @Input()
    navigateToHomeAfterLogin: boolean = false;

    @Input()
    recuperarPasswordOnly: boolean = false;

    @Output()
    onLogin: EventEmitter<any> = new EventEmitter();

    @Output()
    onRecuperarEnviado: EventEmitter<any> = new EventEmitter();

    user: Usuario = new Usuario();
    loading: boolean = false;
    recuperandoPassword = false;

    constructor(
        private sessionService: SessionService,
        private i18n: CustomI18nService,
        private router: Router,
        private utilService: UtilService,
        private dialog: MatDialog) {
    }

    ngOnInit() { }

    navegarAPaginaInicialSegunUsuario() {
        this.sessionService.getUsuario().then(e => {
            if (e.rol.id == 3) {
                this.router.navigate(['/proveedores']);
            } else {
                this.router.navigate(['/inicio']);
            }
        });
    }

    ingresar() {
        this.loading = true;
        this.sessionService
            .iniciarSesion(this.user.usuario, this.user.password)
            .then(success => {
                console.log('BANANA:' + success);
                if (success) {
                    if (this.navigateToHomeAfterLogin) this.navegarAPaginaInicialSegunUsuario();
                    this.onLogin.emit(success);
                } else {
                    this.loading = false;
                    this.utilService.mostrarDialogoSimple(
                        "Credenciales incorrectas",
                        "El usuario o la contraseña no coinciden, verifique sus credenciales y pruebe de nuevo");
                }
            }).catch(r => {
                if (r instanceof HttpErrorResponse && (r as HttpErrorResponse).status == 0) {
                    this.loading = false;
                    this.utilService.mostrarDialogoSimple(
                        "Error de conexión",
                        "No se logró la conexión con el servidor");
                } else {
                    console.log(r);
                    alert(r)
                }
            });
    }

    recuperar() {
        this.loading = true;
        this.sessionService.recupera(this.user.usuario)
            .then(result => {
                this.dialog.open(DialogoSimpleComponent, {
                    data: {
                        titulo: result.success ? this.i18n.get('Exito') : 'Error',
                        texto: result.message,
                        botones: [{ texto: 'Entedido', color: 'accent' },]
                    }
                }).beforeClosed().toPromise().then(e => {
                    this.onRecuperarEnviado.emit();
                });
            })
            .catch(r => this.utilService.manejarError(r))
            .then(() => this.loading = false);
    }
}