"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BarComponent = void 0;
var core_1 = require("@angular/core");
var usuario_1 = require("../../../model/usuario");
var viajes_routing_module_1 = require("../../viajes/viajes-routing.module");
var administracion_general_routing_module_1 = require("../../administracion-general/administracion-general-routing.module");
// import { appSearch } from '../../app-routing.module';
var BarComponent = /** @class */ (function () {
    function BarComponent(utilService, sessionService, usuariosService, i18n, router) {
        var _this = this;
        this.utilService = utilService;
        this.sessionService = sessionService;
        this.usuariosService = usuariosService;
        this.i18n = i18n;
        this.router = router;
        this.appNavMenuHidden = true;
        // appNavMenuClass: string = 'app-nav-menu hidden';
        this.appNavMenuFilter = '';
        this.searchBarPlaceholder = "";
        this.searchBarClass = "appNavSearchBar blured";
        this.searchBarQuery = '';
        // WORKAROUND :( PARA EL AOT-COMPILATION
        this.baseHref = document.baseURI;
        /**
         * ARREGLO EN QUE SE GUARDAN LAS PANTALLAS FILTRADAS CON LA BARRA DE BUSQUEDA
         */
        this.searchScreens = [];
        /**
         * ARREGLO EN QUE SE GUARDAN LOS MODULOS FILTRADOS CON LA BARRA DE BUSQUEDA
         */
        this.searchSections = [];
        /**
         * MODULOS FILTRADOS PARA QUE SE MUESTREN EN EL MENU DE MODULOS
         */
        this.filteredModuloItems = [];
        /**
         * ARREGLO DE MODULOS PARA BUSQUEDAS (FUENTE PARA LAS BUSQUEDAS)
         */
        this.moduloItems = [];
        /**
         * ARREGLO DE PANTALLAS PARA BUSQUEDAS (FUENTE PARA LAS BUSQUEDAS)
         */
        this.pantallaItems = [];
        this.usuario = new usuario_1.Usuario();
        console.log("constructor");
        this.filteredModuloItems = [];
        /*if (localStorage.getItem('auth_token') === null) {
            this.router.navigateByUrl('/ingresar');
        } else { */
        /*this.sessionService
            .isSessionValid()
            .then(valid => {
                if (!valid) this.router.navigate(['/ingresar']);
                else */
        this.usuariosService
            .obtenerUsuario(localStorage.getItem('usuario'))
            .then(function (u) {
            _this.usuario = u;
            var items = [
                administracion_general_routing_module_1.ADMIN_GENERAL_ITEMS,
                //ADMIN_VIAJES_ITEMS,
                viajes_routing_module_1.VIAJES_ITEMS
            ];
            _this.pantallaItems = items.reduce(function (a, b) { return a.concat(b); }, []);
            _this.moduloItems = _this.pantallaItems
                .map(function (e) { return e.module; })
                .reduce(function (a, e) { return a.includes(e) ? a : a.concat([e]); }, [])
                .filter(function (e) { return e.isVisibleFor(_this.usuario); });
            /*
            this.pantallaItems
                .map(e => e.module)
                .filter(e => e && e.isVisibleFor(this.usuario))
                .forEach(e => {
                    if (this.moduloItems.includes(e)) return;
                    this.moduloItems.push(e);
                })
                */
            i18n.translate(null, _this.moduloItems);
            i18n.translate(null, _this.pantallaItems);
            _this.filteredModuloItems = _this.moduloItems.filter(function (e) { return true; });
        })["catch"](function (r) {
            console.log(r);
            console.log(r);
            _this.router.navigate(['/ingresar']);
        });
        //}
    }
    BarComponent.prototype.searchScore = function (sentence) {
        console.log("searchScore");
        var score = 0;
        var words = sentence.split(' ');
        for (var i = 0; i < words.length; i++)
            if (words[i].toLowerCase().startsWith(this.searchBarQuery.toLowerCase()))
                score += 10;
        return score;
    };
    BarComponent.prototype.onSearchBarChange = function () {
        var _this = this;
        console.log("onSearchBarChange");
        if (this.searchBarQuery.length == 0) {
            this.searchSections = [];
            this.searchScreens = [];
            return;
        }
        this.searchSections = this.moduloItems
            .filter(function (e) { return e.isVisibleFor(_this.usuario); })
            .filter(function (e) { return e.title.toLowerCase().includes(_this.searchBarQuery.toLowerCase()); });
        this.searchScreens = this.pantallaItems
            .filter(function (e) { return e.isVisibleFor(_this.usuario); })
            .filter(function (e) { return e.title.toLowerCase().includes(_this.searchBarQuery.toLowerCase()); })
            .sort(function (a, b) {
            return _this.searchScore(b.title) * (b.subtitle == '' ? 0.5 : 1) -
                _this.searchScore(a.title) * (a.subtitle == '' ? 0.5 : 1);
        });
    };
    BarComponent.prototype.onSearchSectionClick = function (e) {
        console.log("onSearchScreenClick");
        this.router.navigate([e.uri]);
    };
    BarComponent.prototype.onSearchScreenClick = function (e) {
        console.log("onSearchSectionClick");
        var uri = e.uri;
        if (e.module != null)
            uri = e.module.uri + '/' + uri;
        console.log(uri);
        this.router.navigate([uri]);
    };
    BarComponent.prototype.onSearchBarFocus = function () {
        console.log("onSearchBarFocus");
        this.searchBarClass = 'appNavSearchBar';
        this.searchBarPlaceholder = this.i18n.get('Encuentra pantallas u operaciones');
    };
    BarComponent.prototype.onSearchBarBlur = function () {
        console.log("onSearchBarBlur");
        this.searchBarClass = 'appNavSearchBar blured';
        this.searchBarPlaceholder = '';
        this.searchBarQuery = '';
        this.searchSections = [];
        this.searchScreens = [];
    };
    BarComponent.prototype.focusUserDiv = function () {
        console.log("focusUserDiv");
        this.userDiv.first.nativeElement.focus();
    };
    BarComponent.prototype.logout = function () {
        console.log("logout");
        localStorage.clear();
        this.sessionService.cerrarSesion();
        this.router.navigate(['/ingresar']);
        //this.sessionService.cerrarSesion().then(r => this.router.navigate(['/ingresar'])).catch(r => console.error(r));
    };
    BarComponent.prototype.openNavMenu = function () {
        if (window.matchMedia('(max-width:480px)').matches && // es mobile
            document.querySelectorAll('app-workspace-nav').length && // app-workspace-nav existe
            !this.utilService.workspaceNavMenuOpened // no está abierto ya
        ) {
            this.utilService.workspaceNavMenuOpened = true;
            return;
        }
        console.log("openNavMenu");
        // this.appNavMenuClass = 'app-nav-menu';
        this.utilService.appNavMenuHidden = false;
        this.appNavMenuFilterInput.nativeElement.focus();
    };
    BarComponent.prototype.closeAppNavMenu = function () {
        console.log("closeAppNavMenu");
        // this.appNavMenuClass = 'app-nav-menu hidden';
        this.utilService.appNavMenuHidden = true;
        this.appNavMenuFilterInput.nativeElement.blur();
    };
    BarComponent.prototype.onNavItemClick = function (e) {
        console.log("onNavItemClick");
        console.log(e.uri);
        this.router.navigate([e.uri]);
        this.closeAppNavMenu();
    };
    BarComponent.prototype.onNavHomeItemClick = function () {
        console.log('onNavHomeItemClick');
        this.router.navigate(['']);
        this.closeAppNavMenu();
    };
    BarComponent.prototype.filterChange = function () {
        var _this = this;
        console.log('filterChange');
        var ee = this.moduloItems;
        var ff = this.appNavMenuFilter;
        console.log(ee);
        console.log(ff);
        if (this.appNavMenuFilter == '') {
            this.filteredModuloItems = this.moduloItems;
        }
        else {
            this.filteredModuloItems = [];
            this.filteredModuloItems = this.moduloItems.filter(function (e) { return e.title.toLowerCase().indexOf(_this.appNavMenuFilter.toLowerCase()) > -1; });
        }
    };
    __decorate([
        core_1.ViewChildren('userDiv')
    ], BarComponent.prototype, "userDiv");
    __decorate([
        core_1.ViewChild('appNavMenuFilterInput', { static: true })
    ], BarComponent.prototype, "appNavMenuFilterInput");
    BarComponent = __decorate([
        core_1.Component({
            selector: 'app-bar',
            templateUrl: './bar.component.html',
            styleUrls: ['./bar.component.scss']
        })
    ], BarComponent);
    return BarComponent;
}());
exports.BarComponent = BarComponent;
