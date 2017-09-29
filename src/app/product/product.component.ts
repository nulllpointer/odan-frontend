import {Component, OnInit, Injectable, Input, Output, EventEmitter} from '@angular/core';


import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";

import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ProductService} from "./productservice";
import {Hero} from "../Hero";


@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
    // animations: [routerTransition()]
})


export class ProductComponent implements OnInit {


    @Input() name: string;
    @Input() price: number;
    today: number = Date.now();




    private heroesUrl: "http://localhost:8080/all/hero";
    results: string[];
    private values: any[];
    herooo: Hero[];
    heroList: Hero[] = [];
    processValidation = false;
    heroIdToUpdate = null;
    requestProcessing = false;
    statusCode: number;
    herojson: Hero;


    heroForm = new FormGroup({
        id: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),


    });

    constructor(private productService: ProductService, private http: Http) {

    }


    ngOnInit(): void {
        this.heroList.push(this.getProducts());

       /* this.http.get('/api/items').subscribe(data => {
            // Read the result field from the JSON response.
            this.results = data['results'];
*/

    }

    createProduct() {

        alert(this.name + "   " + this.price)

        var product = {
            name: this.name,
            price: this.price

        };

        this.productService.createProoduct(product);
        alert("Product Added Successfully");
        location.reload();

    }




    getProducts(): Hero {


        this.productService.getAllProducts()
            .then(herooo => this.herooo = herooo);
        let herooo = new Hero();

        return herooo;


    }

}









