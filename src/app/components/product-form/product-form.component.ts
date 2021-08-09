import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct, ProductStatus } from 'src/app/interfaces/product.interface';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  statusList = Object.values(ProductStatus)
  productForm: FormGroup = new FormGroup({})

  @Input() productFormTitle: string = ""
  @Input() placeholder : IProduct = {
    id: 0,
    imgUrl: "src/imgs/default-product-image.png",
    title: "Product title",
    quantity: 0,
    price: 0,
    description: "Description",
    status: ProductStatus.OPEN,
    viewNumber: 0,
    buyNumber: 0
  }

  @Output() onCloseForm = new EventEmitter<boolean>()
  @Output() submit = new EventEmitter<IProduct>()

  constructor() { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      'imgUrl': new FormControl(this.placeholder.imgUrl, [Validators.required]),
      'title': new FormControl(this.placeholder.title, [Validators.required]),
      'quantity': new FormControl(this.placeholder.quantity, [Validators.required, Validators.min(1)]),
      'price': new FormControl(this.placeholder.price, [Validators.required, Validators.min(1)]),
      'description': new FormControl(this.placeholder.description,[Validators.required]),
      'status': new FormControl(this.placeholder.status),
    })
  }

  onSubmit(){
    let chosenProduct = JSON.parse(JSON.stringify(this.placeholder))
    Object.keys(chosenProduct).map((key) => {
      if(key != 'id'){
        if(this.productForm.value[key]){
          chosenProduct[key] = this.productForm.value[key]
        }
      }
    })
    this.submit.emit(chosenProduct)
    return
  }

  onClose(){
    this.onCloseForm.emit(true)
  }

}
