export class SapSociedad {

    rfc: string = null;
    sociedad: string = null;
    soc: string = null;

    static fromPlainObject(o: any): SapSociedad {
        if (!o) return null;
        let e = new SapSociedad();
        for (let key in e) e[key] = o[key];
        return e;
    }

    static fromPlainObjectArray(O: any[]): SapSociedad[] {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof SapSociedad)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}