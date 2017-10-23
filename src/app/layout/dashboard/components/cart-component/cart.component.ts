import {
    Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import {DialogComponent} from "../cart-dialog/dialog.component";
import {Cart} from "../../cart";
import {RestfullService} from "../../../../shared/services/restfullService";
import {StatComponent} from "../../../../shared/modules/stat/stat.component";
import {MatDatepicker} from "@angular/material";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    // What to clone
    @ViewChild('clone') template;
    @Input() cart: Cart = new Cart();
    date: Date

    carts: Cart[];
    private requestUrl = "http://localhost:8080/v1/billing/carts";


    @ViewChild(DialogComponent)
    private localDialog: DialogComponent;


    /* @ViewChild(StatComponent)
     private statComponent: StatComponent;*/

    // Where to insert the cloned content
    @ViewChild('container', {read: ViewContainerRef}) container;




    @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;






    constructor(private datePipe: DatePipe,private resolver: ComponentFactoryResolver, private restfullService: RestfullService) {

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
       // this.datepicker.



        let cc= new Cart();
       cc.identifier=cart.identifier;
       cc.txnDate= new Date(this.datePipe.transform(cart.txnDate, 'yyyy-MM-dd')); //whatever format you need.


        var contactjson = JSON.stringify(cc);

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
