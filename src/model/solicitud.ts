import { Comprobante } from './comprobante';
import { Departamento } from './departamento';
import { Grupo } from './grupo';

export class Solicitud {
    ceco: string;
    cecoDescripcion: string;
    comprobantes: Comprobante[];
    concepto: string;
    // cuentaContable: string;
    departamento: Departamento;
    empresa: string;
    empresaDescripcion: string;
    estatus: string;
    estatusDescripcion: string;
    fechaCreacion: string;
    fechaFin: string;
    fechaInicio: string;
    grupo: Grupo;
    motivo: string;
    // nivel: string;
    nombreCompletoUsuario: string;
    numeroSolicitud: string;
    observaciones: string;
    totalAnticipo: number;
    totalComprobado: number;
    usuario: string;
}
