// src/app/services/festivo_services.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { Festivo } from '../models/festivo_model';

@Injectable({
  providedIn: 'root'
})
export class FestivoService {
  private readonly baseUrl = 'http://localhost:8080'; // Cambia esta URL por la de tu API

  constructor(private readonly http: HttpClient) {}

  verificarFestivo(año: number, mes: number, dia: number): Observable<boolean> {
    const url = `${this.baseUrl}/festivos/verificar/${año}/${mes}/${dia}`;
    console.log('Realizando petición a:', url);

    return this.http.get(url, { responseType: 'text' }).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      map(response => response === 'Es festivo'),
      catchError(this.handleError)
    );
  }

  obtenerFestivos(año: number): Observable<Festivo[]> {
    const url = `${this.baseUrl}/festivos/obtener/${año}`;
    console.log('Realizando petición a:', url);
    
    return this.http.get<Festivo[]>(url).pipe(
      tap(response => console.log('Respuesta festivos:', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición HTTP:', error);
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del cliente:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Código de error del backend: ${error.status}, ` +
                   `mensaje: ${error.message}`);
      console.error('Cuerpo de la respuesta:', error.error);
    }
    
    return throwError(() => new Error('Algo salió mal; por favor intenta de nuevo más tarde.'));
  }
}