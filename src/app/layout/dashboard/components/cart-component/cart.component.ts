import {Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef} from "@angular/core";
import {DialogComponent} from "../cart-dialog/dialog.component";
import {Cart} from "../../cart";
import {RestfullService} from "../../../../shared/services/restfullService";
import {StatComponent} from "../../../../shared/modules/stat/stat.component";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
})
export class CartComponent {
    // What to clone
    @ViewChild('clone') template;
    @Input() cart: Cart = new Cart();

    carts: Cart[];
    private requestUrl = "http://localhost:8080/v1/billing/carts";


    @ViewChild(DialogComponent)
    private localDialog: DialogComponent;


    /* @ViewChild(StatComponent)
     private statComponent: StatComponent;*/

    // Where to insert the cloned content
    @ViewChild('container', {read: ViewContainerRef}) container;

    constructor(private resolver: ComponentFactoryResolver, private restfullService: RestfullService) {

        this.getAllCart()

    }

    getAllCart() {
        this.restfullService.getAll(this.requestUrl).subscribe(data => this.carts = data.carts);

    }


    cloneTemplate() {

        this.localDialog.visible = true;
        this.cart = new Cart();

        this.container.createEmbeddedView(this.template);
    }

    showTheDialog(value){
      this.localDialog.visible=value;
    }

    ngOnInit(): void {
       this.showTheDialog(false);

    }

    updateCart(hero) {
        this.showTheDialog(true);
        this.cart = hero;


    }

    createOrUpdateCart(cart) {

        var contactjson = JSON.stringify(this.cart);

        this.restfullService.create(this.requestUrl, contactjson).subscribe(
            suc => {
                console.log("hero", suc.json().message);
                alert(suc.json().message);
                this.getAllCart();
                this.showTheDialog(false);


            },
            err => {
                console.log(err);
            }
        );


    }


}
