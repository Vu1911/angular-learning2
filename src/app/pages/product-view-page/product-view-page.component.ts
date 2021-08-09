import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IProduct, ProductStatus } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view-page',
  templateUrl: './product-view-page.component.html',
  styleUrls: ['./product-view-page.component.css'],
})
export class ProductViewPageComponent implements OnInit {
  requestId: number = 0;

  chosenProduct: IProduct = {
    id: 0,
    imgUrl: 'src/imgs/default-product-image.png',
    title: 'Product title',
    quantity: 0,
    price: 0,
    description: 'Description',
    status: ProductStatus.OPEN,
    viewNumber: 0,
    buyNumber: 0,
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.requestId = params['id'];
      this.productService
        .onGetProductById(this.requestId)
        .subscribe((product: IProduct) => {
          this.chosenProduct = product;
          this.chosenProduct.viewNumber += 1;
          this.productService
            .onUpdateProduct(this.chosenProduct)
            .subscribe((product: IProduct) => {
              this.chosenProduct = product;
            });
        });
    });
  }

  onBuyProduct(quantity: number) {
    this.chosenProduct.quantity -= quantity;
    this.chosenProduct.buyNumber += quantity;
    if (this.chosenProduct.quantity == 0) {
      this.chosenProduct.status = ProductStatus.CLOSE;
    }

    this.productService
      .onUpdateProduct(this.chosenProduct)
      .subscribe((data) => {
        alert('buy!');
      });
  }
}
