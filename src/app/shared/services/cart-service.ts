import {Http, Response} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/retry';
import {Observable} from "rxjs/Observable";
import {Contact} from "../../layout/contacts/contact";


@Injectable()
export class CartService {

    id: number;
    hero: Contact;
    private headers: any;



    constructor(private http: Http) {


    }

    getProductPrice(productId, txnDate): Observable<any> {

        return this.http.get(`http://localhost:8080/v1/billing/product-price?productId=${productId}&txnDate=${txnDate}`).map((res: Response) => res.json().data);

    }





}
