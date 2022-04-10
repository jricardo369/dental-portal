export class Sociedad {

    public sociedad: string = null;
    public soc: string = null;
    public rfc: string = null;

    static fromPlainObject(o: any): Sociedad {
        if (!o) return null;
        let e = new Sociedad();
        for (let key in e) e[key] = o[key];
        return e;
    }

    static fromPlainObjectArray(O: any[]): Sociedad[] {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof Sociedad)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}