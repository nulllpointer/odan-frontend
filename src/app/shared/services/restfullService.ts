import {Headers, Http, Response} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/retry';
import {Observable} from "rxjs/Observable";
import {Contact} from "../../layout/contacts/contact";


@Injectable()
export class RestfullService {

    id: number;
    hero: Contact;
    private headers: any;



    constructor(private http: Http) {
        let test = {"search": "person"};
        var her = new Contact();

    }


    create(url, heros): Observable<any> {
        return this.http.post(url, heros);

    }


    getAll(url): Observable<any> {
        return this.http.get(url).map((res: Response) => res.json().contacts);

    }

    getContact(name, email): Observable<any> {

        return this.http.get(`http://localhost:8080/v1/billing/contacts?firstName=${name}&email=${email}`).map((res: Response) => res.json().contacts);

    }

    getbyId(url): Observable<any> {
        return this.http.get(url).map((res: Response) => res.json().data);

    }

    deleteById(url:string): Observable<any>{

        return this.http.get(url).map((res: Response) => res.json().data);



    }





}
