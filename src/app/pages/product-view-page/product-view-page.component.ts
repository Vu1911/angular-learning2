import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IProduct, ProductStatus } from 'src/app/interfaces/product.interface';
import { ITransaction, TransactionType } from 'src/app/interfaces/transaction.interface';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';

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

  isOpenTransaction: boolean= false

  data: any = []

  isShowChart: boolean= false

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.requestId = params['id'];
      this.updateChart()
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

  onOpenTransaction(isOpenTransaction: boolean) {
    this.isOpenTransaction = isOpenTransaction
  }

  onCloseTransaction(isCloseTransaction: boolean){
    this.isOpenTransaction = !isCloseTransaction
  }

  onSubmitTransaction(request: any){
    let transaction: ITransaction = {
      id: 0,
      productId: 0,
      type: TransactionType.ADD,
      transactionAmount: 0,
      productQuantity: 0,
      timestamp: new Date()
    }

    transaction.productId = this.requestId
    transaction.type = request.type
    transaction.transactionAmount = request.quantity
    transaction.timestamp = new Date(request.date)
    transaction.productQuantity = (transaction.type == TransactionType.ADD)? this.chosenProduct.quantity + transaction.transactionAmount : this.chosenProduct.quantity - transaction.transactionAmount

    this.chosenProduct.quantity = transaction.productQuantity;

    this.productService.onUpdateProduct(this.chosenProduct).subscribe((product) => {
      this.transactionService.onCreateTransaction(transaction).subscribe((transaction)=> {
        this.isOpenTransaction = false
        this.isShowChart = false
        this.updateChart()
      })
    })

  }

  updateChart(){
    this.transactionService.onGetTransactionByProductId(this.requestId).subscribe((transactions: Array<ITransaction>)=> {
      transactions.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : (a.id < b.id)? 1 : -1))

      let dataList = (transactions.length < 10)? transactions : transactions.slice(-10)

      this.data = dataList.map(data => [new Date(data.timestamp), data.productQuantity])

      console.log(this.data)
      console.log(typeof this.data[0][0])
      this.isShowChart = true
    })
  }

  showChart(isShowChart: boolean){
    this.isShowChart = isShowChart
  }
}
