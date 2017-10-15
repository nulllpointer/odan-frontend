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


}
