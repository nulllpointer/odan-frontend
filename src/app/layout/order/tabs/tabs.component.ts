import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {RestfullService} from "../../../shared/services/restfullService";
import {Category} from "../category";
import {ActivatedRoute, Router} from "@angular/router";
import {CartItem} from "../cart-item";
import {ArticlesPubSubService} from "../service/articles-pub-sub.service";
import {CartService} from "../../../shared/services/cart-service";

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']

})

export class TabsComponent implements OnInit {


    private requestUrl = "http://localhost:8080/v1/billing/categories";

    private cartUrl = "http://localhost:8080/v1/billing/cart-items"

    categories: Category[];

    cartId: number;


    /*@ViewChild(OrderComponent)
    orderComponent:OrderComponent*/

    ngOnInit(): void {
    }


    /*  @ViewChild(OrderComponent)
      private orderComponent: OrderComponent;*/

    constructor(private aps: ArticlesPubSubService, private cartService: CartService, private restfullService: RestfullService, private http: Http, private router: Router, private route: ActivatedRoute) {
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

        this.restfullService.getbyId("http://localhost:8080/v1/billing/carts/" + this.cartId).subscribe(
            cart => {

                this.cartService.getProductPrice(productId, cart.data.txnDate).subscribe(
                    productPrice => {

                        let cItem = new CartItem();
                        cItem.cartId = cartId;
                        cItem.productPriceId = productPrice.id;
                        cItem.txnDate = cart.data.txnDate;


                        var cartItem = JSON.stringify(cItem);
                        console.log(cartItem)

                        this.restfullService.create(this.cartUrl, cartItem).subscribe(
                            suc => {
                                console.log("hero", suc.json().message);
                                this.aps.next(true);


                            },
                            err => {
                                console.log(err);
                            }
                        );
                    }
                );
                console.log("I CANT SEE DATA HERE also: ");
            }
        );
    }
}
