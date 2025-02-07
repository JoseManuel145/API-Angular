import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet-service.service';
import { Pet } from '../../models/pet';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormPetComponent } from '../../components/form-pet/form-pet.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormPetComponent
  ],
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  dataSource: Pet[] = [];

  constructor(private petService: PetService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.petService.getPets().subscribe({
      next: (pets: any) => {
        if (Array.isArray(pets)) {
          this.dataSource = pets;
        } else if (pets === null) {
          console.error('Error: No hay mascotas');
        } else {
          console.error('Error: la respuesta no es un array');
          this.dataSource = [];
        }
      },
      error: (error) => {
        console.error('Error de GET:', error);
      }
    });
  }

  onSubmit(pet_Id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta mascota?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.petService.deletePet(pet_Id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Mascota eliminada con éxito', 'success');
            this.getData();
          },
          error: (error) => {
            Swal.fire('Error', 'Error al eliminar la mascota: ' + error.message, 'error');
          }
        });
      }
    });
  }
}