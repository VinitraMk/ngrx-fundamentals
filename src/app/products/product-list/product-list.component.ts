import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { initCurrentProduct, setCurrentProduct, toggleProductCode } from '../state/product.actions';
import { getCurrentSelectedProduct, getShowProductCode, State } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private productService: ProductService, private store: Store<State>) { }

  ngOnInit(): void {
    this.store.select(getCurrentSelectedProduct).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    )

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    this.store.select(getShowProductCode).subscribe(
      showProductCode => {
        this.displayCode = showProductCode;
      }
    )
  }


  checkChanged(): void {
    this.displayCode = !this.displayCode;
    this.store.dispatch(toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(setCurrentProduct({ product }))
  }

}
