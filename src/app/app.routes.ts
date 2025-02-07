import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AccessoryComponent } from './pages/accessories/accessory.component';
import { PetComponent } from './pages/pet/pet.component';

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' }, 
    {path: 'main', component: MainPageComponent},
    {path: 'accessories', component: AccessoryComponent},
    {path: 'pets', component: PetComponent},
    {path: '**', redirectTo: '/main'}
];
