import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { safeYYYY_MM_DD, dateAsYYYYMMDD as toYYYYMMDD } from 'src/app/app.config';
import { Usuario } from '../../../model/usuario';
import { SessionService } from '../../services/session.service';

class ZTMM_CON_FACTURAS {
    
}

@Component({
    selector: 'app-consulta-de-facturas',
    templateUrl: './consulta-de-facturas.component.html',
    styleUrls: ['./consulta-de-facturas.component.css']
})
export class ConsultaDeFacturasComponent implements OnInit {

    safeYYYYMMDD = safeYYYY_MM_DD;

    withResults = false;
    loading = false;

    I_BUKRS = '';
    I_EBELN = '';
    I_FECHA_INI = null;
    I_FECHA_FIN = null;
    I_LIFNR = '';
    I_XBLNR = '';
    usuario: Usuario;
    numeroDeProveedorParaUsuarioEmpleado: string = null;
    visible = false;
    esProveedor = false;
    proveedorInput: string = "";

    ZTMM_CON_FACTURAS: ZTMM_CON_FACTURAS[] = [];

    constructor(
        public utilService: UtilService,
        protected proveedoresService: ProveedoresService,
        private sessionService: SessionService,
    ) {

        this.sessionService
        .getUsuario()
        .then(u => {
            this.usuario = u;
            if (this.usuario.rol.id == 3)
            {
                this.esProveedor = true;
                console.log('nombre',this.usuario.usuario);
            }
        })
        .catch(r => {
            alert(r);
        });
    }

    ngOnInit() {
    }

    consultar() {
        if (this.esProveedor)
        {
            this.proveedorInput = this.usuario.usuario;
        }
         this.loading = true;
         this.proveedoresService.ZMFMM_CONSULTA_FACT(
             this.I_BUKRS,
             this.I_EBELN,
             this.I_FECHA_INI ? toYYYYMMDD(this.I_FECHA_INI) : null,
             this.I_FECHA_FIN ? toYYYYMMDD(this.I_FECHA_FIN) : null,
             this.I_LIFNR,
             this.I_XBLNR,
             this.proveedorInput,
         ).then((e: any) => {
             this.ZTMM_CON_FACTURAS = e.ZTMM_CON_FACTURAS;
             if (this.ZTMM_CON_FACTURAS.length == 0)
                 this.utilService.mostrarDialogoSimple('Sin registro', 'Los parametros de búsqueda no arrojaron resultados');
             else this.withResults = true;
         }).catch(e => {
             this.utilService.manejarError(e);
         }).then(() => {
             this.loading = false;
         })
    }

    toYYYYMMDD(from: Date): string {
        return toYYYYMMDD(from);
    }

    seleccionarProveedor() {
        this.numeroDeProveedorParaUsuarioEmpleado = this.proveedorInput;
        this.visible = true;
    }
    deseleccionarProveedor()
    {
        this.numeroDeProveedorParaUsuarioEmpleado = null;
        this.visible = false;
        this.I_FECHA_INI = null;
        this.I_FECHA_FIN = null;
        this.withResults = false;
        this.ZTMM_CON_FACTURAS= [];
    }
}
