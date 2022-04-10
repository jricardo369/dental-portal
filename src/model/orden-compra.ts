export class OrdenCompra {

    num_doc_compras: string = null;
    num_necesidad: string = null;
    sociedad: string = null;
    clave_cond: string = null;
    fecha_ped: string = null;
    valor_neto: number = null;
    clave_moneda: string = null;
    estatus_pedido: string = null;
    imp_fact: string = null;

    ind_em: string = null;
    tipo_imputacion: string = null;
    flag: string = null;

    static fromPlainObject(o: any): OrdenCompra {
        if (!o) return null;
        let e = new OrdenCompra();
        for (let key in e) e[key] = o[key];
        return e;
    }

    static fromPlainObjectArray(O: any[]): any {
        if (!Array.isArray(O)) return null;
        return O.map(o => this.fromPlainObject(o));
    }
}