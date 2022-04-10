export class GastoCaja {

    public activo: boolean = null;
    public cme: string = null;
    public cuentaContableIEPS = "";
    public cuentaContableISH = "";
    public cuentaContableISR = "";
    public cuentaContableTUA = "";
    public cuentaDeMayor: number = null;
    public deducibleImpuestos: boolean = null;
    public descripcionGasto: string = null;
    public indicadorIeps = "";
    public indicadorIsh = "";
    public indicadorIsr = "";
    public indicadorIva = "";
    public indicadorTua = "";
    public operacion: string = "";
    public sociedades = [];
    
    public centroCosto: boolean = null;
    public pep: boolean = null;
    public grafo: boolean = null;

    static fromPlainObject(o: any): GastoCaja {
        if (!o) return null;
        let e = new GastoCaja();
        for (let key in e) e[key] = o[key];
        return e;
    }

    static fromPlainObjectArray(O: any[]): GastoCaja[] {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof GastoCaja)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}