import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { IProduct, ProductStatus } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent implements OnInit {

  editFormOpen = false
  createFormOpen = false

  allProducts : Array<IProduct> = [
    {
      id: 0,
      imgUrl: "./src/imgs/default-product-image.png",
      title: "Product title 1",
      quantity: 0,
      price: 0,
      description: "Description",
      status: ProductStatus.OPEN,
      viewNumber: 0,
      buyNumber: 0
    }
  ]

  productsShowed : Array<IProduct> = [
    {
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
  ]

  totalPage = 0
  noPerPage = 2
  currentPage = 0

  placeholder : IProduct = {
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

  labels: string[] = []
  chartData: number[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.updateData();
  }

  updateData(){
    this.productService.onGetAllProducts().subscribe((products) => {
      this.allProducts = products
      this.updatePagination()
      this.updateChart()
    })
  }

  updatePagination(){
    this.totalPage = Math.ceil(this.allProducts.length / this.noPerPage)
    this.currentPage = 0
    this.productsShowed = this.allProducts.slice(this.getStartIndex(), this.getEndIndex())
    this.createFormOpen = false
    this.editFormOpen = false
  }

  updateChart(){
    let totalViews =  this.allProducts.map(x => x.viewNumber).reduce((a, b)=> a + b)
    let sortedViewProducts = JSON.parse(JSON.stringify(this.allProducts)).sort((a: IProduct, b: IProduct) => - a.viewNumber + b.viewNumber).slice(0,3)
    
    this.labels = sortedViewProducts.map((product: IProduct) => product.title)
    this.labels.push('others')
    

    this.chartData = sortedViewProducts.map((product: IProduct) => product.viewNumber)
    this.chartData.push(totalViews - this.chartData.reduce((a: number, b: number)=> a + b))

    console.log(this.chartData)
    console.log(this.labels)
  }

  getStartIndex(){
    return (this.currentPage)*this.noPerPage
  }

  getEndIndex(){
    return this.getStartIndex() + this.noPerPage
  }

  onChangePage(pageNumber: number){
    this.currentPage = pageNumber
    this.productsShowed = this.allProducts.slice(this.getStartIndex(), this.getEndIndex())
  }

  onEditProduct(productId: number){
    this.productService.onGetProductById(productId).subscribe((product) => {
      this.placeholder = product
      this.editFormOpen = true
    })
  }

  closeEditForm(isCloseForm: boolean){
    this.editFormOpen = !isCloseForm
  }

  onEditSubmit(product : IProduct){
    this.productService.onUpdateProduct(product).subscribe((product) => {
      this.updateData()
    })

  }

  onCreateProduct(){
    this.createFormOpen = true
  }

  closeCreateForm(isCloseForm: boolean){
    this.createFormOpen = !isCloseForm
  }

  onCreateSubmit(product: IProduct){
    this.productService.onCreateProduct(product).subscribe((newProduct: IProduct) => {
      this.updateData()
    })
  }

  onDeleteProduct(productId: number){
    this.productService.onDelete(productId).subscribe((data) => {
      this.updateData()
    })
  }



}
