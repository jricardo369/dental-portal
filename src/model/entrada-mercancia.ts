export class EntradaMercancia {

    num_doc_comp: string = null;
    cantidad: number = null;
    unidad: string = null;
    importe: number = null;
    clave_moneda: string = null;
    num_doc_ref: string = null;
    fecha_cont: string = null;
    num_pos_doc_comp: number = null;
    num_doc_material: string = null;
    ejercicio: number = null;
    num_apunte: number = null;
    clave_cond_pago: string = null;
    ind_iva: string = null;
    sociedad: string = null;
    costo_indirecto: string = null;
    precio_neto: number = null;
    clase_cond: string = null;
    num_nivel: number = null;
    cont_cond: number = null;
    doc_ref: string = null;
    poscicion_doc: number = null;
    denominacion: string = null;
    mensaje: string = null;
    valor1: string = null;
    texto_breve: string = null;
    orderpr_un: string = null;
    ZAEHK: string = null;

    static fromPlainObject(o: any): EntradaMercancia {
        if (!o) return null;
        let e = new EntradaMercancia();
        for (let key in e) e[key] = o[key];
        return e;
    }

    static fromPlainObjectArray(O: any[]): any {
        if (!Array.isArray(O)) return null;
        return O.map(o => this.fromPlainObject(o));
    }
}