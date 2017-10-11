import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "./orderservice";
import {FormGroup} from "@angular/forms";
import {Order} from "./order";
import {ActivatedRoute} from "@angular/router";
import {Cart} from "./cart";
import {ProductService} from "../../product/productservice";
import {Createproductservice} from "../../create-product/createproductservice.service";
import {RestfullService} from "../../shared/services/restfullService";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

    private datas: any;
    private sub: any;
    current = "test";
    private log: string = '';
    total:number=0;
    grandtotal: number=0;
    @Input() discount:number=0;
    isProcessing: false;

    @Input() name: string = '';
    @Input() quantity: number = 0;
    @Input() cusname: string = '';
    @Input() price: number = 0;
    @Input() id: number = 0;


    selected = null;


    patientForm: FormGroup;

    // @Input() order: OrderComponent;
    private orders: Order;
    private orderid: number;
    private showForm: boolean = false;

    constructor(private route: ActivatedRoute, private orderService: OrderService, private productService: ProductService, private contactService: RestfullService) {
        // this.getProducts();


    }

    ngOnInit() {

    }

    cartList: Cart[] = [];
//OLD CODES
/*    getProducts() {


        this.productService.getAllProducts()
            .then(aa => this.herooo = aa);
        /!* let herooo = new Product();
         herooo;*!/

    }

    placeOrder() {

        console.log(this.cartList)
       //TODO this.storeservice.alertStore(this.cartList);
        this.orderService.createOrder(this.cartList);
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
        let cart = new Cart();
        cart.product.id = this.id;
        cart.product.name = this.name;
        cart.product.price = this.price;
        cart.quantity = this.quantity;
        cart.discount=this.discount;
        cart.total=this.total;
        this.cartList.push(cart);
    }

    deletecartItem(cart) {
        this.grandtotal=this.grandtotal-cart.total;
        this.cartList = this.cartList.filter(item => item !== cart);

    }

    getgrandTotal(cart) {
        this.cartList = this.cartList.map(item => item, cart)
        for (let cart of this.cartList)
        {
            var quantity = cart.quantity;
            var price = cart.product.price;
            // var subtotal = quantity*price*discount/100;
            var discount = cart.discount;
            this.total=(quantity*price)-(quantity*price*discount/100);
           // this.total=(subtotal)-(discount/100*subtotal);
            cart.total=this.total;
        }

        this.grandtotal=cart.total+this.grandtotal;
        console.log("grandtotal", this.grandtotal)


    }*/


}
