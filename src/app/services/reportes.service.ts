import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReporteMovimiento } from './../../model/reporteMovimiento';
import { API_URL } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
	
	constructor(private http: HttpClient) { }

    obtenerReporteTotalDeMovimientosDePaciente(idPaciente: number, fechaInicio: string, fechaFin: string): Promise<ReporteMovimiento> {
        return new Promise<ReporteMovimiento>((resolve, reject) => this.http
            .get(API_URL + 'reportes/totales-movimientos-usuario/por-fecha/' + idPaciente + '?fechai=' + fechaInicio + '&fechaf=' + fechaFin,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as ReporteMovimiento);
            })
            .catch(reason => reject(reason))
        );
    }

    obtenerPdfHistoriales(idPaciente: number, fechaInicio: string, fechaFin: string): Observable<Blob> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        });
        const options = {
            headers: httpHeaders,
            responseType: 'blob' as 'json'
        };
        return this.http.get<any>(
            API_URL + 'reportes/pdf-historiales/' + idPaciente + '?fechai=' + fechaInicio + '&fechaf=' + fechaFin,
            options
        );
    }
    obtenerPdfPagosGeneral(fechaInicio: string, fechaFin: string): Observable<Blob> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        });
        const options = {
            headers: httpHeaders,
            responseType: 'blob' as 'json'
        };
        return this.http.get<any>(
            API_URL + 'reportes/pdf-pagos-general/1?fechai=' + fechaInicio + '&fechaf=' + fechaFin,
            options
        );
    }

    obtenerPdfPagosPaciente(idPaciente: number,fechaInicio: string, fechaFin: string): Observable<Blob> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        });
        const options = {
            headers: httpHeaders,
            responseType: 'blob' as 'json'
        };
        return this.http.get<any>(
            API_URL + 'reportes/pdf-pagos-paciente/' + idPaciente + '?fechai=' + fechaInicio + '&fechaf=' + fechaFin,
            options
        );
    }
}
