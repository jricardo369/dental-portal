import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    cargando: boolean = false;
    
    constructor() { }

    ngOnInit(): void {
    }

    refrescar() {}

}
