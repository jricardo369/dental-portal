# portal-viaticos-angular

Front end para el proyecto de Portal de viaticos Nu3 (SLAPI-003)

## Configuración del proyecto

### Clonar Proyecto

Clone el proyecto **portal-viaticos-angular** del repositorio en git.

Ejecute el comando `npm install` para descargar e instalar las dependencias necesarias para el proyecto. 

Dentro del archivo *_theming.scss* en la ruta **portal-viaticos-angular\node_modules\@angular\material** despues de la linea 782:
~~~
A700: #2962ff,
~~~
agregar las siguientes lineas:
~~~
Nu3_primary: #2f4595,
Nu3_accent: #212040,
~~~

despues de la linea 1236:
~~~
$mat-blue-gray: $mat-blue-grey;
~~~
agregar las siguientes lineas:
~~~
// Color palette for status
$mat-status: (
  1: #0277bd66,
  2: #5e35b166,
  3: #00E67666,
  4: #F4433666,
  5: #00968866,
  6: #F4433666,
  7: #00E67666,
  8: #FF408166,
  9: #F4433666,
  10: #00E67666,
  11: #CDDC3966,
  12: #F4433666,
  13: #00E67666,
  14: #00BCD466,
  15: #FFC10766,
  contrast: (
    1: $dark-primary-text,
    2: $dark-primary-text,
    3: $dark-primary-text,
    4: $dark-primary-text,
    5: $dark-primary-text,
    6: $dark-primary-text,
    7: $dark-primary-text,
    8: $dark-primary-text,
    9: $dark-primary-text,
    10: $dark-primary-text,
    11: $dark-primary-text,
    12: $dark-primary-text,
    13: $dark-primary-text,
    14: $dark-primary-text,
    15: $dark-primary-text,
  )
);
~~~

### Ejecutar en Desarrollo
Ejecutar `ng serve` para un servidor de desarrollo:

+ Para ejecutar la version en **Inglés** ejecutar el comando `ng serve --configuration=en`. 

+ Para ejecutar la version en **Español** ejecutar el comando `ng serve --configuration=es`.

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambia alguno de los archivos de origen.

### Andamio de código
Ejecutar `ng generate component component-name` para generar un nuevo componente. También puede utilizar `ng generate directive|pipe|service|class|module`.

### Archivos de traducción
Ejecutar `ng xi18n --output-path translate` para generar un archivo de traduccion, este debe editarlo, cambiarlo de nombre y pegarlo en otra ruta.

## Configuraciones adicionales

### Construir

Ejecutar `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el `dist/` directorio. Usa la `-prod` bandera para una construcción de producción.

Para construir se necesita construir tanto en inglés como en español:

+ Versión en inglés `ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobal/en/ --deploy-url /ContelecAnglobal/en/ --i18n-locale=en --i18n-file src/translate/messages/messages.en.xlf --output-path=dist/ContelecAnglobal/en`
+ Versión en español `ng build --prod --optimization --build-optimizer --aot --base-href /ContelecAnglobal/es/ --deploy-url /ContelecAnglobal/es/ --i18n-locale=es --output-path=dist/ContelecAnglobal/es`


---

## Ayuda adicional
Para obtener más ayuda sobre el uso de CLI de Angular `ng help` o vaya a consultar el README de [Angular CLI](https://github.com/angular/angular-cli/blob/master/README.md).