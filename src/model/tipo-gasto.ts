import { Area } from "./area";

export class TipoGasto {

    id: number = null;
    descripcion: string = null;
    activo: boolean = null;
    areaBean: Area = null;

    static fromPlainObject(o: any): TipoGasto {
        if (!o) return null;
        let e = new TipoGasto();
        for (let key in e) e[key] = o[key];
        if (e.areaBean) e.areaBean = Area.fromPlainObject(e.areaBean);
        return e;
    }

    static fromPlainObjectArray(O: any[]): any {
        if (!Array.isArray(O)) return null;
        return O.map(o => this.fromPlainObject(o));
    }
}