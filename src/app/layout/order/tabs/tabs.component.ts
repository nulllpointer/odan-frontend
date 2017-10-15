import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";
import {RestfullService} from "../../../shared/services/restfullService";
import {Category} from "../category";
import {ActivatedRoute, Router} from "@angular/router";
import {CartItem} from "../cart-item";
import {OrderComponent} from "../order.component";
import {ArticlesPubSubService} from "../service/articles-pub-sub.service";

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']

})

export class TabsComponent implements OnInit {


    private requestUrl = "http://localhost:8080/v1/billing/categories";

    private cartUrl = "http://localhost:8080/v1/billing/cart-items"

    categories: Category[];

    cartId:number;

    /*@ViewChild(OrderComponent)
    orderComponent:OrderComponent*/

    ngOnInit(): void {
    }


  /*  @ViewChild(OrderComponent)
    private orderComponent: OrderComponent;*/

    constructor(private aps: ArticlesPubSubService,private restfullService: RestfullService, private http: Http, private router: Router, private route: ActivatedRoute) {
        this.getCategoriesWithProducts();
        this.route.params.subscribe(params => {
            this.cartId = +params['id'];
        });



    }

    private getCategoriesWithProducts() {


        this.restfullService.getAll(this.requestUrl,).subscribe(data => {
            this.categories = data.categories

        });
    }

    addToCart(cartId, productId) {

        let cItem=new CartItem();
        cItem.cartId=cartId;
        cItem.productId=productId;


        var cartItem = JSON.stringify(cItem);
        console.log(cartItem)

        this.restfullService.create(this.cartUrl,cartItem).subscribe(
            suc => {
                console.log("hero", suc.json().message);
                this.aps.next(true);




            },
            err => {
                console.log(err);
            }
        );

    }
}
