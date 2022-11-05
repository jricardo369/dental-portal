import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../model/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SessionService } from 'src/app/services/session.service';
import { UtilService } from 'src/app/services/util.service';
import { PacientesService } from '../../services/pacientes.service';
import { BarComponent } from '../bar/bar.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface CustomSearchItem {
    title: string,
    subtitle: string,
    component: any,
    uri: string,
    isVisibleFor(u: Usuario): boolean
};

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

    numeroUser: any;
    rolUser: any;
    proxCita;
    usuario;
    rolUsuario;
    

    grupos: string[] = [];
    pantallas: any = {};

    // WORKAROUND :( PARA EL AOT-COMPILATION
    baseHref = document.baseURI;

    loading = false;
    sInterval: any;
    constructor(private usuarios: UsuariosService, 
        private utilService: UtilService,
        public router: Router, 
        private domSanitizer: DomSanitizer, 
        private paciente: PacientesService,
        private sessionService: SessionService
        ) {
        

        // let usuario: Usuario = JSON.parse(localStorage.getItem('objUsuario'));     
        
        // this.numeroPaciente = usuario.paciente;
        // console.log("Numero Paciente", this.numeroPaciente);
        // this.rolUsuario = usuario.rol;
        // console.log(this.rolUsuario, "Rol de usuario");
        
        // if (this.rolUsuario === '3') {
        //     console.log("usuario cliente");       
        // }        


        // this.utilService.deshabilitaRetroceso();

        this.sInterval = setInterval(() => {
            if (localStorage.getItem('auth_token') == null) {
                this.utilService.limpiarContadorDeSesion();
                this.sessionService.cerrarSesion();
                this.router.navigate(['/ingresar']);
                clearInterval(this.sInterval);
            }
        }, 1000);

        let appSearch: CustomSearchItem[] = [];
        if (localStorage.getItem('auth_token') !== null) {
            this.obtenerUsuario(usuarios, appSearch);
        }             
    }

    obtenerUsuario(usuarios: UsuariosService, appSearch: CustomSearchItem[]) {
        this.loading = true;
        usuarios.obtenerUsuarioPorUsuario(localStorage.getItem('usuario')).then(usuario => {
            
            localStorage.setItem('objUsuario', JSON.stringify(usuario)); 
            this.rolUser= usuario.rol;  
            this.numeroUser = usuario.paciente;

            if (this.rolUser === '3') {
            this.citaPaciente();      
            } 

            let groups = {};
            appSearch.filter(e => e.isVisibleFor(usuario)).forEach(e => {
                let group: any[] = groups[e.subtitle];
                if (!group) {
                    group = [];
                    groups[e.subtitle] = group;
                }
                group.push(e);
            });
            this.pantallas = groups;
            
            this.grupos.length = 0;
            for (let key in groups) {
                if (key == 'Inicio') continue;
                this.grupos.push(key);
            }
        }).then(() => this.loading = false);
    }

    citaPaciente(){

        this.paciente.citasPacientes(this.numeroUser).subscribe((response: any) => {
            this.proxCita = response.body;    
          });     
    }

    ngOnInit() {
    }
}
