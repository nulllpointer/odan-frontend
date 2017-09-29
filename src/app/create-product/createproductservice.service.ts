import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Hero} from "../Hero";
import {NavigationExtras, UrlTree} from "@angular/router";
import {Http, RequestOptionsArgs} from "@angular/http";

@Injectable()
export class Createproductservice {
    private headers: any;



    constructor(private _http:Http) {

    }



    /*private headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Access-Control-Allow-Credentials': true
    });
*/



    hero: Hero;
    id: number;



    private body: any;
    private dummy: RequestOptionsArgs;



    getById(url:string) {
        return this._http.get(url)
            .map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();

            });
    }


    postData(url:string, object){


        this._http.post('http://localhost:8080/all/product', object, {headers: this.headers})
            .subscribe();




    }


    deleteData(url:string){


        this._http.delete(url, this.headers)
            .subscribe();


    }




}
