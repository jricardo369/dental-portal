# dental-portal

Front end para el proyecto de Portal Dental

## Configuración del proyecto

### Clonar Proyecto

Clone el proyecto **dental-portal** del repositorio en git.

Ejecute el comando `npm install` para descargar e instalar las dependencias necesarias para el proyecto. 

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

+ Versión en español `ng build --prod --optimization --build-optimizer --aot --base-href /portal-dental/es/ --deploy-url /portal-dental/es/ --i18n-locale=es --output-path=dist/portal-dental/es`


---

## Ayuda adicional
Para obtener más ayuda sobre el uso de CLI de Angular `ng help` o vaya a consultar el README de [Angular CLI](https://github.com/angular/angular-cli/blob/master/README.md).