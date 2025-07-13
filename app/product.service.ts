import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Product {
  name: string;
  img: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get('assets/all360.txt', { responseType: 'text' }).pipe(
      map(text => text.trim().split('\n').map(line => {
        const [name, img] = line.split('|');
        return { name, img };
      }))
    );
  }
}