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

    getProductById(productId): Observable<any> {

        return this.http.get(`http://localhost:8080/v1/billing/products/${productId}`).map((res: Response) => res.json().data);

    }





}
