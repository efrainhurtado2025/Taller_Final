// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// NGX Datatable
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// Components

import { AppComponent } from './app.component';
import { FestivoService } from './services/festivo_services';
import { NavbarComponent } from './navbar/navbar.component';
import { VerificarFestivoComponent } from './verificar-festivo/verificar-festivo.component';
import { ListarFestivosComponent } from './listar-festivos/listar-festivos.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VerificarFestivoComponent,
    ListarFestivosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    // Angular Material
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    
    // NGX Datatable
    NgxDatatableModule
  ],
  providers: [FestivoService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
