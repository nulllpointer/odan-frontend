import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";
import {RestfullService} from "../../shared/services/restfullService";
import {NgForm} from "@angular/forms";
import {ProductDialogComponent} from "./dialog/product-dialog-component";
import {Product} from "../order/product";
import {Category} from "../order/category";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    providers: [ProductDialogComponent],

})
export class ProductsComponent implements OnInit {

    id: number
    private datas: any;

    today: number = Date.now();
    private requestUrl = 'http://localhost:8080/v1/billing/products';
    private deleteRequestUrl = 'http://localhost:8080/v1/billing/sales/delete';

    results: string[];
    private values: any[];
    products: Product[];
    categories: Category[];
    category: Category= new Category();


    productTypes = [
        {value: 'PURCHASE', viewValue: 'PURCHASE'},
        {value: 'SALE', viewValue: 'SALE'},
        {value: 'BOTH', viewValue: 'BOTH'},
    ];


    @Input() product: Product = new Product();
    data: ''
    @Input() firstName: string = '';
    @Input() lastName: string = '';
    @Input() email: string = '';
    @Input() phone: string = '';
    visible = false;
    @Input() dVisible = false;
    temp:number;

    @ViewChild(ProductDialogComponent)
     localDialog: ProductDialogComponent;




    constructor(private restfullService: RestfullService, private http: Http, private dialogcomponent: ProductDialogComponent) {
        this.getAllCategories();
    }

    ngOnInit(): void {
        this.category.id=0;
        // this.localDialog.visible = false;

    }

    private getAllCategories() {
        this.restfullService.getAll('http://localhost:8080/v1/billing/categories').subscribe(
            data => {

                this.categories = data.categories;
            }
        );
    }


    createOrUpdateProduct(form: NgForm) {

        var productjson = JSON.stringify(form);

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

    getProductById(id) {

        this.restfullService.getbyId(this.requestUrl + "/" + id).subscribe(
            data => {

                this.product = data.data;
                 this.category=data.data.category;


            }
        );
        // this.localDialog.visible = true;
    }
    showThePanel(){
        this.visible=true;
    }

    closeTheForm() {
        //  alert(this.contactControl.value)
        this.visible = !this.visible;
        this.product= new Product();
        this.category=new Category();
    }

    callCategory(value) {
        this.product.categoryId = value;

        console.log(this.product)
    }

    callProductType(value) {
        this.product.productType = value;

        console.log(this.product)
    }

    updateInventory(value) {
        this.product.productType = value;

        console.log(this.product)
    }

    showTheDialog(){
        this.temp=this.product.quantity;
        this.localDialog.dVisible=true;
    }
    addToStock(product){
        product.stock="increase";  // To increase the stock
        alert(product.id +  "  "+ product.stock)
        var productjson = JSON.stringify(this.product);

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
    getProductByIdAndShow(id) {

        this.restfullService.getbyId(this.requestUrl + "/" + id).subscribe(
            data => {

                this.product = data.data;
                this.category=data.data.category;
                this.showTheDialog();
                this.product.quantity=0;


            }
        );
        // this.localDialog.visible = true;
    }


}

