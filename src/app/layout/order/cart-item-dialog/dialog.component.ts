import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {Form} from "@angular/forms";
import {Cart} from "../../dashboard/cart";

@Component({
    selector: 'cart-item-dialog',
    templateUrl: 'dialog.component.html',
    styleUrls: ['dialog.component.scss'],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({transform: 'scale3d(.3, .3, .3)'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({transform: 'scale3d(.0, .0, .0)'}))
            ])
        ])
    ]
})
export class CartItemDialogComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Input() identifier: string;





    id: number;
    datas: any

  //  @Input() cart = new Cart();
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
        this.visible = false;

    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);

    }



}
