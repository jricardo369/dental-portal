"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = exports.slideInAnimation = void 0;
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
exports.slideInAnimation = animations_1.trigger('myAnimationGus', [
    animations_1.transition('* => *', [
        animations_1.query(':enter .workspace', [animations_1.style({
                opacity: 0,
                transform: 'translateX(-10px)'
            })], { optional: true }),
        animations_1.query(':leave .workspace', [animations_1.style({
                opacity: 1
            }),
            animations_1.animate('0.1s', animations_1.style({
                opacity: 0
            }))], { optional: true }),
        animations_1.query(':enter .workspace', [animations_1.style({
                opacity: 0,
                transform: 'translateX(-10px)'
            }),
            animations_1.animate('0.2s', animations_1.style({
                opacity: 1,
                transform: 'translateX(-0%)'
            }))], { optional: true })
    ])
]);
var AppComponent = /** @class */ (function () {
    function AppComponent(utilService, sessionService, iconRegistry, sanitizer, router) {
        this.utilService = utilService;
        this.sessionService = sessionService;
        this.iconRegistry = iconRegistry;
        this.sanitizer = sanitizer;
        this.router = router;
        this.title = 'contelec-app';
        this.isRouterOutletVisible = false;
        this.isAppBarVisible = false;
        [
            'menu', 'search', 'stop', 'account-circle', 'arrow-forward', 'check-box-outline-blank', 'star',
            'box', 'delete', 'refresh', 'add-box', 'oval', 'check-box', 'edit', 'more-vert', 'fedora-hat',
            'arrow-back', 'arrow-forward', 'person', 'security', 'done', 'done-all',
            'add', 'remove', 'airplane', 'areas', 'bar-code', 'print',
            'clasesg', 'close', 'file-upload', 'file-download', 'filter-list',
            'gi', 'group', 'remove-shopping-cart', 'report',
            'shop', 'shopping-cart', 'sort', 'tclases', 'test', 'cancel',
            'test2', 'travel', 'trolley', 'update', 'settings',
            'assignment', 'assignment-ind', 'assignment-turned-in',
            'information', 'questions', 'alert', 'pending-black', 'to-do-list', 'pending-actions',
        ].forEach(function (e) { return iconRegistry.addSvgIcon(e, sanitizer.bypassSecurityTrustResourceUrl(document.baseURI + '/assets/svg/' + e + '.svg')); });
        localStorage.clear();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.sessionService.addListener(this);
        /*this.sessionService
            .isSessionValid()
            .then(isValid => {
                if (!isValid) {
                    this.isAppBarVisible = false;
                    this.router.navigateByUrl('/ingresar');
                } else { this.isAppBarVisible = true; }
            })
            .catch(reason => alert(reason))
            .then(() => this.isRouterOutletVisible = true);*/
        if (localStorage.getItem('auth_token') === null) {
            this.isAppBarVisible = false;
            this.isRouterOutletVisible = true;
            this.router.navigateByUrl('/ingresar');
        }
    };
    AppComponent.prototype.onIniciarSesion = function () {
        this.isAppBarVisible = true;
    };
    AppComponent.prototype.onCerrarSesion = function () {
        this.isAppBarVisible = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            animations: [
                exports.slideInAnimation
            ]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
