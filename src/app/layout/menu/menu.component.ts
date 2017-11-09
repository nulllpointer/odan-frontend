import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MenuDialogComponent} from "./menu-dialog/menu-dialog-component";
import {Product} from "../order/product";
import {RestfullService} from "../../shared/services/restfullService";
import {Http} from "@angular/http";
import {NgForm} from "@angular/forms";
import {Category} from "../order/category";

@Component({
    selector: 'app-menu-page',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    selectedGame: Object = {};
    id: number
    private datas: any;
    order: any

    today: number = Date.now();
    private requestUrl = 'http://localhost:8080/v1/billing/products';
    categoryrequestUrl = 'http://localhost:8080/v1/billing/categories';

    @Input() product: Product = new Product();
    @Input() category: Category = new Category();

    categories: Category[]
    @Input() firstName: string = '';
    @Input() lastName: string = '';
    @Input() email: string = '';
    @Input() phone: string = '';
    types = [
        {value: 'Snacks', viewValue: 'Snacks'},
        {value: 'Drinks', viewValue: 'Drinks'},
        {value: 'KHANA_KHAJA', viewValue: 'KHANA_KHAJA'},
        {value: 'ICE_CREAM', viewValue: 'ICE_CREAM'},


    ];


    @ViewChild(MenuDialogComponent)
    private localDialog: MenuDialogComponent;


    constructor(private restfullService: RestfullService, private http: Http) {
    }

    ngOnInit() {
        this.localDialog.visible = false;
        this.getAllCategories()


    }

    principalType = 'SNACKS';
    principalCategoryTypes = [
        {code: 0, name: 'SNACKS'},
        {code: 1, name: 'DRINKS'},
        {code: 2, name: 'KHANA_KHAJA'},
        {code: 3, name: 'ICE_CREAM'}
    ];


    productType = 'SALES';
    productTypes = [
        {code: 0, name: 'PURCHASE'},
        {code: 1, name: 'SALES'},
        {
            code: 2, name: 'BOTH'
        }];


    callCategory(value) {
        this.product.categoryId = value;
    }







    getAllCategories() {


        this.restfullService.getAll(this.categoryrequestUrl).subscribe(
            data => {

                this.categories = data.categorys;
                console.log("I CANT SEE DATA HERE also: ", data.categorys.id);
                this.localDialog.visible = true;
            }
        );
    }


    createOrUpdateProduct(product) {

        var productjson = JSON.stringify(product);


//        var productjson = JSON.stringify(this.product);

        this.restfullService.create(this.requestUrl, productjson).subscribe(
            suc => {
                console.log("hero", suc.json().message);
                alert(suc.json().message);
                location.reload();
            },
            err => {
                console.log(err);
            }
        );

    }

    createOrUpdateCategory(category) {

        var categoryjson = JSON.stringify(category);


//        var productjson = JSON.stringify(this.product);

        this.restfullService.create(this.categoryrequestUrl, categoryjson).subscribe(
            suc => {
                console.log("hero", suc.json().message);
                alert(suc.json().message);
                location.reload();
            },
            err => {
                console.log(err);
            }
        );

    }






    getProductById(id) {

        this.restfullService.getbyId(this.requestUrl + "/" + id).subscribe(
            data => {
                this.product = data;
                console.log("I CANT SEE DATA HERE also: ", this.product);
            }
        );

        console.log(this.product.id)
        this.firstName = this.product.title
        this.lastName = this.product.description

    }

    viewProduct(hero) {
        this.product = hero;

        this.localDialog.visible = true;
    }

    /*valueChange(games){
        this.someName=this.game.type;
    }*/
    callPrincipalCategoryType(value) {
        this.product.principalCategoryType = value;

        console.log(this.product)
    }

    callProductType(value) {
        this.product.productType = value;

}
}
