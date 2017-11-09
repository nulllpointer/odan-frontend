import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Order} from "./order";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../product/productservice";
import {RestfullService} from "../../shared/services/restfullService";
import {CartItem} from "./cart-item";
import {ArticlesPubSubService} from "./service/articles-pub-sub.service";
import {CartService} from "../../shared/services/cart-service";
import {CartItemDialogComponent} from "./cart-item-dialog/dialog.component";
import {Contact} from "../contacts/contact";
import {forEach} from "@angular/router/src/utils/collection";
import {CartOrder} from "./cart-order";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
    index = 0;
    private datas: any;
    cartId: number;
    cartItems: CartItem[];
    current = "test";
    private log: string = '';
    total: number = 0;
    grandtotal: number = 0;
    @Input() discount: number = 0;
    isProcessing: false;
    private requestUrl = 'http://localhost:8080/v1/billing/cart-items';
    private cartUrl = 'http://localhost:8080/v1/billing/carts';
    private contactUrl = 'http://localhost:8080/v1/billing/contacts';
    private salesUrl = 'http://localhost:8080/v1/billing/sales';


    @Input() name: string = '';
    @Input() quantity: number = 0;
    @Input() cusname: string = '';
    @Input() price: number = 0;
    @Input() id: number = 0;

    // @Input() contact: Contact = new Contact();

    @Input() cartOrder: CartOrder = new CartOrder();
    contacts: Contact[];


    selected = null;


    patientForm: FormGroup;

    // serial=0;


    // @Input() order: OrderComponent;
    private orders: Order;
    private orderid: number;
    private showForm: boolean = false;


    @ViewChild(CartItemDialogComponent)
    localDialog: CartItemDialogComponent
    contactId: number;


    constructor(private aps: ArticlesPubSubService, private router: Router, private route: ActivatedRoute, private orderService: CartService, private productService: ProductService,
                private restfullService: RestfullService) {
        this.route.params.subscribe(params => {
            this.cartId = +params['id'];
            this.getAllContacts();

        });


    }

    getAllCartItems() {
        this.restfullService.getbyId(this.cartUrl + '/' + this.cartId).subscribe(data => {
            this.cartItems = data.data.items;
            this.cartOrder.txnDate=data.data.txnDate;

            this.cartOrder.calculate(this.cartItems);
        });

    }

    getCartById(){
        this.restfullService.getbyId(this.cartUrl + '/' + this.cartId).subscribe(data => {
            this.cartItems = data.data.items;


            this.cartOrder.calculate(this.cartItems);
        });
    }


    ngOnInit() {
        this.localDialog.visible = false;

        this.aps.subscribe(value => {
            if (value) {

                this.getAllCartItems();
            }

        });
        this.getAllCartItems();

    }

    cartItemList: CartItem[] = [];



        updateCartItem(id, quantity, price) {

        let hero = new CartItem();
        hero.id = id;
        hero.quantity = quantity;
        hero.price = price;


        this.restfullService.create("http://localhost:8080/v1/billing/cart-items", JSON.stringify(hero))
            .subscribe(
                suc => {
                    console.log("hero", suc.json().message);
                    this.getAllCartItems();
                    alert(suc.json().message);
                },
                err => {
                    console.log(err);
                }
            );
    }

    deleteCart(item: CartItem) {

    }

    checkout(cartId: Number) {
        this.localDialog.visible = true;

    }

    confirmCheckout(order) {

        let hero = new CartOrder();
        hero = order;
        //setting the cart id
        hero.cartId = this.cartId;
        hero.contactId=this.contactId;
       // hero.cashReceived=



        this.restfullService.create(this.salesUrl, JSON.stringify(hero))
            .subscribe(
                suc => {
                    console.log("hero", suc.json().message);
                    alert(suc.json().message);
                },
                err => {
                    console.log(err);
                }
            );

        alert("confirming ");
        this.localDialog.visible = false;
    }

    callContact(value) {
        this.contactId = value;

    }

    /*callTransactionStatus(value) {
        this.contactId = value;

    }*/

    getAllContacts() {
        this.restfullService.getAll(this.contactUrl).subscribe(data => {
            this.contacts = data.contacts;
        });

    }

    calculateTheChange($event: Event) {
        this.cartOrder.calculate(this.cartItems);
    }
}
