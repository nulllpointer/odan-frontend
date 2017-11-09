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
        return this.http.get(url).map((res: Response) => res.json());

    }

   /* get(url,body): Observable<any> {
        return this.http.get(url,body).map((res: Response) => res.json());

    }
*/


    getUser(username, password): Observable<any> {

        return this.http.get(`http://localhost:8080/v1/billing/users?username=${username}&password=${password}`).map((res: Response) => res.json().users);
    }

    getbyId(url): Observable<any> {
        return this.http.get(url).map((res: Response) => res.json());

    }

    deleteById(url:string): Observable<any>{

        return this.http.get(url).map((res: Response) => res.json().data);

    }





}
