import { environment } from '../environments/environment';

export const VERSION_PORTAL = 'Versión 2020.10.25-13:24';
export const EMPRESA_PORTAL = '© Grupo Nu3 / 2020';

// =====================================================
// ASI SE BUILDEA, COMO EL DE ABAJO
//    ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobal --deploy-url /ContelecAnglobal/
//    ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobalAux --deploy-url /ContelecAnglobalAux/
//
/*
REM PARA BUILDEAR SE NECESITA BUILDEAR TANTO INGLÉS COMO ESPAÑOL, SON DOS APPS

PORTAL-VIATICOS
ng build --prod --optimization --build-optimizer --aot --base-href /portal-viaticos/en/ --deploy-url /portal-viaticos/en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/portal-viaticos/en
ng build --prod --optimization --build-optimizer --aot --base-href /portal-viaticos/es/ --deploy-url /portal-viaticos/es/ --i18n-locale=es --output-path=dist/portal-viaticos/es
dir

PORTAL-VIATICOS-QAS
ng build --prod --optimization --build-optimizer --aot --base-href /portal-viaticos-qas/en/ --deploy-url /portal-viaticos-qas/en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/portal-viaticos-qas/en
ng build --prod --optimization --build-optimizer --aot --base-href /portal-viaticos-qas/es/ --deploy-url /portal-viaticos-qas/es/ --i18n-locale=es --output-path=dist/portal-viaticos-qas/es
dir

PORTAL-VIATICOS-PRO
ng build --prod --optimization --build-optimizer --aot --base-href /portal-viaticos-pro/en/ --deploy-url /portal-viaticos-pro/en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/portal-viaticos-pro/en
ng build --prod --optimization --build-optimizer --aot --base-href /portal-viaticos-pro/es/ --deploy-url /portal-viaticos-pro/es/ --i18n-locale=es --output-path=dist/portal-viaticos-pro/es
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
    //.replace("/portal-viaticos", "/viaticos-api");
    .replace("/portal-viaticos-qas", "/viaticos-api-qas");
    //.replace("/portal-viaticos-pro", "/viaticos-api-pro");

let productionApiUrl = documentBsaeUriWithoutLanguage + "/"; // PRODUCCION
//  let localhostkApiUrl = location.protocol + '//' + location.hostname + ':8082/viaticos-api/'; // LOCAL
 let localhostApiUrl = location.protocol + '//' + location.hostname + ':8080/viaticos-api/'; // LOCAL

if (environment.production) {
    // PRO
} else {
    // localhostApiUrl = "http://7db604cdbde6.ngrok.io/viaticos-api/";
    // localhostApiUrl = 'http://189.195.139.130:8082/viaticos-api/';
    localhostApiUrl = 'http://189.195.139.130:8082/viaticos-api-qas/';
    // localhostApiUrl = 'http://189.195.139.130:18080/viaticos-api/';
}

// ====================================

export const API_URL = environment.production ? productionApiUrl : localhostApiUrl;
