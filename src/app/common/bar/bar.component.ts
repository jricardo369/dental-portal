import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../model/usuario';
import { AppBarNavItem } from '../../app-nav-item';
import { SessionService } from '../../services/session.service';
import { ViajesRoutingModule, VIAJES_ITEMS } from '../../viajes/viajes-routing.module';
import { PROVEEDORES_ITEMS } from '../../proveedores/proveedores-routing.module';
import { ADMIN_CAJA_CHICA_ITEMS } from '../../administracion-caja-chica/administracion-caja-chica-routing.module';
import { ADMIN_GENERAL_ITEMS } from '../../administracion-general/administracion-general-routing.module';
import { ADMIN_VIAJES_ITEMS } from '../../administracion-viajes/administracion-viajes-routing.module';
import { CAJA_CHICA_ITEMS } from '../../caja-chica/caja-chica-routing.module';

import { CustomI18nService } from 'src/app/custom-i18n.service';
import { UtilService } from 'src/app/services/util.service';
// import { appSearch } from '../../app-routing.module';

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.scss']
})
export class BarComponent {

    appNavMenuHidden = true;

    @ViewChildren('userDiv') userDiv;
    @ViewChild('appNavMenuFilterInput', { static: true }) appNavMenuFilterInput;

    // appNavMenuClass: string = 'app-nav-menu hidden';
    appNavMenuFilter: string = '';

    searchBarPlaceholder: string = "";
    searchBarClass: string = "appNavSearchBar blured";
    searchBarQuery: string = '';

    // WORKAROUND :( PARA EL AOT-COMPILATION
    baseHref = document.baseURI;

    /**
     * ARREGLO EN QUE SE GUARDAN LAS PANTALLAS FILTRADAS CON LA BARRA DE BUSQUEDA
     */
    searchScreens = [];

    /**
     * ARREGLO EN QUE SE GUARDAN LOS MODULOS FILTRADOS CON LA BARRA DE BUSQUEDA
     */
    searchSections = [];

    /**
     * MODULOS FILTRADOS PARA QUE SE MUESTREN EN EL MENU DE MODULOS
     */
    filteredModuloItems: AppBarNavItem[] = [];

    /**
     * ARREGLO DE MODULOS PARA BUSQUEDAS (FUENTE PARA LAS BUSQUEDAS)
     */
    moduloItems: AppBarNavItem[] = [];

    /**
     * ARREGLO DE PANTALLAS PARA BUSQUEDAS (FUENTE PARA LAS BUSQUEDAS)
     */
    pantallaItems: AppBarNavItem[] = [];

    usuario: Usuario = new Usuario();

    constructor(
        public utilService: UtilService,
        private sessionService: SessionService,
        private i18n: CustomI18nService,
        private router: Router,
    ) {
        console.log("constructor");

        this.filteredModuloItems = [];

        this.sessionService
            .isSessionValid()
            .then(valid => {
                if (!valid) this.router.navigate(['/ingresar']);
                else this.sessionService
                    .getUsuario()
                    .then(u => {

                        this.usuario = u;

                        let items = [
                            ADMIN_CAJA_CHICA_ITEMS, 
                            ADMIN_GENERAL_ITEMS, 
                            ADMIN_VIAJES_ITEMS, 
                            PROVEEDORES_ITEMS, 
                            CAJA_CHICA_ITEMS, 
                            VIAJES_ITEMS
                        ];

                        this.pantallaItems = items.reduce((a, b) => a.concat(b), []);
                        this.moduloItems = this.pantallaItems
                            .map(e => e.module)
                            .reduce((a, e) => a.includes(e) ? a : a.concat([e]), [] as AppBarNavItem[])
                            .filter(e => e.isVisibleFor(this.usuario));

                        /*
                        this.pantallaItems
                            .map(e => e.module)
                            .filter(e => e && e.isVisibleFor(this.usuario))
                            .forEach(e => {
                                if (this.moduloItems.includes(e)) return;
                                this.moduloItems.push(e);
                            })
                            */

                        i18n.translate(null, this.moduloItems);
                        i18n.translate(null, this.pantallaItems);

                        this.filteredModuloItems = this.moduloItems.filter(e => true);
                    });
            })
            .catch(r => {
                console.log(r); console.log(r); this.router.navigate(['/ingresar']);
            });
    }

    private searchScore(sentence: string): number {

        console.log("searchScore");

        let score = 0;
        let words = sentence.split(' ');
        for (let i = 0; i < words.length; i++)
            if (words[i].toLowerCase().startsWith(this.searchBarQuery.toLowerCase()))
                score += 10;
        return score;
    }

    onSearchBarChange() {
        console.log("onSearchBarChange");

        if (this.searchBarQuery.length == 0) {
            this.searchSections = [];
            this.searchScreens = [];
            return;
        }

        this.searchSections = this.moduloItems
            .filter(e => e.isVisibleFor(this.usuario))
            .filter(e => e.title.toLowerCase().includes(this.searchBarQuery.toLowerCase()));

        this.searchScreens = this.pantallaItems
            .filter(e => e.isVisibleFor(this.usuario))
            .filter(e => e.title.toLowerCase().includes(this.searchBarQuery.toLowerCase()))
            .sort((a, b) =>
                this.searchScore(b.title) * (b.subtitle == '' ? 0.5 : 1) -
                this.searchScore(a.title) * (a.subtitle == '' ? 0.5 : 1)
            );
    }

    onSearchSectionClick(e: AppBarNavItem) {
        console.log("onSearchScreenClick");
        this.router.navigate([e.uri]);
    }

    onSearchScreenClick(e) {
        console.log("onSearchSectionClick");
        let uri = e.uri;
        if (e.module != null)
            uri = e.module.uri + '/' + uri;
        console.log(uri);
        this.router.navigate([uri]);
    }

    onSearchBarFocus() {
        console.log("onSearchBarFocus");
        this.searchBarClass = 'appNavSearchBar';
        this.searchBarPlaceholder = this.i18n.get('Encuentra pantallas u operaciones');
    }

    onSearchBarBlur() {
        console.log("onSearchBarBlur");
        this.searchBarClass = 'appNavSearchBar blured';
        this.searchBarPlaceholder = '';
        this.searchBarQuery = '';
        this.searchSections = [];
        this.searchScreens = [];
    }

    focusUserDiv() {
        console.log("focusUserDiv");
        this.userDiv.first.nativeElement.focus();
    }

    logout() {
        console.log("logout");
        this.sessionService.cerrarSesion().then(r => this.router.navigate(['/ingresar'])).catch(r => console.error(r));
    }

    openNavMenu() {

        if (
            window.matchMedia('(max-width:480px)').matches && // es mobile
            document.querySelectorAll('app-workspace-nav').length && // app-workspace-nav existe
            !this.utilService.workspaceNavMenuOpened // no está abierto ya
        ) {
            this.utilService.workspaceNavMenuOpened = true;
            return;
        }

        console.log("openNavMenu");
        //this.appNavMenuClass = 'app-nav-menu';
        this.utilService.appNavMenuHidden = false;
        this.appNavMenuFilterInput.nativeElement.focus();
    }

    closeAppNavMenu() {
        console.log("closeAppNavMenu");
        //this.appNavMenuClass = 'app-nav-menu hidden';
        this.utilService.appNavMenuHidden = true;
        this.appNavMenuFilterInput.nativeElement.blur();
    }

    onNavItemClick(e: AppBarNavItem) {
        console.log("onNavItemClick");
        console.log(e.uri);
        this.router.navigate([e.uri]);
        this.closeAppNavMenu();
    }

    onNavHomeItemClick() {
        console.log('onNavHomeItemClick')
        this.router.navigate(['']);
        this.closeAppNavMenu();
    }

    filterChange() {
        console.log('filterChange')
        let ee = this.moduloItems;
        let ff = this.appNavMenuFilter;
        console.log(ee);
        console.log(ff);
        if (this.appNavMenuFilter == '') {
            this.filteredModuloItems = this.moduloItems;
        } else {
            this.filteredModuloItems = [];
            this.filteredModuloItems = this.moduloItems.filter(e => e.title.toLowerCase().indexOf(this.appNavMenuFilter.toLowerCase()) > -1);
        }
    }

}
