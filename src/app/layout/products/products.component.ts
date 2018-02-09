import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";
import {RestfullService} from "../../shared/services/restfullService";
import {NgForm} from "@angular/forms";
import {Product} from "./product";
import {ProductDialogComponent} from "./dialog/product-dialog-component";

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
    private requestUrl = 'http://localhost:8080/v1/billing/sales';
    private deleteRequestUrl = 'http://localhost:8080/v1/billing/sales/delete';

    results: string[];
    private values: any[];
    contacts: Product[];
    @Input() product: Product = new Product();
    data: ''
    @Input() firstName: string = '';
    @Input() lastName: string = '';
    @Input() email: string = '';
    @Input() phone: string = '';


    @ViewChild(ProductDialogComponent)
    private localDialog: ProductDialogComponent;


    constructor(private restfullService: RestfullService, private http: Http, private dialogcomponent: ProductDialogComponent) {
        // this.restfullService.getAll(this.requestUrl).subscribe(data => this.sales = data.sales);
    }

    ngOnInit(): void {
        this.localDialog.visible = false;

    }

    createOrUpdateProduct(form: NgForm) {
        this.localDialog.visible = true;
        console.log(form.value)

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
                this.localDialog.visible = true;
                console.log("I CANT SEE DATA HERE also: ", data.data.firstName);

            }
        );
        this.localDialog.visible = true;
    }


}

/*deleteContact(id) {
    var x;
    this.restfullService.deleteById(this.deleteRequestUrl + "/" + id).subscribe(data => {
        console.log("hrreer")
        console.log(data);
        console.log("agin");



    });

}
*/
/*
    viewContact(x) {
        this.contact = x;

        this.localDialog.visible = true;
    }
*/



