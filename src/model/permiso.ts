export class Permiso {

    public id: number = null;
    public nombre: string = null;

    constructor(id = null, nombre = null) {
        this.id = id;
        this.nombre = nombre;
    }

    static fromPlainObject(o: any): Permiso {
        if (!o) return null;
        let e = new Permiso();
        for (let key in e) e[key] = o[key];
        return e;
    }

    static fromPlainObjectArray(O: any[]): Permiso[] {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof Permiso)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}