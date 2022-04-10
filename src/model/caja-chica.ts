import { Sociedad } from "./sociedad";

export class CajaChica {
    
    public noCaja: string = null;
    public descripcion: string = null;
    public acredor: string = null;
    public usuarioSap: string = null;
    public responsable: string = null;
    public cme: string = null;
    public sociedades: Sociedad[] = [];

    static fromPlainObject(o: any): CajaChica {
        if (!o) return null;
        let e = new CajaChica();
        for (let key in e) e[key] = o[key];
        if (e.sociedades) e.sociedades = Sociedad.fromPlainObjectArray(e.sociedades);
        return e;
    }

    static fromPlainObjectArray(O: any[]): CajaChica[] {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof CajaChica)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}