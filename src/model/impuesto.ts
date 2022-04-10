export class Impuesto {

    id: number;

    static fromPlainObject(o: any): Impuesto {
        if (!o) return null;
        let e = new Impuesto();
        for (let key in e) e[key] = o[key];
        return e;
    }

    static fromPlainArray(O: Impuesto[]): any {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof Impuesto)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}