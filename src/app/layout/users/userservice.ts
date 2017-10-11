///<reference path="users.component.ts"/>
import {Headers, Http, RequestMethod, RequestOptions, Response, RequestOptionsArgs} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/retry';
import {User} from "./user";
import {Observable} from "rxjs/Observable";


@Injectable()
export class UserService {

    id: number;
    hero: User;
    private headers: any;



    constructor(private http: Http) {
        let test = {"search": "person"};
        var her = new User();

    }


    createUser(url, heros): Observable<any> {
        return this.http.post(url, heros);

    }

    update(heros): Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:8080/v1/security/users', heros, {headers: headers}).map(res => res.json());;
    }

    getAllUsers(): Observable<any> {
        return this.http.get('http://localhost:8080/v1/security/users').map((res: Response) => res.json().users);

    }

    getUser(name, email): Observable<any> {

        return this.http.get(`http://localhost:8080/v1/security/users?firstName=${name}&email=${email}`).map((res: Response) => res.json().users);

    }

    getbyId(id): Observable<any> {
        return this.http.get(`http://localhost:8080/v1/security/users/${id}`).map((res: Response) => res.json().data);

    }

    deleteData(url:string){

        this.http.delete(url, this.headers)
            .subscribe();


    }




    /*deleteUser(url: string): Observable<any> {
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
