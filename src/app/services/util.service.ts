import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogoSimpleComponent } from '../common/dialogo-simple/dialogo-simple.component';
import { DialogoLoginComponent } from '../common/dialogo-login/dialogo-login.component';
import { DialogoFrameComponent } from '../common/dialogo-frame/dialogo-frame.component';
import { Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { API_URL } from '../app.config';
import { CustomI18nService } from '../custom-i18n.service';

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    

    appNavMenuHidden = true;
    workspaceNavMenuOpened = false;
    workspaceNavMenuShortened = false;

    goBack() {
        this.location.back();
    }

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private location: Location,
        private customI18n: CustomI18nService
    ) {

    }

    manejarError(reason: any) {

        console.error(reason);

        let titulo = '';
        let texto = reason;

        if (reason instanceof HttpErrorResponse) {

            if (reason.status == 401 || reason.status == 0) {
                this.mostrarDialogoLogin();
                return;
            }

            if (reason.error) {

                // CUALQUIER TEXTO QUE VENGA ES BUENO PARA MOSTRAR COMO ERROR
                texto = reason.error;

                // TRATANDO DE INTERPRETAR UN SERVICE RESULT
                if (reason.error.result) {
                    titulo = texto.result.status;
                    texto = texto.result.message;
                }

                // TRATANDO DE INTERPRETAR UN CONFLICTS
                // conflicts: [{id: "referencia", value: "size must be between 0 and 16"}]
                if (reason.error.conflicts) {
                    texto = reason.error.conflicts[0].id + ': ' + reason.error.conflicts[0].value;
                }

                // MANEJANDO EL messageDialogDto DE CAJA CHICA
                if (reason.error.messageDialogDto) {
                    titulo = reason.error.messageDialogDto.title;
                    texto = reason.error.messageDialogDto.message;
                }

            } else {
                texto = "El error no cuenta con descripción";
            }

        } else if (texto.message) {
            texto = texto.message;
        }



        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: titulo,
                texto: texto,
                botones: [{ texto: 'Entendido', color: 'accent' },]
            },
            disableClose: true,
        });

    }

    mostrarDialogoLogin(recuperarPasswordOnly = false) {
        this.dialog.open(DialogoLoginComponent, {
            disableClose: !recuperarPasswordOnly,
            closeOnNavigation: true,
            data: {
                recuperarPasswordOnly: recuperarPasswordOnly
            }
        });
    }

    /**
     * 
     * @param titulo titulo a mostrar
     * @param texto texto a mostrar
     * @param okText texto de ok
     * @param noText texto de no
     */
    mostrarDialogoSimple(
        titulo: string,
        texto: string,
        okText: string = "Entendido",
        noText: string = null,
        okOptionColor: string = "primary"): Promise<any> {

        let botones = [
            { texto: okText, color: okOptionColor, valor: 'ok' }
        ];

        if (noText) botones.push({ texto: noText, color: null, valor: 'no' })

        let dialogRef = this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: titulo,
                texto: texto,
                botones: botones,
            },
            disableClose: false,
        });
        return dialogRef.afterClosed().toPromise();
    }

    mostrarDialogoFrame(src) {
        console.log(src);
        let dialogRef = this.dialog.open(DialogoFrameComponent, {
            data: {
                src: src
            },
            disableClose: false,
            width: 'calc((100vh - 48px))',
            height: 'calc(100vh - 48px)',
            panelClass: 'camarones'
        });
        return dialogRef.afterClosed().toPromise();
    }



    /**
     * 
     * @param titulo 
     * @param texto 
     * @param okText 
     * @param noText 
     * @param label etiqueta que aparece sobre el combobox
     * @param items combox items
     * @param displayField campo de los elementos del combobox para mostrar en la lista
     * @param sublabel texto que aparece debajo del combobox
     */
    mostrarDialogoCombobox(titulo: string, texto: string, okText: string = "Aceptar", noText: string = "Cancelar",
        label: string, items: any[], displayField: string, sublabel: string): Promise<any> {

        let botones = [
            { texto: okText, color: 'primary', valor: 'ok' }
        ];

        if (noText) botones.push({ texto: noText, color: null, valor: 'no' })

        let dialogRef = this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: titulo,
                texto: texto,
                botones: botones,
                comboboxLabel: label,
                comboboxItems: items,
                comboboxDisplayField: displayField,
                comboboxSublabel: sublabel
            },
            disableClose: false,
        });
        return dialogRef.afterClosed().toPromise();
    }

    /**
     * 
     * @param titulo titulo a mostrar
     * @param texto texto a mostrar
     * @param okText texto de ok
     * @param noText texto de no
     * @param campos campos del formulario
     */
    mostrarDialogoConFormulario(
        titulo: string, texto: string, okText: string = "Entendido", noText: string = null, campos: any[] = [], okColor = 'primary'): Promise<any> {

        let botones = [
            { texto: okText, color: okColor, valor: 'ok' }
        ];

        if (noText) botones.push({ texto: noText, color: null, valor: 'no' })

        let dialogRef = this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: titulo,
                texto: texto,
                botones: botones,
                fields: campos
            },
            disableClose: false,
        });
        return dialogRef.afterClosed().toPromise();
    }

    tableWrapperScroll(evt: Event) {
        let e = evt.srcElement as HTMLDivElement;

        let rightScrollLeft = (e.scrollWidth - e.clientWidth) - e.scrollLeft;
        let leftScrollLeft = e.scrollLeft;

        let needsRightBorder = rightScrollLeft > 1;
        let needsLeftBorder = leftScrollLeft > 1;

        e.style.borderRightWidth = needsRightBorder ? '1px' : '0';
        e.style.borderLeftWidth = needsLeftBorder ? '1px' : '0';
    }

    /*rutaDeManual() {
        let folder = API_URL.substr(0, API_URL.length - 4) + "-docs/";
        let name = null
        if (this.customI18n.localeId == 'en') name = "VendorsManual.pdf"
        else name = "ManualProveedores.pdf"
        return folder + name
    }*/

    rutaDeManual(manual: string) {
        let folder = API_URL.substr(0, API_URL.length - 4) + "-docs/";
        let name = null;
        switch (manual) {
            case "ManualProveedores":
                if (this.customI18n.localeId == 'en') name = "VendorsManual.pdf";
                else name = "ManualProveedores.pdf";
                break;
            case "ManualEmpleadoFB60":
                if (this.customI18n.localeId == 'en') name = "EmployeeFb60Manual.pdf";
                else name = "ManualEmpleadoFB60.pdf";
                break;
            case "ManualCajaChica":
                if (this.customI18n.localeId == 'en') name = "PettyCashManual.pdf";
                else name = "ManualCajaChica.pdf";
                break;
            case "ManualGastosViaje":
                if (this.customI18n.localeId == 'en') name = "TravelExpensesManual.pdf";
                else name = "ManualGastosViaje.pdf";
                break;
            case "ManualAdministracionCajaChica":
                if (this.customI18n.localeId == 'en') name = "PettyCashAdministrationManual.pdf";
                else name = "ManualAdministracionCajaChica.pdf";
                break;
            case "ManualAdministracionGeneral":
                if (this.customI18n.localeId == 'en') name = "GeneralAdministrationManual.pdf";
                else name = "ManualAdministracionGeneral.pdf";
                break;
            case "ManualAdministracionViajes":
                if (this.customI18n.localeId == 'en') name = "TravelAdministrationManual.pdf";
                else name = "ManualAdministracionViajes.pdf";
                break;
            default:
                break;
        }
        
        return folder + name;
    }
}
