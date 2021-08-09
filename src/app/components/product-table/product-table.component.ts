import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit, OnChanges {

  @Input() productsShowed :  Array<IProduct> = [{
    id: 0,
    imgUrl: "",
    title: "",
    quantity: 0,
    price: 0,
    description: "",
    status: "",
    viewNumber: 0,
    buyNumber: 0
  }]
  @Input() totalPage = 10
  @Input() noPerPage = 5
  @Input() currentPage = 0

  @Output() chosenPage = new EventEmitter<number>()
  @Output() onEditProduct = new EventEmitter<number>()
  @Output() onDeleteProduct = new EventEmitter<number>()
  
  pages: Array<number> = [] 
  
  constructor() { }

  ngOnInit(): void {
    this.pages = Array.from(Array(this.totalPage),(x,i)=>i);
  }

  ngOnChanges(){
    this.pages = Array.from(Array(this.totalPage),(x,i)=>i);
  }

  onChoosePage(pageNumber: number){
    this.chosenPage.emit(pageNumber)
  }

  onEdit(productId: number) {
    this.onEditProduct.emit(productId)
  }

  onDelete(productId: number) {
    this.onDeleteProduct.emit(productId)
  }


}
