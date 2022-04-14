import { Rol } from "./rol";
import { Organizacion } from './organizacion';
import { Departamento } from "./departamento";
import { Grupo } from "./grupo";

export class Usuario {
    ceco: string;
    correoElectronico: string;
    departamentos: Departamento[];
    foto: string;
    grupo01: Grupo[];
    // empleado: boolean;
    nivel: string;
    nombre: string;
    organizaciones: Organizacion[];
    rol: Rol[];
    contrasenia: string;
    // usEsAdmin: boolean;
    usuario: string;
}
