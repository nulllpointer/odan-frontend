import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {RestfullService} from "../../shared/services/restfullService";
import {Cart} from "./cart";
import {DialogComponent} from "./components/cart-dialog/dialog.component";


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    //styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    date: Date;
    a2eOptions: any;

    dateChange(date) {
        this.date = date;
    }

    dateClick() {
        console.log('click click!')
    }

    getTime() {
        alert('Selected time is:' + this.date);
    };

    addTime(val, selector) {
       // this.date = moment(this.date.add(val, selector));
    };

    clearTime() {
        this.date = null;
    };

    startDate = new Date(1990, 0, 1);













    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    carts: Cart[];
    @Input() cart: Cart = new Cart();

    date2 = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");

    @ViewChild(DialogComponent)
    private localDialog: DialogComponent;

    private requestUrl = "http://localhost:8080/v1/billing/carts";

    constructor(private restfullService: RestfullService) {
        this.date = new Date();
        this.a2eOptions = {format: 'YYYY/MM/DD HH:mm'};




        this.restfullService.getAll(this.requestUrl).subscribe(data => this.carts = data.carts);

        this.sliders.push({
            imagePath: 'assets/images/slider1.jpg',
            label: 'First slide label',
            text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
        }, {
            imagePath: 'assets/images/slider2.jpg',
            label: 'Second slide label',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }, {
            imagePath: 'assets/images/slider3.jpg',
            label: 'Third slide label',
            text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        });

        this.alerts.push({
            id: 1,
            type: 'success',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
        }, {
            id: 2,
            type: 'warning',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
        });
    }

    ngOnInit() {
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    viewContact(hero) {
        this.cart = hero;

        this.localDialog.visible = true;
    }


}
