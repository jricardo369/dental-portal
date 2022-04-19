import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-pacientes',
  templateUrl: './historial-pacientes.component.html',
  styleUrls: ['./historial-pacientes.component.css']
})
export class HistorialPacientesComponent implements OnInit {

  cargando: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  refrescar() {}

}
