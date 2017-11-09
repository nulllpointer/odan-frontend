import {Headers, Http, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";


@Injectable()
export class TablesService {
    options: RequestOptions;
    headers = new Headers({
        'Content-Type': 'application/json'
    });


    private baseUrl = 'http://localhost:8080';
    private baseUrl1 = 'http://localhost:8080/all/purchase/new';
    private baseUrl2 = 'http://localhost:8080/all/purchase';


    constructor(private http: Http, private location: Location) {
        let test = {"search": "person"}


    }


    createService(heros): Promise<any> {
        this.options = new RequestOptions({headers: this.headers});
        let body = JSON.stringify(heros);
        console.log(body);
        return this.http
            .post(this.baseUrl1, body, this.options)
            .toPromise()
            .catch(this.handleError);

    }


   /* getAllDBHeroByID(id: number): Promise <Hero> {

        const url = `${this.baseUrl2}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);


    }


    getAllDBHeroes(): Promise <Hero[]> {
        return this.http.get(this.baseUrl + '/all/purchase')
            .toPromise()
            .then(response => response.json() as Hero[])
            .catch(this.handleError);

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
