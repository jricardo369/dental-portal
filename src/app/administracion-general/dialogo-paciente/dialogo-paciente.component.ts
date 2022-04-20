import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogoSimpleComponent } from 'src/app/common/dialogo-simple/dialogo-simple.component';
import { PacientesService } from 'src/app/services/pacientes.service';
import { UtilService } from 'src/app/services/util.service';
import { Paciente } from 'src/model/paciente';

@Component({
  selector: 'app-dialogo-paciente',
  templateUrl: './dialogo-paciente.component.html',
  styleUrls: ['./dialogo-paciente.component.scss']
})
export class DialogoPacienteComponent implements OnInit {

	cargando: boolean = false;
	creando: boolean = false;
	odontograma: boolean = false;
	titulo: string = '';
	pacientes: Paciente[] = [];
	paciente: Paciente = new Paciente();

	public file: File;
	usuario: string = "";

    foto: any;
    fotoString: string = "";
	

	constructor(
		private pacientesService: PacientesService,
		public utilService: UtilService,
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<DialogoPacienteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
			if (data.idPaciente) {
				this.titulo = "Editar Paciente"
				this.paciente.idPaciente = data.idPaciente;
				this.refrescar();
				this.creando = false;
			} else {
				this.titulo = "Crear Paciente";
				this.creando = true;
			}
		}

	ngOnInit(): void {
	}

	refrescar() {
        this.cargando = true;
        this.pacientesService
            .obtenerPaciente(this.paciente.idPaciente)
            .then(paciente => {
                this.paciente = paciente;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	crear() {
		this.cargando = true;
        this.pacientesService
            .insertarPaciente(this.paciente)
            .then(paciente => {
				this.cerrar();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	editar() {
		this.cargando = true;
        this.pacientesService
            .editarPaciente(this.paciente)
            .then(paciente => {
				this.cerrar();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	eliminar() {
		this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Eliminar paciente',
                texto: 'Está a punto de eliminar el paciente con id: ' + this.paciente.idPaciente + '. Esta operación no es reversible.',
                botones: [
                    { texto: 'No eliminar', color: '', valor: '' },
                    { texto: 'Eliminar paciente', color: 'primary', valor: 'eliminar' },
                ]
            },
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'eliminar') {
                this.cargando = true;
				this.pacientesService
					.eliminarPaciente(this.paciente.idPaciente)
					.then(paciente => {
						this.cerrar();
					})
					.catch(reason => this.utilService.manejarError(reason))
					.then(() => this.cargando = false);
            }
        }).catch(reason => this.utilService.manejarError(reason));
	}

	cerrar() { this.dialogRef.close(); }

	onFileSelected(files: FileList) { 
        this.file = files.length && files.item(0).type.startsWith('image/') ? files.item(0) : null;
    }

}
