import { environment } from '../environments/environment';

export const VERSION_PORTAL = 'Versión 2022.11.07-15:00';
export const EMPRESA_PORTAL = '© / 2021';

// =====================================================
/*
REM PARA BUILDEAR SE NECESITA BUILDEAR TANTO INGLÉS COMO ESPAÑOL, SON DOS APPS

PORTAL-DENTAL-QAS
ng build --prod --optimization --build-optimizer --aot --base-href /portal-dental/en/ --deploy-url /portal-dental/en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/portal-dental/en
ng build --prod --optimization --build-optimizer --aot --base-href /portal-dental/es/ --deploy-url /portal-dental/es/ --i18n-locale=es --output-path=dist/portal-dental/es
dir

REM ESTE ES PARA LA VERSION EN RAIZ
ng build --prod --optimization --build-optimizer --aot --base-href /en/ --deploy-url /en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/ROOT/en
ng build --prod --optimization --build-optimizer --aot --base-href /es/ --deploy-url /es/ --i18n-locale=es --output-path=dist/ROOT/es
dir
ng build --prod --optimization --build-optimizer --aot --base-href / --deploy-url / --i18n-locale=es --output-path=dist/ROOT/
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
    .replace("/en/", "")
    .replace("/portal-dental", "/dental");

// let productionApiUrl = documentBsaeUriWithoutLanguage + "/"; // PRODUCCION
let productionApiUrl = 'http://www.dental-viri.com/dental/'; // PRODUCCION
 let localhostApiUrl = location.protocol + '//' + location.hostname + '/dental/'; // LOCAL

if (environment.production) {
    // PRO
} else {
    localhostApiUrl = 'http://www.dental-viri.com/dental/';
}

// ====================================

export const API_URL = environment.production ? productionApiUrl : localhostApiUrl;
