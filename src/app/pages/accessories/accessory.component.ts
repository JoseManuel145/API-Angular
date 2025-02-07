import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormAccessoryComponent } from '../../components/form-accessory/form-accessory.component';
import { AccessoryService } from '../../services/accessory-service.service';
import { Accessory } from '../../models/accessory';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accessory',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormAccessoryComponent

  ],
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss']
})
export class AccessoryComponent implements OnInit {
  dataSource: Accessory[] = [];

  constructor(private accessoryService: AccessoryService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.accessoryService.getAccessories().subscribe({
      next: (accessories: Accessory[]) => {
        this.dataSource = accessories;
      },
      error: (error) => {
        console.error('Error de GET:', error);
        this.dataSource = [];
      }
    });
  }

  onSubmit(accessory_Id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar este accesorio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accessoryService.deleteProduct(accessory_Id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Accesorio eliminado con éxito', 'success');
            this.getData();
          },
          error: (error) => {
            Swal.fire('Error', 'Error al eliminar el accesorio: ' + error.message, 'error');
          }
        });
      }
    });
  }
}