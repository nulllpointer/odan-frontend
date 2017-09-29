import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {Params, ActivatedRoute, ParamMap, Router, NavigationEnd, UrlTree, NavigationExtras} from "@angular/router";
import {TablesService} from "../app.data.service";
import {Hero} from "../Hero";
import {ProductService} from "../product/productservice";
import {ProductComponent} from "../product/product.component";
import {URLSearchParams, Http, Headers} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {Createproductservice} from "./createproductservice.service";

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss'],
    providers: [ProductService]

})
export class CreateProductComponent implements OnInit {



    // private navigateByUrl(url: string|UrlTree, extras: NavigationExtras): Promise<boolean>;

    hero: Hero;
    private datas: any;


    id: number;
    private sub: any;
    private body: any;

    previousUrl: string;


    constructor(private router: Router, private editservice: Createproductservice,
                private route: ActivatedRoute, private productservice: ProductService,) {


    }


    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });


        this.editservice.getById(`http://localhost:8080/all/hero/${this.id}`).subscribe(
            data => {
                this.datas = data;
                console.log("I CANT SEE DATA HERE also: ", this.datas);

                this.hero = this.datas;


            }
        );


    }


    post() {
        this.editservice.postData(`http://localhost:8080/all/hero/${this.id}`, this.hero);
        alert("Successfully Updated");


    }

    delete() {
        this.editservice.deleteData(`http://localhost:8080/all/product/delete/${this.id}`);
        alert("Deleted Successfuly")


    }
}








