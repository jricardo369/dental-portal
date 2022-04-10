import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../../app.config';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
    selector: 'carga-masiva-de-usuarios-component',
    templateUrl: './carga-masiva-de-usuarios.component.html'
})
export class CargaMasivaDeUsuariosComponent {

    subiendoLayout = false;
    file: File = null;
    archivotext = '';
    clasebutton = '';

    cargando = false;
    confirmar = null;
    mostrarMensaje = false;
    tituloMensaje = "";
    textoMensaje = "";

    constructor(private router: Router, private usuariosService: UsuariosService) { this.actualizarTexto(); }

    actualizarTexto() {
        this.clasebutton = this.file == null ? 'fake-button accent' : 'fake-button';
        this.archivotext = this.file == null ? 'Sin archivo' : 'El archivo seleccionado pesa ' + this.file.size + " bytes";
    }

    descargarLayoutDeEjemplo() {
        let url = API_URL + 'config/users/layout';
        window.open(url);
    }

    fileChangeEvent(event: Event) {
        let srcElement = event.srcElement as HTMLInputElement;
        this.file = null;
        for (let i = 0; i < srcElement.files.length; i++)
            this.file = srcElement.files[i];
        this.actualizarTexto();
    }

    cancelar() {
        this.router.navigate(['administracion/general/usuarios']);
    }

    test() {
        this.mostrarMensaje = true;
        this.tituloMensaje = "Cargar layout";
        this.textoMensaje = "Esta por cargar el layout de carga masiva de usuarios, esta carga es irreversible ¿desea realizar la carga masiva de usuarios?";
        this.confirmar = () => {
            this.mostrarMensaje = false;
            this.cargando = true;
            this.confirmar = null;
            this.usuariosService.cargaMasivaDeUsuarios(this.file).then(r => {
                this.cargando = false;
                this.mostrarMensaje = true;
                this.tituloMensaje = r.status;
                this.textoMensaje = r.message;
            }).catch(r => {
                this.cargando = false;
                this.mostrarMensaje = true;
                this.tituloMensaje = "Error";
                this.textoMensaje = r;
            });
        };
    }
}