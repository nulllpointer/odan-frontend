///<reference path="contacts.component.ts"/>
import {Headers, Http, RequestMethod, RequestOptions, Response, RequestOptionsArgs} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/retry';
import {Contact} from "./contact";
import {Observable} from "rxjs/Observable";


@Injectable()
export class ContactService {

    id: number;
    hero: Contact;
    private headers: any;



    constructor(private http: Http) {
        let test = {"search": "person"};
        var her = new Contact();

    }


    createContact(url, heros): Observable<any> {
        return this.http.post(url, heros);

    }

    update(heros): Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/v1/billing/sales', heros);
    }

    getAllContacts(): Observable<any> {
        return this.http.get('http://localhost:8080/v1/billing/sales').map((res: Response) => res.json());

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

        let options = new RequestOptionsArgs({
            body: body,
            method: RequestMethod.Delete
        });

        this.http.request('http://testAPI:3000/stuff', options)
            .subscribe((ok)=>{console.log(ok)});

      return this.http.request(url, options);


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
