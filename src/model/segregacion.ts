
export class Segregacion {

    public id: number = null;
    public centroCosto: string = null;
    public importeSegregado: number = null;
    public estatus: string = null;
    public revisado: boolean = null;
    public tipo_centro: boolean = null;

    static fromPlainObject(o: any): Segregacion {
        if (!o) return null;
        let e = new Segregacion();
        for (let key in e) e[key] = o[key];
        return e;
    }

    static fromPlainObjectArray(O: any[]): any {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof Segregacion)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}