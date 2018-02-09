import {Headers, Http, RequestMethod, RequestOptions, Response, RequestOptionsArgs} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/retry';
import {Observable} from "rxjs/Observable";
import {Product} from "./product";


@Injectable()
export class ContactService {

    id: number;
    hero: Product;
    private headers: any;



    constructor(private http: Http) {
        let test = {"search": "person"};
        var her = new Product();

    }


    createContact(url, heros): Observable<any> {
        return this.http.post(url, heros);

    }

    update(heros): Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/v1/billing/sales', heros);
    }

    getAllProducts(): Observable<any> {
        return this.http.get('http://localhost:8080/v1/billing/products').map((res: Response) => res.json());

    }

    getContact(name, email): Observable<any> {

        return this.http.get(`http://localhost:8080/v1/billing/contacts?firstName=${name}&email=${email}`).map((res: Response) => res.json().sales);

    }

    getbyId(id): Observable<any> {
        return this.http.get(`http://localhost:8080/v1/billing/contacts/${id}`).map((res: Response) => res.json().data);

    }

    deleteData(url:string){

        this.http.delete(url, this.headers)
            .subscribe();


    }




    /*deleteContact(url: string): Observable<any> {
        let body = {
            id: 6,
            };

        let timeUnitOptions = new RequestOptionsArgs({
            body: body,
            method: RequestMethod.Delete
        });

        this.http.request('http://testAPI:3000/stuff', timeUnitOptions)
            .subscribe((ok)=>{console.log(ok)});

      return this.http.request(url, timeUnitOptions);


    }
*/

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}
