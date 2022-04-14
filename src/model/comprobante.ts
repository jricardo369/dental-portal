import { Cfdi } from './cfdi';
import { Subcuenta } from './subcuenta';

export class Comprobante {
    aprobacionContador: boolean;
    aprobacionGerente: boolean;
    aprobacionNoAplica: boolean;
    aprobacionPrestador: boolean;
    cfdi: Cfdi;
    // descripcionSubCuenta: string;
    estatusComprobante: string;
    fecha: string;
    idComprobanteViatico: number;
    ieps: number;
    impuesto: number;
    isr: number;
    iva: number;
    noAplica: number;
    numeroFactura: string;
    numeroSolicitud: string;
    observaciones: string;
    // nombre: string;
    propina: number;
    rfc: string;
    rutaPdf: string;
    rutaXml: string;
    seleccionado: boolean;
    subCuenta: Subcuenta;
    subCuentaContable: number;
    subTotal: number;
    total:number;
}