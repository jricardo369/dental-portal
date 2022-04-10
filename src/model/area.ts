export class Area {

    idarea: number = null;
    descripcion: string = null;
    activo: boolean = null;

    static fromPlainObject(o: any): Area {
        if (!o) return null;
        let e = new Area();
        for (let key in e) e[key] = o[key];
        return e;
    }
}