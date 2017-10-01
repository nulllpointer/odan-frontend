///<reference path="contacts.component.ts"/>
import {Headers, Http, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/retry';
import {Contact} from "./contact";
import {ContactsComponent} from "./contacts.component";
import {Subject} from "rxjs/Subject";


@Injectable()
export class ContactService {




    options: RequestOptions;
    id: number;
    hero: Contact;
    results: string[];
    headers = new Headers({
        'Content-Type': 'application/json'
    });


    private baseUrl = 'http://localhost:8080';
    private baseUrl1 = 'http://localhost:8080/v1/billing/contacts';
    private baseUrl2 = 'http://localhost:8080/v1/billing/contacts';


    constructor(private http: Http) {
        let test = {"search": "person"};
        var her = new Contact();

    }


    createProoduct(heros): Promise<any> {
        this.options = new RequestOptions({headers: this.headers});
        let body = JSON.stringify(heros);
        console.log(body);
        return this.http
            .post("http://localhost:8080/v1/billing/contacts", body, this.options)
            .toPromise()
            .catch(this.handleError);

    }


  getAllContacts() {



      return this.http.get("http://localhost:8080/v1/billing/contacts")
            .toPromise()
            .then(response => {response.json().contacts as Contact[]
            let comp= new ContactsComponent(this,this.http);

            console.log("our data", response.json())

            })
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
