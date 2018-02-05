import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PurchaseDialogComponent} from "./purchase-dialog/purchase-dialog-component";
import {RestfullService} from "../../shared/services/restfullService";
import {Http} from "@angular/http";
import {Purchase} from 'app/layout/purchase/purchase';
import {Contact} from "../contacts/contact";
import {PurchaseItem} from "./purchase-item";
import {Product} from "../order/product";
import {FormControl} from "@angular/forms";
import {PurchaseDataTable} from "./purchase-data-table/purchase-data-table";
import {HeroComponent} from "./purchase-dialog/hero.component";
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-menu-page',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {



    myControl = new FormControl();

    country = [
        new HeroComponent('United States'),
        new HeroComponent('Canada'),
        new HeroComponent('Brazil'),
        new HeroComponent('India'),
        new HeroComponent('China'),
        new HeroComponent('Japan'),
    ];

    protected nationality = [
        new HeroComponent('American'),
        new HeroComponent('Canadian'),
        new HeroComponent('Indian'),
        new HeroComponent('Chinese'),
        new HeroComponent('African'),
        new HeroComponent('Japanese'),
    ];


    countryFilter: Observable<HeroComponent[]>;
    nationalityfilter: Observable<HeroComponent[]>;



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
        {value: 'PIECE', viewValue: 'PIECE'},
        {value: 'FULL', viewValue: 'FULL'},
        {value: 'HALF', viewValue: 'HALF'},
        {value: 'QUARTER', viewValue: 'QUARTER'},
        {value: 'FULL_1L', viewValue: 'FULL->1L'},


    ];
     filteredTimeUnitOptions = new Observable;
    filteredContactOptions= new Observable;


    timeUnitTypes = [
        {value: 'hours', viewValue: 'hours'},
        {value: 'days', viewValue: 'days'}
    ];


    @ViewChild(PurchaseDialogComponent)
    private dataTable: PurchaseDataTable;


    constructor(private restfullService: RestfullService, private http: Http) {
    }

    ngOnInit() {



        this.filteredContactOptions = this.contactControl.valueChanges
            .startWith('')
            .map(val => this.filterContact(val));

        this.filteredTimeUnitOptions = this.timeUnitControl.valueChanges
            .startWith('')
            .map(val => this.filterTimeUnit(val));

        console.log(this.filteredTimeUnitOptions)
        console.log(this.filteredContactOptions)

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
                this.contactsList = this.contacts.map(c => c.firstName);
            }
        );
    }


    createOrUpdatePurchase(purchase) {
        console.log(this.contacts.find(c => c.firstName === this.contactControl.value));
        var hero = this.contacts.find(c => c.firstName === this.contactControl.value);
        purchase.contactId = hero.id;
        purchase.timeUnit = this.contactControl.value;

        var productjson = JSON.stringify(purchase);


//        var productjson = JSON.stringify(this.purchase);

        this.restfullService.create(this.requestUrl, productjson).subscribe(
            suc => {
                console.log("hero", suc.json().message);
                alert(suc.json().message);
                //Calling the constructor would eventually call the purchase list
                this.dataTable = new PurchaseDataTable(this.restfullService);
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
        alert(this.contactControl.value)
        this.visible = false;
    }


    /*Auto complete*/


    contactControl = new FormControl();

    timeUnitControl = new FormControl();

    timeUnitOptions = [
        'days',
        'hours'
    ];
    contactsList: string[];





    /*Trying*/


    filterContact(val: string): string[] {
        return  this.contactsList=this.contactsList.filter(option =>
            option.toLowerCase().indexOf(val.toLowerCase()) === 0)

    }

    filterTimeUnit(val: string): string[] {
        return this.timeUnitOptions.filter(hero =>
            hero.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }


    inputChanged() {
        this.filterTimeUnit(this.timeUnitControl.value)
    }

    inputContactChanged() {
        this.filterContact(this.contactControl.value)

    }
    filter(name: string): HeroComponent[] {

        return this.country.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0),
            this.nationality.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    displayFn(users?: HeroComponent): string | undefined {
        return users ? users.name : undefined;
    }
}

export class User {

    id: number;
    name: string;


    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
