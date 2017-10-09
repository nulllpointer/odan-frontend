///<reference path="contacts.component.ts"/>
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/retry';
import {Contact} from "./contact";
import {Observable} from "rxjs/Observable";


@Injectable()
export class ContactService {

    id: number;
    hero: Contact;


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
        return this.http.put('http://localhost:8080/v1/billing/contacts', heros, {headers: headers}).map(res => res.json());;
    }

    getAllContacts(): Observable<any> {
        return this.http.get('http://localhost:8080/v1/billing/contacts').map((res: Response) => res.json().contacts);

    }

    getContact(name, email): Observable<any> {

        return this.http.get(`http://localhost:8080/v1/billing/contacts?firstName=${name}&email=${email}`).map((res: Response) => res.json().contacts);

    }

    getbyId(id): Observable<any> {
        return this.http.get(`http://localhost:8080/v1/billing/contacts/${id}`).map((res: Response) => res.json().data);

    }

    deleteContact(url: string, contact): Observable<any> {
      return  this.http.delete(url, contact);


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
