import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { Usuario } from '../../../model/usuario';
// import { appSearch } from '../../app-routing.module';

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


    grupos: string[] = [];
    pantallas: any = {};

    // WORKAROUND :( PARA EL AOT-COMPILATION
    baseHref = document.baseURI;

    constructor(private se: SessionService, private router: Router) {

        let appSearch: CustomSearchItem[] = [];

        se.getUsuario().then(usuario => {

            console.log("BACALAO");

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
                console.log(key);
                if (key == 'Inicio') continue;
                this.grupos.push(key);
            }

            // SI EL USUARIO ES EMPLEADO Y TIENE PERMISO DE CAJA CHICA REDIRIGIR A EL MODULO DE CAJA CHICA
            if ((usuario) &&
                (usuario.rol && usuario.rol.id == 2) &&
                (usuario.permisos && usuario.permisos.find(e => e.id == 7))
            ) this.router.navigateByUrl('caja-chica');

        });
    }

    ngOnInit(): void {
    }
}
