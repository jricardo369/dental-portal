import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilService } from 'src/app/services/util.service';
import { Usuario } from './../../../model/usuario';
import { Paciente } from './../../../model/paciente';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Sociedad } from 'src/model/sociedad';

@Component({
  selector: 'app-dialogo-usuario',
  templateUrl: './dialogo-usuario.component.html',
  styleUrls: ['./dialogo-usuario.component.css']
})
export class DialogoUsuarioComponent implements OnInit {

	cargando: boolean = false;
	creando: boolean = false;
	titulo: string = 'Usuario';
	usuario: Usuario = new Usuario();
	pacientes: Paciente[] = [];
	paciente: Paciente = new Paciente();
	

	constructor(
		private usuariosService: UsuariosService,
		private pacientesService: PacientesService,
		public utilService: UtilService,
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<DialogoUsuarioComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
			if (data.usuario) {
				this.titulo = "Editar usuario"
				this.usuario.usuario = data.usuario;
				this.refrescar();
				this.creando = false;
			} else {
				this.titulo = "Crear usuario";
				this.creando = true;
			}
		}

	ngOnInit(): void {
	}

	refrescar() {
        this.cargando = true;
        this.usuariosService
            .obtenerUsuario(this.usuario.usuario)
            .then(usuario => {
                this.usuario = usuario;

				if(this.usuario.rol == "3") {
					this.obtenerPacientes();
				}
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	obtenerPacientes() {
        this.cargando = true;
        this.pacientesService
            .obtenerPacientes()
            .then(pacientes => {
				this.pacientes = pacientes;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	rolSelected() {
		if(this.usuario.rol == "3") {
			this.obtenerPacientes();
		}
	}

	pacienteSelected() {
		this.usuario.nombre = this.paciente.nombre;
		this.usuario.direccion = this.paciente.direccion;
		this.usuario.ciudad = this.paciente.ciudad;
		this.usuario.edad = this.paciente.edad;
		this.usuario.sexo = this.paciente.sexo;
		this.usuario.telefono = this.paciente.telefono;
	}

	crear() {
		this.usuario.sociedad = { sociedad: 1, nombre: "", fechaCreacion: "", estatus: true };
		// let date = new Date();
		// this.usuario.fechaCreacion = new Date().toLocaleDateString();
		this.usuario.fechaCreacion = "2020-12-20";
		this.usuario.estatus = "0";
		

		this.cargando = true;
        this.usuariosService
            .insertarUsuario(this.usuario)
            .then(usuario => {
				this.cerrar();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	editar() {
		this.cargando = true;
        this.usuariosService
            .editarUsuario(this.usuario)
            .then(usuario => {
				this.cerrar();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	eliminar() {}

	cerrar() { this.dialogRef.close(); }

}
