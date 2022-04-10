import { Usuario } from './usuario';

export class EventoSolicitudCajaChica {

	public id: number = null;
	public fecha: Date = null;
	public evento: String = null;
	public motivo: String = null;
	public usuario: Usuario = null;

    static fromPlainObject(o: any): EventoSolicitudCajaChica {
        if (!o) return null;
        let e = new EventoSolicitudCajaChica();
        for (let key in e) e[key] = o[key];
        if (e.usuario) e.usuario = Usuario.fromPlainObject(e.usuario);
        return e;
    }

    static fromPlainObjectArray(O: any[]): EventoSolicitudCajaChica[] {
        if (!O) return null;
        if (!Array.isArray(O)) {
            let e = this.fromPlainObject(O);
            if (e instanceof EventoSolicitudCajaChica)
                return [e];
            return null;
        }
        return O.map(o => this.fromPlainObject(o));
    }
}