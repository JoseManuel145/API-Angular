import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../../services/pet-service.service';

@Component({
  selector: 'form-pet',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-pet.component.html',
  styleUrl: './form-pet.component.scss'
})

export class FormPetComponent {
  petForm: FormGroup;

  constructor(private fb: FormBuilder, private petService: PetService) {
    this.petForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      raza: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.petForm.valid) {
      console.log('Formulario enviado:', this.petForm.value);
      this.petService.createPet(this.petForm.value.name, this.petForm.value.raza).subscribe(response => {
        console.log('Mascota creada:', response);
      }, error => {
        console.error('Error al crear la mascota:', error);
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}