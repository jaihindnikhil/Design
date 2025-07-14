import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from './product.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  selectedImage: string | null = null;

  constructor(private productService: ProductService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.products = [
  { name: 'abc', img: '...' }
];
    this.productService.getProducts().subscribe(prods => {
      this.products = this.products.concat(prods);
this.cdr.detectChanges();
      const params = new URLSearchParams(window.location.search);
      const image = params.get('image');
      if (image) {
        this.selectedImage = image;
      }
    });

  }

  selectProduct(product: Product) {
    this.selectedImage = product.img;

    const url = new URL(window.location.href);
    url.searchParams.set('image', product.img);
    window.history.pushState({}, '', url);
  }
}