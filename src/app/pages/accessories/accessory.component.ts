import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormAccessoryComponent } from '../../components/form-accessory/form-accessory.component';
import { AccessoryService } from '../../services/accessory-service.service';
import { Accessory } from '../../models/accessory';

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
    if (confirm('¿Estás seguro de eliminar este accesorio?')) {
      this.accessoryService.deleteProduct(accessory_Id).subscribe({
        next: () => {
          console.log('Accesorio eliminado con éxito');
          this.getData();
        },
        error: (error) => {
          console.error('Error al eliminar el accesorio:', error);
        }
      });
    }
  }
}