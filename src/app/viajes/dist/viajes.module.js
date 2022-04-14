"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViajesModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var slider_1 = require("@angular/material/slider");
var select_1 = require("@angular/material/select");
var viajes_routing_module_1 = require("./viajes-routing.module");
var viajes_component_1 = require("./viajes/viajes.component");
var home_component_1 = require("./home/home.component");
var viajes_nav_component_1 = require("./viajes-nav/viajes-nav.component");
var dialog_1 = require("@angular/material/dialog");
var icon_1 = require("@angular/material/icon");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var stepper_1 = require("@angular/material/stepper");
var viaje_component_1 = require("./viaje/viaje.component");
var forms_1 = require("@angular/forms");
var comprobante_component_1 = require("./comprobante/comprobante.component");
var comprobante_form_component_1 = require("./comprobante-form/comprobante-form.component");
var dialogo_comprobante_component_1 = require("./dialogo-comprobante/dialogo-comprobante.component");
var viaticos_ui_module_1 = require("../viaticos-ui/viaticos-ui.module");
var solicitudes_pendientes_component_1 = require("./solicitudes-pendientes/solicitudes-pendientes.component");
var solicitud_pendiente_component_1 = require("./solicitud-pendiente/solicitud-pendiente.component");
var comprobaciones_contador_component_1 = require("./comprobaciones-contador/comprobaciones-contador.component");
var comprobacion_pendiente_component_1 = require("./comprobacion-pendiente/comprobacion-pendiente.component");
var reporte_viajes_component_1 = require("./reporte-viajes/reporte-viajes.component");
var reporte_viajes_detalle_component_1 = require("./reporte-viajes-detalle/reporte-viajes-detalle.component");
var poliza_component_1 = require("./poliza/poliza.component");
var ViajesModule = /** @class */ (function () {
    function ViajesModule() {
    }
    ViajesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                viajes_routing_module_1.ViajesRoutingModule,
                icon_1.MatIconModule,
                progress_spinner_1.MatProgressSpinnerModule,
                dialog_1.MatDialogModule,
                forms_1.FormsModule,
                stepper_1.MatStepperModule,
                viaticos_ui_module_1.ViaticosUiModule,
                slider_1.MatSliderModule,
                select_1.MatSelectModule
            ],
            entryComponents: [
                dialogo_comprobante_component_1.DialogoComprobanteComponent
            ],
            declarations: [
                viajes_component_1.ViajesComponent,
                home_component_1.HomeComponent,
                viajes_nav_component_1.ViajesNavComponent,
                viaje_component_1.ViajeComponent,
                comprobante_component_1.ComprobanteComponent,
                comprobante_form_component_1.ComprobanteFormComponent,
                dialogo_comprobante_component_1.DialogoComprobanteComponent,
                solicitudes_pendientes_component_1.SolicitudesPendientesComponent,
                solicitud_pendiente_component_1.SolicitudPendienteComponent,
                reporte_viajes_component_1.ReporteViajesComponent,
                reporte_viajes_detalle_component_1.ReporteViajesDetalleComponent,
                comprobaciones_contador_component_1.ComprobacionesContadorComponent,
                comprobacion_pendiente_component_1.ComprobacionPendienteComponent,
                poliza_component_1.PolizaComponent
            ]
        })
    ], ViajesModule);
    return ViajesModule;
}());
exports.ViajesModule = ViajesModule;
