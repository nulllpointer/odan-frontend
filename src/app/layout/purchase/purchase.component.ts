import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PurchaseDialogComponent} from "./purchase-dialog/purchase-dialog-component";
import {RestfullService} from "../../shared/services/restfullService";
import {Http} from "@angular/http";
import {Purchase} from 'app/layout/purchase/purchase';
import {Contact} from "../contacts/contact";
import {PurchaseItem} from "./purchase-item";
import {Product} from "../order/product";
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs';

@Component({
    selector: 'app-menu-page',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
    selectedGame: Object = {};
    id: number
    private datas: any;
    order: any;
    visible = false;

    today: number = Date.now();
    private requestUrl = 'http://localhost:8080/v1/billing/purchases';
    private contactRequestUrl = 'http://localhost:8080/v1/billing/contacts';

    @Input() purchase: Purchase = new Purchase();
    @Input() purchaseItem: PurchaseItem = new PurchaseItem();

    contacts: Contact[]
    products: Product[]
    @Input() firstName: string = '';
    @Input() lastName: string = '';
    @Input() email: string = '';
    @Input() phone: string = '';

    uomTypes = [
        {value: 'KG', viewValue: 'KG'},
        {value: 'L', viewValue: 'L'},
        {value: 'ML', viewValue: 'ML'},
        {value: 'GM', viewValue: 'GM'},
        {value: 'MUTHA', viewValue: 'MUTHA'},
        {value: 'FULL', viewValue: 'FULL'},
        {value: 'HALF', viewValue: 'HALF'},
        {value: 'QUARTER', viewValue: 'QUARTER'},
        {value: 'FULL_1L', viewValue: 'FULL->1L'},


    ];


    timeUnitTypes = [
        {value: 'hr', viewValue: 'hour'},
        {value: 'days', viewValue: 'days'}
    ];


    /* @ViewChild(PurchaseDialogComponent)
     private localDialog: PurchaseDialogComponent;*/


    constructor(private restfullService: RestfullService, private http: Http) {
    }

    ngOnInit() {


        this.filteredOptions = this.myControl.valueChanges
            .startWith('')
            .map(val => this.filter(val));

        this.visible = false;

        this.getAllContacts();
        this.getAllProductsOnPurchaseSide();


    }


    callCategory(value) {
        this.purchase = value;
    }


    getAllContacts() {


        this.restfullService.getAll(this.contactRequestUrl).subscribe(
            data => {

                this.contacts = data.contacts;
            }
        );
    }


    createOrUpdatePurchase(purchase) {
        alert("done");

        var productjson = JSON.stringify(purchase);


//        var productjson = JSON.stringify(this.purchase);

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

    getPurchaseById(id) {

        this.restfullService.getbyId(this.requestUrl + "/" + id).subscribe(
            data => {
                this.purchase = data;
                console.log("I CANT SEE DATA HERE also: ", this.purchase);
            }
        );

        console.log(this.purchase.id)


    }

    viewProduct(hero) {
        this.purchase = hero;

        this.visible = true;
    }

    /*valueChange(games){
        this.someName=this.game.type;
    }*/
    callContact(value) {
        this.purchase.contactId = value;

        console.log(this.purchase)
    }

    updatePurchaseItem(id: Number, quantity: Number, price: Number) {

    }

    deletePurchaseItem(item: PurchaseItem) {

    }

    callProduct(value) {
        this.purchase.productId = value;

        console.log(this.purchase)
    }

    callTimeUnit(value) {
        this.purchase.timeUnit = value;

        console.log(this.purchase)
    }

    callUom(value) {
        this.purchase.uom = value;

        console.log(this.purchase)
    }

    private getAllProductsOnPurchaseSide() {
        this.restfullService.getPurchaseSideProducts().subscribe(
            data => {

                this.products = data.products;
            }
        );
    }

    closeTheForm() {
        alert(this.myControl.value)
        this.visible = false;
    }


    /*Auto complete*/


    myControl = new FormControl();

    options = [
        'One',
        'Two',
        'Three'
    ];

    filteredOptions: Observable<string[]>;



    filter(val: string): string[] {
        return this.options.filter(option =>
            option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
}
