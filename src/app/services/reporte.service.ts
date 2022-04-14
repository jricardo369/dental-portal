import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_URL } from '../app.config';
import { Observable } from 'rxjs';
import { Solicitud } from 'src/model/solicitud';
import { Prepoliza } from 'src/model/prepoliza';
import { Estatus } from '../../model/estatus';
import { OrganizacionF } from '../../model/organizacion-f';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }


    
consultarSolicitudesReporte(estatus: string, fechaI:string, fechaF:string, empresas:string, esEvento: boolean, numeroSolicitudFiltro: number): Promise<Solicitud[]> {
  let params = new HttpParams();
  params = params.set('fechaInicio', fechaI);
  params = params.set('fechaFin', fechaF);
  params = params.set('estatus', !esEvento ? estatus : '');
  params = params.set('evento', esEvento ? estatus : '');
  params = params.set('empresas', empresas);
  params = params.set('numeroSolicitud', numeroSolicitudFiltro ? numeroSolicitudFiltro.toString() : '0');
  
  return new Promise((resolve, reject) => this.http
      .get(API_URL + 'viaticos-usuario/solicitudes-de-viaticos/reporte',
      {
          params: params,
          withCredentials: true,
          observe: 'body',
          headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
      })
      .toPromise()
      .then(response => {
          resolve(response as Solicitud[]);
      })
      .catch(reason => reject(reason))
  );
}
  
consultarPrepoliza(no: string): Promise<Prepoliza[]> {
  return new Promise((resolve, reject) => this.http
      .get(API_URL + 'prepolizas/'+no,
      {
          withCredentials: true,
          observe: 'body',
          headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
      })
      .toPromise()
      .then(response => {
          resolve(response as Prepoliza[]);
      })
      .catch(reason => reject(reason))
  );
}
  
descargarSolicitudesReportePDF(empleado: string, estatus: string, fechaI:string, fechaF:string, empresas:string, esEvento: boolean, numeroSolicitudFiltro: number): Observable<Blob> {
  let params = new HttpParams();
  params = params.set('fechaInicio', fechaI);
  params = params.set('fechaFin', fechaF);
  params = params.set('estatus', !esEvento ? estatus : '');
  params = params.set('evento', esEvento ? estatus : '');
  params = params.set('empresas', empresas);
  params = params.set('numeroSolicitud', numeroSolicitudFiltro ? numeroSolicitudFiltro.toString() : '0');
  params = params.set('usuario', empleado);
  
  const httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('auth_token'),
  });
  const options = {
    params: params,
    headers: httpHeaders,
    responseType: 'blob' as 'json'
  };
  return this.http.get<any>(
      
      API_URL + 'reportes-pdf/pdf-reporte',
      options
  );
}

descargarSolicitudesReporteXLSX(empleado: string, estatus: string, fechaI:string, fechaF:string, empresas:string, esEvento: boolean, numeroSolicitudFiltro: number): Observable<Blob> {
  let params = new HttpParams();
  params = params.set('fechaInicio', fechaI);
  params = params.set('fechaFin', fechaF);
  params = params.set('estatus', !esEvento ? estatus : '');
  params = params.set('evento', esEvento ? estatus : '');
  params = params.set('empresas', empresas);
  params = params.set('numeroSolicitud', numeroSolicitudFiltro ? numeroSolicitudFiltro.toString() : '0');
  params = params.set('usuario', empleado);
  
  const httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('auth_token'),
  });
  const options = {
    params: params,
    headers: httpHeaders,
    responseType: 'blob' as 'json'
  };
  return this.http.get<any>(
      
      API_URL + 'reportes-excel/excel-reporte',
      options
  );
}
  
consultarEventos(): Promise<string[]> {
  return new Promise((resolve, reject) => this.http
      .get(API_URL + 'viaticos-usuario/solicitudes-de-viaticos/eventos-reporte',
      {
          withCredentials: true,
          observe: 'body',
          headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
      })
      .toPromise()
      .then(response => {
          resolve(response as string[]);
      })
      .catch(reason => reject(reason))
  );
}
  
consultarEstatus( ): Promise<Estatus[]> {
  return new Promise((resolve, reject) => this.http
      .get(API_URL + 'estatus',
      {
          withCredentials: true,
          observe: 'body',
          headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
      })
      .toPromise()
      .then(response => {
          resolve(response as Estatus[]);
      })
      .catch(reason => reject(reason))
  );
}
  
consultarOrganizacion( ): Promise<OrganizacionF[]> {
  return new Promise((resolve, reject) => this.http
      .get(API_URL + 'organizacion',
      {
          withCredentials: true,
          observe: 'body',
          headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token')),
      })
      .toPromise()
      .then(response => {
          resolve(response as OrganizacionF[]);
      })
      .catch(reason => reject(reason))
  );
}

}
