import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) {
        var roles = localStorage.getItem('rolAprobador').split(",");

        if (roles.some(r => r === 'EMPLEADO')) {
            this.router.navigateByUrl('/viajes/viajes-abiertos');
            localStorage.setItem('manual_name', 'Manual de Empleado');
            localStorage.setItem('manual_file', 'ManualEmpleadosSLAPI');
        }
        else if (roles.some(r => (r === 'CONTABILIDAD') || (r === 'GERENTES') || (r === 'CONTADOR PRESTADORA') || (r === 'DIRECTOR'))) {
            this.router.navigateByUrl('/viajes/comprobaciones-contador');
            localStorage.setItem('manual_name', 'Manual de Aprobador');
            localStorage.setItem('manual_file', 'ManualAprobadorSLAPI');
        }
        else if (roles.some(r => r === 'ADMINISTRADOR')) {
            this.router.navigateByUrl('/viajes/reporte-viajes');
            localStorage.setItem('manual_name', 'Manual de Administrador');
            localStorage.setItem('manual_file', 'ManualAdministradorSLAPI');
        }
    }

    ngOnInit() {}
}
