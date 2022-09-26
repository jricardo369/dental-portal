import { environment } from '../environments/environment';

export const VERSION_PORTAL = 'Versión 2020.10.25-13:24';
export const EMPRESA_PORTAL = '© / 2020';

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
// let productionApiUrl = 'http://ec2-3-135-28-48.us-east-2.compute.amazonaws.com:8080/dental/'; // PRODUCCION
let productionApiUrl = '/dental/'; // PRODUCCION
 let localhostApiUrl = location.protocol + '//' + location.hostname + ':8080/dental/'; // LOCAL

if (environment.production) {
    // PRO
} else {
    localhostApiUrl = '/dental/';
    // localhostApiUrl = 'http://ec2-3-135-28-48.us-east-2.compute.amazonaws.com:8080/dental/';

}

// ====================================

export const API_URL = environment.production ? productionApiUrl : localhostApiUrl;
