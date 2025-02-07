import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Accessory } from '../models/accessory';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccessoryService {
  private apiURL = 'http://localhost:8080/accessories';

  private httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  constructor(private http: HttpClient) { }

  getAccessories(): Observable<Accessory[]> {
    return this.http.get<Accessory[]>(this.apiURL).pipe(
    catchError(this.handleError));
  }

  getAccessoriesById(accessory_id: number): Observable<Accessory> {
    return this.http.get<Accessory | null>(`${this.apiURL}/${accessory_id}`).pipe(
      map((accessory) => {
        if (!accessory) {
          throw new HttpErrorResponse({
            status: 404,
            statusText: 'Accesorio no encontrado'
          });
        }
        return accessory;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Accesorio no encontrado' }));
        }
        return throwError(() => error);
      })
    );
  }

  postAccessory(name: string, description: string): Observable<Accessory> {
    const newAccessory = { name, description };
    return this.http.post<Accessory>(this.apiURL, newAccessory, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(accessory_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${accessory_id}`);
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}