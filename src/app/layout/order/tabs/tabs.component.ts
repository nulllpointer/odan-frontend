import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Hero} from "../../../Hero";
import {Http} from "@angular/http";
import {MenuService} from "../../menu/menuservice";
import {CollapseComponent} from "../collapse/collapse.component";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']

})

export class TabsComponent implements OnInit {
    @Input() name: string;
    @Input() price: number;
    today: number = Date.now();

    private localCollapse= false;





    private heroesUrl: "http://localhost:8080/all/product";
    results: string[];
    private values: any[];
    herooo: Hero[];
    heroList: Hero[] = [];
    processValidation = false;
    heroIdToUpdate = null;
    requestProcessing = false;
    statusCode: number;
    herojson: Hero;



    constructor(private menuService: MenuService, private http: Http) {

    }


    ngOnInit(): void {



    }

    createProduct() {

        alert(this.name + "   " + this.price)

        var product = {
            name: this.name,
            price: this.price

        };

        this.menuService.createProoduct(product);
        alert("Product Added Successfully");
        location.reload();

    }




    getProducts(): Hero {


        this.menuService.getAllProducts()
            .then(herooo => this.herooo = herooo);
        let herooo = new Hero();

        return herooo;


    }



}
