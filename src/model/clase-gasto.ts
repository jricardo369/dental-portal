import { TipoGasto } from "./tipo-gasto";
import { Impuesto } from "./impuesto";

export class ClaseGasto {

    id: number = null;
    activo: boolean = null;
    cuentaContable: string = null;
    deducibleImpuestos: boolean = null;
    segregacion: boolean = null;
    descripcion: string = null;
    cuentaContableIVA: string = null;
    cuentaContableIEPS: string = null;
    cuentaContableISH: string = null;
    cuentaContableISR: string = null;
    cuentaContableTUA: string = null;
    indicador_iva: string = null;
    indicador_isr: string = null;
    indicador_ish: string = null;
    indicador_tua: string = null;
    indicador_ieps: string = null;
    cuentaExcedente = null;
    indicadorExcedente = null;
    limiteDiarioMxn = null;
    limiteDiarioUsd = null;
    limiteDiarioEur = null;
    
    tipo_gasto: TipoGasto = null;
    impuestos: Impuesto[] = null;

    static fromPlainObject(o: any): ClaseGasto {
        if (!o) return null;
        let e = new ClaseGasto();
        for (let key in e) e[key] = o[key];
        if (e.tipo_gasto) e.tipo_gasto = TipoGasto.fromPlainObject(e.tipo_gasto);
        if (e.impuestos) e.impuestos = Impuesto.fromPlainArray(e.impuestos);
        return e;
    }

    static fromPlainObjectArray(O: any[]): ClaseGasto[] {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof ClaseGasto)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}