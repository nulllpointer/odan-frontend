import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {NavigationExtras, UrlTree} from "@angular/router";
import {Http, RequestOptionsArgs} from "@angular/http";

@Injectable()
export class Createproductservice {
    constructor(private _http:Http) {

    }



    private headers: any;



    /*private headers = new Headers({
        'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
     'Access-Control-Allow-Credentials': true
     'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
     });
*/



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
