import { environment } from '../environments/environment';

export const VERSION_PORTAL = "Versión 2019.10.25-13:24";
export const EMPRESA_PORTAL = "© ANGLOBAL / 2019";

// =====================================================
// ASI SE BUILDEA, COMO EL DE ABAJO
//    ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobal --deploy-url /ContelecAnglobal/
//    ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobalAux --deploy-url /ContelecAnglobalAux/
//
/*

REM PARA BUILDEAR SE NECESITA BUILDEAR TANTO INGLÉS COMO ESPAÑOL, SON DOS APPS

ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobal/en/ --deploy-url /ContelecAnglobal/en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/ContelecAnglobal/en
ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobal/es/ --deploy-url /ContelecAnglobal/es/ --i18n-locale=es --output-path=dist/ContelecAnglobal/es
dir

ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAgileThought/en/ --deploy-url /ContelecAgileThought/en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/ContelecAgileThought/en
ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAgileThought/es/ --deploy-url /ContelecAgileThought/es/ --i18n-locale=es --output-path=dist/ContelecAgileThought/es

ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAgileThoughtECC/en/ --deploy-url /ContelecAgileThoughtECC/en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/ContelecAgileThoughtECC/en
ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAgileThoughtECC/es/ --deploy-url /ContelecAgileThoughtECC/es/ --i18n-locale=es --output-path=dist/ContelecAgileThoughtECC/es


REM ESTE ES PARA LA VERSION AUXILIAR, LA DE CAJA CHICA

ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobalAux/en/ --deploy-url /ContelecAnglobalAux/en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/ContelecAnglobalAux/en
ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobalAux/es/ --deploy-url /ContelecAnglobalAux/es/ --i18n-locale=es --output-path=dist/ContelecAnglobalAux/es
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

let documentBsaeUriWithoutLanguage = document.baseURI
    .replace("/es/", "")
    .replace("/en/", "");

let productionApiUrl = documentBsaeUriWithoutLanguage + "Api/"; // PRODUCCION
let localhostApiUrl = location.protocol + '//' + location.hostname + ':8080/ContelecAgileThoughtApiECC/'; // LOCAL

if (environment.production) {
    // PRO
} else {
    localhostApiUrl = "http://localhost:8080/portal/";
    // localhostApiUrl = "http://52.177.194.193:18090/ContelecAgileThoughtApi/";
    // localhostApiUrl = "http://52.177.194.193:18080/ContelecAnglobalAuxApi/";
    // localhostApiUrl = "http://52.177.194.193:18080/ContelecAgileThoughtApi/";
}

// ====================================

// COMO YA SON TRES API, YA NO VAMOS A USAR ESTE BLOQUE
if (false) {
    console.error("CUIDADO CON LA URI DEL API QUE ESTA EN DATO DURO Y APUNTANDO A SISTEMACONTABILIDAD, ESTE BUILD NO ES PARA PRO, ES QAS MAX!");
    console.error("ESTO ES PARA ContelecAnglobalAux")
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

export const API_URL = environment.production ? productionApiUrl : localhostApiUrl;

// export const BASE_URI: String = document.baseURI;
// export const ASSETS_URI: String = BASE_URI + '/';

/**
 * Recibe una fecha en formato DD-MM-YYYY y retorna un objeto Date acorde 
 *                             0123456789
 * (pueden ser / en lugar de - o espacios o cualquier caractér)
 * @param date 
 */
export function parse_DD_MM_YYYY(date: string): Date {
    if (!date) {
        console.error('no se recibió un texto');
        return undefined;
    }
    if (date.length != 10) {
        console.error('no se recibió un texto con longitud de 10');
        return null;
    }
    return new Date(
        Number.parseInt(date.substring(6, 6 + 4)),
        Number.parseInt(date.substring(3, 3 + 2)) - 1,
        Number.parseInt(date.substring(0, 0 + 2))
    );
}

export function safeYYYY_MM_DD(date: string): Date {
    if (!date) {
        console.error('no se recibió un texto');
        return undefined;
    }
    if (date.length != 10) {
        console.error('no se recibió un texto con longitud de 10');
        return null;
    }

    let d = new Date(
        Number.parseInt(date.substring(0, 0 + 4)),
        Number.parseInt(date.substring(5, 5 + 2)) - 1,
        Number.parseInt(date.substring(8, 8 + 2)));

    console.log('EXO');
    return d;
}

export function safeToISOString(date: Date) {
    let yyyy = '' + date.getFullYear();
    let MM = '' + (date.getMonth() + 1);
    let dd = '' + date.getDate();
    let hh = '' + date.getHours();
    let mm = '' + date.getMinutes();
    let ss = '' + date.getSeconds();

    while (MM.length < 2) MM = '0' + MM;
    while (dd.length < 2) dd = '0' + dd;
    while (hh.length < 2) hh = '0' + hh;
    while (mm.length < 2) mm = '0' + mm;
    while (ss.length < 2) ss = '0' + ss;

    return yyyy + '-' + MM + '-' + dd + 'T' + hh + ':' + mm + ':' + ss + '.000Z';
}

export function removeNullProperties(entity: any) {
    if (!entity) return;
    for (let key in entity) {
        if (entity[key] == null) {
            delete entity[key];
        }
    }
    return entity;
}

export function dateAsYYYYMMDD(date: Date): string {
    return '' + date.getFullYear() + withLeadingZeros((date.getMonth() + 1), 2) + withLeadingZeros((date.getDate()), 2);
}

export function withLeadingZeros(integer: number, digits: number): string {
    let n = '' + Number.parseInt('' + integer);
    for (let i = n.length; i < digits; i++) n = '0' + n;
    return n;
}