import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ProveedoresService } from '../../services/proveedores.service';
import { SessionService } from '../../services/session.service';
import { Usuario } from '../../../model/usuario';
import { OrdenCompra } from '../../../model/orden-compra';
import { DialogoDeCargaDeFactura } from '../dialogo-de-carga-de-factura/dialogo-de-carga-de-factura.component';
import { UtilService } from '../../services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoSimpleComponent } from '../../common/dialogo-simple/dialogo-simple.component';
import { CustomI18nService } from 'src/app/custom-i18n.service';
import { API_URL } from 'src/app/app.config';

@Component({
    selector: 'app-entradas-de-mercancia',
    templateUrl: './entradas-de-mercancia.component.html',
    styleUrls: ['./entradas-de-mercancia.component.scss']
})
export class EntradasDeMercanciaComponent implements OnInit {

    usuario: Usuario;

    ngOnInit(): void { }

    ordenesDeCompra = [];
    entradasDeMercancia: any[] = null;

    ordenDeCompraSeleccionada: OrdenCompra = null;
    numeroDeOrdenDeCompraABuscar = '';

    loading = false;

    mostrarEntradasDeMercanciaEnTabla = false;
    mostrandoOrdenDeCompraBuscada = false;

    pagina: number;
    diasPagina: number = 100;

    proveedorInput: string = ""
    numeroDeProveedorParaUsuarioEmpleado: string = null

    seleccionarProveedor() {
        this.numeroDeProveedorParaUsuarioEmpleado = this.proveedorInput;
        this.buscarMasOrdenesDeCompra()
    }

    deseleccionarProveedor() {

        this.numeroDeProveedorParaUsuarioEmpleado = null

        this.pagina = 0
        this.ordenesDeCompra = []
        this.entradasDeMercancia = null
        this.ordenDeCompraSeleccionada = null
        this.numeroDeOrdenDeCompraABuscar = ''
    }

    obtenerIdProveedorDePantalla() {
        if (this.usuario.rol.id == 2) return this.numeroDeProveedorParaUsuarioEmpleado
        return this.usuario.id
    }

    constructor(
        private proveedoresService: ProveedoresService,
        private sessionService: SessionService,
        private dialog: MatDialog,
        public utilService: UtilService,
        private customI18n: CustomI18nService
    ) {
        this.pagina = 0;
        this.sessionService
            .getUsuario()
            .then(u => {
                this.usuario = u

                // solo proveedores deben buscar mas ordenes al entrar
                if (this.usuario.rol.id == 3) {
                    this.buscarMasOrdenesDeCompra();
                }

            })
            .catch(r => {
                alert(r);
            });
    }

    buscarMasOrdenesDeCompra() {
        if (this.mostrandoOrdenDeCompraBuscada) {
            this.mostrandoOrdenDeCompraBuscada = false;
            this.ordenesDeCompra.length = 0;
            this.pagina = 0;
            this.numeroDeOrdenDeCompraABuscar = '';
        }
        this.pagina++;
        this.actualizar().then(() => { }).catch(() => this.pagina--);
    }

    actualizar() {
        this.loading = true;
        return new Promise((ok, err) => {
            this.proveedoresService
                .obtenerOrdenesDeCompra(this.obtenerIdProveedorDePantalla(), this.pagina, this.diasPagina, 'E')
                .then(ordenesDeCompra => {
                    ordenesDeCompra.forEach(e => this.ordenesDeCompra.push(e));
                    ok();
                }).catch(r => {
                    this.utilService.manejarError(r);
                    err(r);
                }).then(() => this.loading = false);
        })
    }

    buscarPorOrdenDeCompra() {
        if (!this.numeroDeOrdenDeCompraABuscar.trim()) {
            return;
        }
        this.cancelarSeleccionDeOrdenDeCompra();
        this.ordenesDeCompra.length = 0;
        this.mostrandoOrdenDeCompraBuscada = true;
        this.loading = true;
        this.proveedoresService
            .obtenerOrdenesDeCompra(this.obtenerIdProveedorDePantalla(), this.pagina, this.diasPagina, 'E', this.numeroDeOrdenDeCompraABuscar)
            .then(ordenesDeCompra => {
                ordenesDeCompra.forEach(e => this.ordenesDeCompra.push(e));
            }).catch(r => {
                this.utilService.manejarError(r);
            }).then(() => this.loading = false);
    }

    seleccionarOrdenDeCompra(ordenDeCompra: OrdenCompra) {

        if (ordenDeCompra == this.ordenDeCompraSeleccionada) { this.cancelarSeleccionDeOrdenDeCompra(); return; }

        this.loading = true;
        this.proveedoresService
            .obtenerEntradasDeMercancia(ordenDeCompra.num_doc_compras, 'E')
            .then(entradasDeMercancia => {
                this.entradasDeMercancia = entradasDeMercancia;
                this.ordenDeCompraSeleccionada = ordenDeCompra;
            }).catch(r => {
                this.entradasDeMercancia = [];
                this.utilService.manejarError(r);
            }).then(() => this.loading = false);
    }

    cancelarSeleccionDeOrdenDeCompra() {
        this.entradasDeMercancia = null;
        this.ordenDeCompraSeleccionada = null;
    }

    estanTodosSeleccionados() {
        if (this.entradasDeMercancia == null) return false;
        for (let i = 0; i < this.entradasDeMercancia.length; i++)
            if (!this.entradasDeMercancia[i].seleccionado) return false;
        return true;
    }

    estaAlgunoSeleccionado() {
        if (this.entradasDeMercancia == null) return false;
        for (let i = 0; i < this.entradasDeMercancia.length; i++)
            if (this.entradasDeMercancia[i].seleccionado) return true;
        return false;
    }

    estaSeleccionado() { return false; }

    check(event: Event, e) { e.seleccionado = true; }

    checkAll(event: Event) {
        if (this.entradasDeMercancia) {
            let seleccionado = !this.estanTodosSeleccionados();
            this.entradasDeMercancia.forEach(e => e.seleccionado = seleccionado);
        }
    }

    totalEntradasSeleccionadas() { return this.entradasDeMercancia.filter(e => e.seleccionado).length; }

    totalImportesDeEntradasSeleccionadas() { return this.entradasDeMercancia.filter(e => e.seleccionado).map(e => e.importe).reduce((a, b) => a + b, 0); }

    async abrirVentanaDeSeleccionDeFacturas() {

        let xmlObligatorio = this.sessionService.xmlObligatorio
        
        if (this.usuario.rol.id == 2) {
            this.loading = true
            xmlObligatorio = await this.proveedoresService.obtenerXmlObligatorio(this.numeroDeProveedorParaUsuarioEmpleado)
            this.loading = false
        }

        let dialogRef = this.dialog.open(DialogoDeCargaDeFactura, {
            disableClose: true,
            data: { disableXml: !xmlObligatorio }
        });
        dialogRef.afterClosed().subscribe(resultadoArchivos => {

            if (resultadoArchivos) {
                let dialogRef = this.dialog.open(DialogoSimpleComponent, {
                    data: {
                        titulo: this.customI18n.get('contelec.EnviarFactura'),
                        texto: this.customI18n.get('proveedores.x.estaAccionNoPuedeDeshacerce'),
                        botones: [
                            { texto: this.customI18n.get('contelec.Cancelar') },
                            { texto: this.customI18n.get('contelec.EnviarFactura'), color: 'accent', valor: 'ok' },
                        ]
                    },
                    disableClose: true,
                });
                dialogRef.afterClosed().subscribe(result => {
                    if (result == 'ok') {
                        this.loading = true;
                        console.log(resultadoArchivos);
                        this.proveedoresService.enviarFacturaPO(
                            this.obtenerIdProveedorDePantalla(),
                            this.usuario.sociedad,
                            resultadoArchivos.xmlFile,
                            resultadoArchivos.pdfFile,
                            'E',
                            this.ordenDeCompraSeleccionada,
                            this.entradasDeMercancia.filter(e => e.seleccionado)
                        ).then(response => {

                            console.log(response);
                            this.actualizar().then().catch();

                        }).catch(reason => {
                            this.utilService.manejarError(reason)
                        }).then(() => this.loading = false)
                            .then(() => this.seleccionarOrdenDeCompra(this.ordenDeCompraSeleccionada)) // recargar las entradas
                    }
                });
            }

        });
    }

}
