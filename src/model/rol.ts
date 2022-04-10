export class Rol {

    public id: number = null;
    public nombre: string = null;

    static fromPlainObject(o: any): Rol {
        if (!o) return null;
        let e = new Rol();
        for (let key in e) e[key] = o[key];
        return e;
    }
}