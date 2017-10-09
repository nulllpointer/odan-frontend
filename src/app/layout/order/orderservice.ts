import {Headers, Http, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Hero} from "../../Hero";


@Injectable()
export class OrderService {
    options: RequestOptions;
    id:number;
    hero:Hero;
     headers = new Headers({
        'Content-Type': 'application/json'
    });




    constructor(private http: Http) {


    }


    createOrder(order): Promise<any> {
        this.options = new RequestOptions({headers: this.headers});
        let body = JSON.stringify(order);
        console.log(body);
        return this.http
            .post("http://localhost:8080/order", body, this.options)
            .toPromise()
            .catch(this.handleError);

    }


    getAllDBHeroByID(id): Promise <Hero> {

        alert(id);
        console.log(`${id}`);

      //  const url = 'http://localhost:8080/all/hero/${id}';


       return  this.http.get(`http://localhost:8080/all/hero/${id}`)
            .toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);




    }


    getAllProducts(): Promise <Hero[]> {
        return this.http.get("http://localhost:8080/all/product")
            .toPromise()
            .then(response => response.json() as Hero[])
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
