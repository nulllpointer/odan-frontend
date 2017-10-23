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
    private requestUrl1 = 'http://localhost:8080/v1/billing/carts';


    @Input() name: string = '';
    @Input() quantity: number = 0;
    @Input() cusname: string = '';
    @Input() price: number = 0;
    @Input() id: number = 0;

    @Input() contact: Contact = new Contact();


    selected = null;


    patientForm: FormGroup;

    // serial=0;


    // @Input() order: OrderComponent;
    private orders: Order;
    private orderid: number;
    private showForm: boolean = false;


    @ViewChild(CartItemDialogComponent)
    localDialog:CartItemDialogComponent


    constructor(private aps: ArticlesPubSubService, private router: Router, private route: ActivatedRoute, private orderService: CartService, private productService: ProductService,
                private restfullService: RestfullService) {
        this.route.params.subscribe(params => {
            this.cartId = +params['id'];
            // alert(this.cartId)
        });


    }

    getAllCartItems() {
        this.restfullService.getbyId(this.requestUrl1 + '/' + this.cartId).subscribe(data => {
            this.cartItems = data.data.items;



            console.log("hero")
        });

    }


    ngOnInit() {
       this.localDialog.visible=false;

        this.aps.subscribe(value => {
            if (value) {

                this.getAllCartItems();
            }

        });
        this.getAllCartItems();

    }

    cartItemList: CartItem[] = [];
//OLD CODES
    /*    getProducts() {


            this.productService.getAllProducts()
                .then(aa => this.herooo = aa);
            /!* let herooo = new Product();
             herooo;*!/

        }

        placeOrder() {

            console.log(this.cartItemList)
           //TODO this.storeservice.alertStore(this.cartItemList);
            this.orderService.createOrder(this.cartItemList);
            alert("order Added Successfully");
            location.reload();

        }

        fillValue(value) {
            let product = this.herooo.find((item: any) => item.name == value);

            this.name = product.name;
            // this.quantity=order;
            this.price = product.price;

            //this.log += `Value ${product} was selected\n`


        }

        onclick() {
            let cartItem = new CartItem();
            cartItem.product.id = this.id;
            cartItem.product.name = this.name;
            cartItem.product.price = this.price;
            cartItem.quantity = this.quantity;
            cartItem.discount=this.discount;
            cartItem.total=this.total;
            this.cartItemList.push(cartItem);
        }

        deletecartItemItem(cartItem) {
            this.grandtotal=this.grandtotal-cartItem.total;
            this.cartItemList = this.cartItemList.filter(item => item !== cartItem);

        }

        getgrandTotal(cartItem) {
            this.cartItemList = this.cartItemList.map(item => item, cartItem)
            for (let cartItem of this.cartItemList)
            {
                var quantity = cartItem.quantity;
                var price = cartItem.product.price;
                // var subtotal = quantity*price*discount/100;
                var discount = cartItem.discount;
                this.total=(quantity*price)-(quantity*price*discount/100);
               // this.total=(subtotal)-(discount/100*subtotal);
                cartItem.total=this.total;
            }

            this.grandtotal=cartItem.total+this.grandtotal;
            console.log("grandtotal", this.grandtotal)


        }*/


    updateCartItem(id, quantity,price) {

        let hero = new CartItem();
        hero.id = id;
        hero.quantity = quantity;
        hero.price=price;


        this.restfullService.create("http://localhost:8080/v1/billing/cart-items", JSON.stringify(hero))
            .subscribe(
                suc => {
                    console.log("hero", suc.json().message);
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
        alert(cartId);
        this.localDialog.visible=true;

    }

    confirmCheckout() {
        alert("confirming ");
        this.localDialog.visible=true;
    }
}
