"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

exports.__esModule = true;
exports.CustomI18nService = void 0;

var core_1 = require("@angular/core"); // =====================


var en = new Map();
en.set('contelec.EnviarFactura', 'Submit invoice');
en.set('contelec.Cancelar', 'Cancel');
en.set('proveedores.x.estaAccionNoPuedeDeshacerce', 'This action cannot be undone, do you wish to submit the files?');
en.set('Proveedores', 'Vendors');
en.set('Entradas de mercancía', 'Goods receipts');
en.set('Carga de facturas', 'Incoming invoice uploading');
en.set('Carga de facturas con entradas de mercancía', 'Incoming invoice uploading with goods receipts');
en.set('Notas de crédito', 'Credit notes');
en.set('Carga de facturas con nota de crédito', 'Incoming invoice uploading with credit notes');
en.set('Consulta de facturas', 'Incoming invoice report');
en.set('Administración general', 'General Administration');
en.set('Usuarios', 'Users');
en.set('Administra los usuarios y sus permisos en el portal', 'Manage the users and their permissions');
en.set('Tareas programadas', 'Jobs');
en.set('Ejecuta las tareas programadas fuera de su horario normal', 'Force job executions');
en.set('Configuración general', 'General configurations');
en.set('Configuración particular del módulo general', 'Configurations specific to the general module');
en.set('Niveles para topes de carga', 'Load stop levels');
en.set('Configuración para los topes de carga de comprobante por nivel de usuario', 'Configuration for receipt loading stops per user level');
en.set('Cuentas contables', 'Accounting accounts');
en.set('Configuración para las subcuentas del empleado', 'Configuration for employee sub-accounts');
en.set('Administración de viajes', 'Travels Administration');
en.set('Tipos de viaje', 'Travel types');
en.set('Administra los tipos de viaje', 'Administrate the travel types');
en.set('Areas', 'Areas');
en.set('Administra las areas de viajeros', 'Administrate the travelers areas');
en.set('Tipos de clase de gasto', 'Expenses class types');
en.set('Administra los tipos de gasto por area', 'Manage the expenses class types by area');
en.set('Clases de gasto', 'Expenses classes');
en.set('Administra las clases de gasto por tipo', 'Manage expensess classes by type');
en.set('Reporte totalizador', 'Totalizer report');
en.set('Ejecuta el reporte de gastos de viaje', 'Run the travel expenses report');
en.set('Ejecuta tareas programadas de gastos de viaje', 'Force travel expenses jobs executions');
en.set('Configuración', 'Configuration');
en.set('Configuracion', 'Configuration');
en.set('Administra configuraciones especificas de gastos de viaje', 'Configurations specific to the travels expenses module');
en.set('Administración de caja chica', 'Petty Cash Administration');
en.set('Caja chica', 'Petty cash');
en.set('Cajas chicas', 'Petty cash (multiple)');
en.set('Administra las cajas chicas', 'Multiple petty cash administration');
en.set('Gastos caja', 'Petty cash expenses');
en.set('Administra los gastos caja', 'Petty cash expenses administration');
en.set('Configuración de caja chica', 'Petty cash configuration');
en.set('Configuraciones particulares de caja chica', 'Configurations specific to the petty cash module');
en.set('Nueva caja chica', 'New petty cash');
en.set('Viáticos', 'Travel expenses');
en.set('Nueva solicitud', '-');
en.set('Formulario para crear una nueva solicitud de viáticos', '-');
en.set('Tus solicitudes de viáticos abiertas', '-');
en.set('Administración de sus solicitudes abiertas', '-');
en.set('Tus solicitudes de viáticos cerradas', '-');
en.set('Historico de sus solicitudes de viáticos cerradas', '-');
en.set('Solicitudes pendientes por aprobar', '-');
en.set('Autorizaciones por sociedad', 'Authorizations by company');
en.set('Viajes esperando su autorización de primer nivel (por sociedad)', 'Travels waiting for level 1 authorization (company)');
en.set('Autorizaciones por centro de costo', 'Authorizations by cost center');
en.set('Viajes esperando su autorización de segundo nivel (por centro de costos)', 'Travels waiting for level 2 authorization (cost center)');
en.set('Autorizaciones de autorizadores', 'Authorizator authorizations');
en.set('Viajes de autorizadores esperando autorización de tercer nivel', 'Travels waiting for level 3 authorization');
en.set('Nueva solicitud de caja chica', 'New petty cash request');
en.set('Crea una nueva solicitud de contabilización de caja chica', 'Crea a new petty cash request');
en.set('Tus solicitudes pendientes', 'Your pending requests');
en.set('Reporte de viajes pendientes', '-');
en.set('Tus solicitudes de contabilización de caja chica', 'Your petty cash accounting requests');
en.set('Tus autorizaciones pendientes', 'Your pending authorizations');
en.set('Autorizaciones pendientes', 'Pending authorizations');
en.set('Solicitudes de contabilización de caja chica que esperan tu aprobación', 'Requests waiting for your approval');
en.set('Contabilizaciones pendientes', 'Pending accountings');
en.set('Solicitudes de contabilización listas para contabilizarse', 'Accounting requests ready to be accounted');
en.set('Tus solicitudes contabilizadas', 'Your accounted requests');
en.set('Cargar gastos de viajes', 'Upload travel expenses');
en.set('Autorizar viajes', 'Authorize travels');
en.set('Cargar facturas con orden de compra', 'Upload incoming invoices with purchase order');
en.set('Cargar facturas sin orden de compra', 'Upload incoming invoices without purchase order');
en.set('Autorizar gastos de viaje por centro de costo', 'Authorize travel expenses by cost center');
en.set('Responsable de caja chica', 'Responsible for a petty cash');
en.set('Autorizador de caja chica', 'Petty cash authorizer');
en.set('Autorizar gastos de viaje de autorizador de centro de costos', "Travel expenses authorizer' authorizer by cost center");
en.set('Contabilizar Caja Chica', 'Petty cash accounting authorizer');
en.set('Proveedor hotel', 'Hotel vendor');
en.set('Encuentra pantallas u operaciones', 'Find screens or actions');
en.set('Nueva solicitud de contabilización', 'New accounting request');
en.set("Credenciales incorrectas", "Wrong credentials");
en.set("El usuario o la contraseña no coinciden, verifique sus credenciales y pruebe de nuevo", "Credentials don't match. Verify and try again.");
en.set("Error de conexión", "Connection error");
en.set("No se logró la conexión con el servidor", "Can not establish connection to server");
en.set("Tus solicitudes contabilizadas", "Your accounted requests");
en.set("Autorizaciones pendientes", "Pending authorizations");
en.set("Contabilizaciones pendientes", "Pending accountings");
en.set("Empleados FB60", "Employees FB60");
en.set("Éxito", "Success");
en.set("Exito", "Success"); // =====================

var es = new Map();
en.forEach(function (v, k, m) {
  es.set(k, k);
});
es.set('contelec.EnviarFactura', 'Enviar factura');
es.set('contelec.Cancelar', 'Cancelar');
es.set('proveedores.x.estaAccionNoPuedeDeshacerce', 'Esta acción no puede deshacerce ¿Desea enviar los archivos?');
es.set('Proveedores', 'Proveedores');
es.set('Entradas de mercancía', 'Entradas de mercancía');
es.set('Carga de facturas', 'Carga de facturas');
es.set('Carga de facturas con entradas de mercancía', 'Carga de facturas con entradas de mercancía');
es.set('Notas de crédito', 'Notas de crédito');
es.set('Carga de facturas con nota de crédito', 'Carga de facturas con nota de crédito');
es.set('Consulta de facturas', 'Consulta de facturas'); // =====================

var CustomI18nService =
/** @class */
function () {
  function CustomI18nService(localeId) {
    this.localeId = localeId;
  }

  CustomI18nService.prototype.translate = function (moduleItem, items) {
    var _this = this;

    if (moduleItem && !moduleItem.traducido) {
      moduleItem.title = this.get(moduleItem.title);
      moduleItem.subtitle = this.get(moduleItem.subtitle);
      moduleItem.traducido = true;
    }

    if (items) items.filter(function (e) {
      return !e.traducido;
    }).forEach(function (e) {
      e.title = _this.get(e.title);
      e.subtitle = _this.get(e.subtitle);
      e.traducido = true;
    });
  };

  CustomI18nService.prototype.get = function (key) {
    // console.log(key + " .. " + this.localeId)
    if (!key) return key;
    var map = this.map(this.localeId);
    if (!map.has(key)) throw "La llave '" + key + "' no se encuentra";
    return map.get(key);
  };

  CustomI18nService.prototype.map = function (locale) {
    // console.log(locale);
    if (locale == 'es' || locale.startsWith("es")) return es;
    if (locale == 'en' || locale.startsWith("en")) return en;
    throw "Locale '" + locale + "' no se encuentra";
  };

  CustomI18nService = __decorate([core_1.Injectable({
    providedIn: 'root'
  }), __param(0, core_1.Inject(core_1.LOCALE_ID))], CustomI18nService);
  return CustomI18nService;
}();

exports.CustomI18nService = CustomI18nService;