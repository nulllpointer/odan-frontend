import {Headers, Http, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/retry';
import {Product} from "./product";


@Injectable()
export class MenuService {
    options: RequestOptions;
    id: number;
    product: Product;
    results: string[];
    headers = new Headers({
        'Content-Type': 'application/json'
    });


    private baseUrl = 'http://localhost:8080';
    private baseUrl1 = 'http://localhost:8080/all/product';
    private baseUrl2 = 'http://localhost:8080/all/product';


    constructor(private http: Http) {
        let test = {"search": "person"};
        var her = new Product();
        /* let id=this.product.id;
         let name=this.product.name;
         let price=this.product.price;
         */

    }


    createProoduct(heros): Promise<any> {
        this.options = new RequestOptions({headers: this.headers});
        let body = JSON.stringify(heros);
        console.log(body);
        return this.http
            .post("http://localhost:8080/all/product", body, this.options)
            .toPromise()
            .catch(this.handleError);

    }

 getAllProducts(): Promise <Product[]> {
        return this.http.get("http://localhost:8080/v1/billing/sales")
            .toPromise()
            .then(response => response.json() as Product[])
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
