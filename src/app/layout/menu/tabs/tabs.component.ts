import {Component, Input, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {MenuService} from "../menuservice";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})

export class TabsComponent implements OnInit {
    @Input() name: string;
    @Input() price: number;
    today: number = Date.now();




    private heroesUrl: "http://localhost:8080/all/product";
    results: string[];
    private values: any[];
    processValidation = false;
    heroIdToUpdate = null;
    requestProcessing = false;
    statusCode: number;



    constructor(private menuService: MenuService, private http: Http) {

    }


    ngOnInit(): void {
      //  this.heroList.push(this.getProducts());

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

        this.menuService.createProoduct(product);
        alert("Product Added Successfully");
        location.reload();

    }




   /* getProducts(): Hero {


        this.menuService.getAllProducts()
            .then(herooo => this.herooo = herooo);
        let herooo = new Hero();

        return herooo;


    }
*/


}
