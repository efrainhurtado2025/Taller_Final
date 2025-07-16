import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar-festivos',
  templateUrl: './listar-festivos.component.html',
  styleUrls: ['./listar-festivos.component.css']
})
export class ListarFestivosComponent {
  @Output() obtener = new EventEmitter<number>();
  listarForm = new FormGroup({
    año: new FormControl(new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(2100)])
  });
  onSubmit() {
    if (this.listarForm.valid) {
      const añoValue = this.listarForm.value.año;
      if (añoValue !== null && añoValue !== undefined) {
        this.obtener.emit(añoValue);
      }
    }
  }
}
