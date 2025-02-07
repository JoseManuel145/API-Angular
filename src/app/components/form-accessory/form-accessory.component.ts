import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccessoryService as AccessoryService } from '../../services/accessory-service.service';

@Component({
  selector: 'form-accessory',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-accessory.component.html',
  styleUrls: ['./form-accessory.component.scss']
})
export class FormAccessoryComponent {
  accessoryForm: FormGroup;

  constructor(private fb: FormBuilder, private accessoryService: AccessoryService) {
    this.accessoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.accessoryForm.valid) {
      console.log('Formulario enviado:', this.accessoryForm.value);
      this.accessoryService.postAccessory(this.accessoryForm.value.name, this.accessoryForm.value.description).subscribe(response => {
        console.log('Accesorio creado:', response);
      }, error => {
        console.error('Error al crear el accesorio:', error);
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}