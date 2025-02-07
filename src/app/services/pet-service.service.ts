import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Pet } from '../models/pet';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiURL = 'http://localhost:8080/pets';

  private httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiURL).pipe(
      catchError(this.handleError));
  }

  getPetsById(pet_id: number): Observable<Pet> {
    return this.http.get<Pet | null>(`${this.apiURL}/${pet_id}`).pipe(
      map((accessory) => {
        if (!accessory) {
          throw new HttpErrorResponse({
            status: 404,
            statusText: 'Mascota no encontrada'
          });
        }
        return accessory;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Mascota no encontrado' }));
        }
        return throwError(() => error);
      })
    );
  }

  createPet(name: string, raza: string): Observable<any> {
    const pet = { name, raza };
    return this.http.post<any>(this.apiURL, pet, this.httpOptions);
  }

  deletePet(pet_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${pet_id}`);
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}