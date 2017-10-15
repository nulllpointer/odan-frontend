import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {DialogComponent} from "../../../layout/dashboard/components/cart-dialog/dialog.component";
import {Cart} from "../../../layout/dashboard/cart";

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Output() event: EventEmitter<any> = new EventEmitter();

    @ViewChild(DialogComponent)
    private localDialog: DialogComponent;

    @Input() cart: Cart = new Cart();


    constructor() {
    }

    ngOnInit() {
        this.localDialog.visible = false;
    }


}
