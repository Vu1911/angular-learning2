import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../interfaces/product.interface";

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) {}

    onGetAllProducts(): Observable<any> {
        return this.http.get('http://localhost:3000/products')
    }

    onGetProductById(id: number): Observable<any> {
        return this.http.get(`http://localhost:3000/products/${id}`)
    }

    onGetProductByTitle(title: string): Observable<any> {
        return this.http.get(`http://localhost:3000/products?title=${title}`);
    }

    onCreateProduct(product: IProduct) : Observable<any> {
        product.id = 0
        return this.http.post('http://localhost:3000/products', product);
    }

    onUpdateProduct(product: IProduct) : Observable<any> {
        return this.http.put(`http://localhost:3000/products/${product.id}`, product);
    }

    onDelete(id: number){
        return this.http.delete(`http://localhost:3000/accounts/${id}`)
    }

}