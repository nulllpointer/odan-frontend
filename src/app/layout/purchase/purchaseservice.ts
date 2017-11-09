import {Headers, Http, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/retry';
import {Product} from "../order/product";
import {Purchase} from "./purchase";


@Injectable()
export class PurchaseService {
    options: RequestOptions;
    id: number;
    product: Product;
    results: string[];
    headers = new Headers({
        'Content-Type': 'application/json'
    });


    private requestUrl = 'http://localhost:8080/v1/billing/purchases';


    constructor(private http: Http) {
        let test = {"search": "person"};
        var her = new Product();
        /* let id=this.purchase.id;
         let name=this.purchase.name;
         let price=this.purchase.price;
         */

    }


    createPurchase(heros): Promise<any> {
        this.options = new RequestOptions({headers: this.headers});
        let body = JSON.stringify(heros);
        console.log(body);
        return this.http
            .post("http://localhost:8080/v1/billing/purchases", body, this.options)
            .toPromise()
            .catch(this.handleError);

    }

 getAllPurchases(): Promise <Product[]> {
        return this.http.get("http://localhost:8080/v1/billing/purchases")
            .toPromise()
            .then(response => response.json() as Purchase[])
            .catch(this.handleError);

    }


    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}
