import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {Cart} from "../../cart";
import {RestfullService} from "../../../../shared/services/restfullService";
import {Form} from "@angular/forms";

@Component({
    selector: 'cart-dialog',
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
export class DialogComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Input() identifier: string;





    id: number;
    datas: any

    @Input() cart = new Cart();
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private cartservice: RestfullService) {
    }

    ngOnInit() {
        this.visible = false;

    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);

    }



}
