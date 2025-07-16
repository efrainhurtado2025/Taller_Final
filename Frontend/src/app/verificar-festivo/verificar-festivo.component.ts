import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-verificar-festivo',
  templateUrl: './verificar-festivo.component.html',
  styleUrls: ['./verificar-festivo.component.css']
})
export class VerificarFestivoComponent {
  @Output() verificar = new EventEmitter<Date>();
  verificarForm = new FormGroup({
    fecha: new FormControl('', [Validators.required])
  });
  onSubmit() {
    if (this.verificarForm.valid) {
      const fechaValue = this.verificarForm.value.fecha;
      if (fechaValue) {
        this.verificar.emit(new Date(fechaValue));
      }
    }
  }
}
