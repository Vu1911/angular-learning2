import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../interfaces/product.interface";
import { ITransaction } from "../interfaces/transaction.interface";

@Injectable({providedIn: 'root'})
export class TransactionService {

    constructor(private http: HttpClient) {}

    onGetAllTransaction(){
        return this.http.get('http://localhost:3000/transactions')
    }

    onCreateTransaction(transaction: ITransaction){
        return this.http.post('http://localhost:3000/transactions', transaction);
    }

    onGetTransactionByProductId(productId: number): Observable<Array<ITransaction>>{
        return <Observable<Array<ITransaction>>>this.http.get(`http://localhost:3000/transactions?productId=${productId}`)
    }
   

}