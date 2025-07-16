// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FestivoService } from './services/festivo_services';
import { Festivo } from './models/festivo_model';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Festivos en Colombia';
  
  // Formularios reactivos (mantener para referencia)
  verificarForm: FormGroup;
  listarForm: FormGroup;
  
  // Datos para la tabla
  festivos: Festivo[] = [];
  loadingTable = false;
  formSubmitted = false;
  
  // Configuración de ngx-datatable
  ColumnMode = ColumnMode;
  SortType = SortType;
  columns = [
    { name: 'festivo', prop: 'festivo', display: 'Nombre del Festivo' },
    { name: 'fecha', prop: 'fecha', display: 'Fecha' }
  ];

  // Estados de verificación
  verificacionRealizada = false;
  esFestivo = false;
  loadingVerificacion = false;

  // Año actual para comparaciones
  currentYear = new Date().getFullYear();

  constructor(
    private readonly festivoService: FestivoService,
    private readonly snackBar: MatSnackBar
  ) {
    this.verificarForm = new FormGroup({
      fecha: new FormControl('', [Validators.required])
    });

    this.listarForm = new FormGroup({
      año: new FormControl(new Date().getFullYear(), [
        Validators.required,
        Validators.min(1900),
        Validators.max(2100)
      ])
    });
  }

  ngOnInit() {
    // Inicialización sin cargar datos automáticamente
  }

  // Método que recibe la fecha del componente hijo
  verificarFecha(fecha: Date) {
    this.loadingVerificacion = true;
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // getMonth() retorna 0-11
    const dia = fecha.getDate();

    this.festivoService.verificarFestivo(año, mes, dia).subscribe({
      next: (esFestivo) => {
        this.esFestivo = esFestivo;
        this.verificacionRealizada = true;
        this.loadingVerificacion = false;
        
        const mensaje = esFestivo 
          ? 'La fecha seleccionada ES un día festivo' 
          : 'La fecha seleccionada NO es un día festivo';
        
        this.snackBar.open(mensaje, 'Cerrar', {
          duration: 3000,
          panelClass: esFestivo ? ['success-snackbar'] : ['info-snackbar']
        });
      },
      error: (error) => {
        console.error('Error al verificar festivo:', error);
        this.loadingVerificacion = false;
        this.snackBar.open('Error al verificar la fecha. Verifique que el servidor esté funcionando.', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  // Método que recibe el año del componente hijo
  obtenerFestivos(año: number) {
    this.loadingTable = true;
    this.formSubmitted = true;

    this.festivoService.obtenerFestivos(año).subscribe({
      next: (festivos) => {
        this.festivos = festivos.map(festivo => ({
          ...festivo,
          fecha: this.formatearFecha(festivo.fecha)
        }));
        this.loadingTable = false;
        
        this.snackBar.open(`Se encontraron ${festivos.length} festivos para el año ${año}`, 'Cerrar', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        console.error('Error al obtener festivos:', error);
        this.loadingTable = false;
        this.snackBar.open('Error al obtener los festivos. Verifique que el servidor esté funcionando.', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  private formatearFecha(fechaIso: string): string {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  limpiarVerificacion() {
    this.verificacionRealizada = false;
    this.verificarForm.reset();
  }
}