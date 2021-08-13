import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct, ProductStatus } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  @Input() colors = ["yellow", "red", "blue", "black"]
  @Output() transacProduct = new EventEmitter<boolean>()

  chosenColor = "black"

  @Input() chosenProduct : IProduct = {
    id: 0,
    imgUrl: "../../../../src/imgs/default-product-image.png",
    title: "Product title",
    quantity: 0,
    price: 0,
    description: "Description",
    status: ProductStatus.OPEN,
    viewNumber: 0,
    buyNumber: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

  setChosenColor(color: string){
    this.chosenColor = color
  }

  isProductClose(){
    return this.chosenProduct.status == ProductStatus.CLOSE
  }

  onOpenTransaction(){
    this.transacProduct.emit(true)
  }

}
