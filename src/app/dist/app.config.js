"use strict";
exports.__esModule = true;
exports.withLeadingZeros = exports.dateAsYYYYMMDD = exports.removeNullProperties = exports.safeToISOString = exports.safeYYYY_MM_DD = exports.parse_DD_MM_YYYY = exports.API_URL = exports.EMPRESA_PORTAL = exports.VERSION_PORTAL = void 0;
var environment_1 = require("../environments/environment");
exports.VERSION_PORTAL = 'Versión 2020.10.25-13:24';
exports.EMPRESA_PORTAL = '© Grupo Nu3 / 2020';
// =====================================================
// ASI SE BUILDEA, COMO EL DE ABAJO
//    ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobal --deploy-url /ContelecAnglobal/
//    ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobalAux --deploy-url /ContelecAnglobalAux/
//
/*
REM PARA BUILDEAR SE NECESITA BUILDEAR TANTO INGLÉS COMO ESPAÑOL, SON DOS APPS
ng build --prod --optimization --build-optimizer --aot --base-href /portal-viaticos/en/ --deploy-url /portal-viaticos/en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/portal-viaticos/en
ng build --prod --optimization --build-optimizer --aot --base-href /portal-viaticos/es/ --deploy-url /portal-viaticos/es/ --i18n-locale=es --output-path=dist/portal-viaticos/es
dir
REM ESTE ES PARA LA VERSION EN RAIZ
ng build --prod --optimization --build-optimizer --aot --base-href /en/ --deploy-url /en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/ROOT/en
ng build --prod --optimization --build-optimizer --aot --base-href /es/ --deploy-url /es/ --i18n-locale=es --output-path=dist/ROOT/es
dir
*/
//
//
// =====================================================
// ASI SE GENERA EL ARCHIVO DE TRADUCCION (HAY QUE EDITARLO Y CAMBIARLO DE NOMBRE Y PEGARLO EN OTRA RUTA)
//     ng xi18n --output-path translate
// Y ASI SE CORRE EN INGLÉS (O EN ESPAÑOL)
//     ng serve --configuration=en
//     ng serve --configuration=es
// =====================================================
var documentBsaeUriWithoutLanguage = document.baseURI
    .replace("/es/", "")
    .replace("/en/", "")
    .replace("/portal-viaticos", "/viaticos-api");
var productionApiUrl = documentBsaeUriWithoutLanguage + "/"; // PRODUCCION
var localhostApiUrl = location.protocol + '//' + location.hostname + ':8082/viaticos-api/'; // LOCAL
if (environment_1.environment.production) {
    // PRO
}
else {
    // localhostApiUrl = "http://cdda42632e4c.ngrok.io/";
    localhostApiUrl = 'http://189.195.139.130:8082/viaticos-api/';
}
// ====================================
// COMO YA SON TRES API, YA NO VAMOS A USAR ESTE BLOQUE
if (false) {
    console.error("CUIDADO CON LA URI DEL API QUE ESTA EN DATO DURO Y APUNTANDO A SISTEMACONTABILIDAD, ESTE BUILD NO ES PARA PRO, ES QAS MAX!");
    console.error("ESTO ES PARA ContelecAnglobalAux");
    productionApiUrl = '/SistemaContabilidad/';
    productionApiUrl = 'http://52.177.194.193:18080/SistemaContabilidad/';
    // localhostApiUrl = 'http://52.177.194.193:18080/SistemaContabilidad/'; 
    // localhostApiUrl = 'http://192.168.1.97:8080/ContelecAnglobalApi/'; // IP NASOFT TEMP
}
// ====================================
// localhostApiUrl = 'http://52.177.194.193:18080/SistemaContabilidad/'; // NASOFT QAS
// localhostApiUrl = 'http://77.240.116.201:28080/SistemaContabilidad/';
// localhostApiUrl = 'http://187.216.220.138:8080/SistemaContabilidad/'; // MASISA QAS
// localhostApiUrl = 'http://52.177.174.104/SistemaContabilidad/'; // NASOFT PRO
// localhostApiUrl = 'http://187.237.62.196:8080/SistemaContabilidad/'; // INFRA QAS
exports.API_URL = environment_1.environment.production ? productionApiUrl : localhostApiUrl;
// export const BASE_URI: String = document.baseURI;
// export const ASSETS_URI: String = BASE_URI + '/';
/**
 * Recibe una fecha en formato DD-MM-YYYY y retorna un objeto Date acorde
 *                             0123456789
 * (pueden ser / en lugar de - o espacios o cualquier caractér)
 * @param date
 */
function parse_DD_MM_YYYY(date) {
    if (!date) {
        console.error('no se recibió un texto');
        return undefined;
    }
    if (date.length != 10) {
        console.error('no se recibió un texto con longitud de 10');
        return null;
    }
    return new Date(Number.parseInt(date.substring(6, 6 + 4)), Number.parseInt(date.substring(3, 3 + 2)) - 1, Number.parseInt(date.substring(0, 0 + 2)));
}
exports.parse_DD_MM_YYYY = parse_DD_MM_YYYY;
function safeYYYY_MM_DD(date) {
    if (!date) {
        console.error('no se recibió un texto');
        return undefined;
    }
    if (date.length != 10) {
        console.error('no se recibió un texto con longitud de 10');
        return null;
    }
    var d = new Date(Number.parseInt(date.substring(0, 0 + 4)), Number.parseInt(date.substring(5, 5 + 2)) - 1, Number.parseInt(date.substring(8, 8 + 2)));
    console.log('EXO');
    return d;
}
exports.safeYYYY_MM_DD = safeYYYY_MM_DD;
function safeToISOString(date) {
    var yyyy = '' + date.getFullYear();
    var MM = '' + (date.getMonth() + 1);
    var dd = '' + date.getDate();
    var hh = '' + date.getHours();
    var mm = '' + date.getMinutes();
    var ss = '' + date.getSeconds();
    while (MM.length < 2)
        MM = '0' + MM;
    while (dd.length < 2)
        dd = '0' + dd;
    while (hh.length < 2)
        hh = '0' + hh;
    while (mm.length < 2)
        mm = '0' + mm;
    while (ss.length < 2)
        ss = '0' + ss;
    return yyyy + '-' + MM + '-' + dd + 'T' + hh + ':' + mm + ':' + ss + '.000Z';
}
exports.safeToISOString = safeToISOString;
function removeNullProperties(entity) {
    if (!entity)
        return;
    for (var key in entity) {
        if (entity[key] == null) {
            delete entity[key];
        }
    }
    return entity;
}
exports.removeNullProperties = removeNullProperties;
function dateAsYYYYMMDD(date) {
    return '' + date.getFullYear() + withLeadingZeros((date.getMonth() + 1), 2) + withLeadingZeros((date.getDate()), 2);
}
exports.dateAsYYYYMMDD = dateAsYYYYMMDD;
function withLeadingZeros(integer, digits) {
    var n = '' + Number.parseInt('' + integer);
    for (var i = n.length; i < digits; i++)
        n = '0' + n;
    return n;
}
exports.withLeadingZeros = withLeadingZeros;
