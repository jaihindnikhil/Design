import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  selectedImage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(prods => {
      this.products = prods;

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