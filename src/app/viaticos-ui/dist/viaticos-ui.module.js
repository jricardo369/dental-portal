"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViaticosUiModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var workspace_nav_component_1 = require("../common/workspace-nav/workspace-nav.component");
var icon_1 = require("@angular/material/icon");
var experimental_menu_component_1 = require("../common/experimental-menu/experimental-menu.component");
var bitacora_component_1 = require("../common/bitacora/bitacora.component");
// import { DropdownComponent } from '../common/dropdown/dropdown.component';
var ViaticosUiModule = /** @class */ (function () {
    function ViaticosUiModule() {
    }
    ViaticosUiModule = __decorate([
        core_1.NgModule({
            declarations: [
                workspace_nav_component_1.WorkspaceNavComponent,
                experimental_menu_component_1.ExperimentalMenuComponent,
                bitacora_component_1.BitacoraComponent,
            ],
            imports: [
                common_1.CommonModule,
                icon_1.MatIconModule
            ],
            exports: [
                workspace_nav_component_1.WorkspaceNavComponent,
                experimental_menu_component_1.ExperimentalMenuComponent,
                bitacora_component_1.BitacoraComponent,
            ]
        })
    ], ViaticosUiModule);
    return ViaticosUiModule;
}());
exports.ViaticosUiModule = ViaticosUiModule;
