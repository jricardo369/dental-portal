"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var icon_1 = require("@angular/material/icon");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var slider_1 = require("@angular/material/slider");
var select_1 = require("@angular/material/select");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var session_service_1 = require("./services/session.service");
var http_1 = require("@angular/common/http");
var login_component_1 = require("./common/login/login.component");
var bar_component_1 = require("./common/bar/bar.component");
var inicio_component_1 = require("./common/inicio/inicio.component");
var dialogo_simple_component_1 = require("./common/dialogo-simple/dialogo-simple.component");
var forms_1 = require("@angular/forms");
var login_form_component_1 = require("./common/login-form/login-form.component");
var dialogo_login_component_1 = require("./common/dialogo-login/dialogo-login.component");
var dialogo_frame_component_1 = require("./common/dialogo-frame/dialogo-frame.component");
var common_1 = require("@angular/common");
var es_MX_1 = require("@angular/common/locales/es-MX");
common_1.registerLocaleData(es_MX_1["default"], 'es-Mx');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                //
                bar_component_1.BarComponent,
                //
                inicio_component_1.InicioComponent,
                dialogo_simple_component_1.DialogoSimpleComponent,
                dialogo_login_component_1.DialogoLoginComponent,
                dialogo_frame_component_1.DialogoFrameComponent,
                login_form_component_1.LoginFormComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                icon_1.MatIconModule,
                dialog_1.MatDialogModule,
                button_1.MatButtonModule,
                progress_spinner_1.MatProgressSpinnerModule,
                slider_1.MatSliderModule,
                select_1.MatSelectModule
            ],
            entryComponents: [
                dialogo_simple_component_1.DialogoSimpleComponent,
                dialogo_login_component_1.DialogoLoginComponent,
                dialogo_frame_component_1.DialogoFrameComponent,
            ],
            providers: [
                session_service_1.SessionService,
                { provide: core_1.LOCALE_ID, useValue: "es-MX" },
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
