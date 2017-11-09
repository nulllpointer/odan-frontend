import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {RestfullService} from "../../../shared/services/restfullService";
import {Product} from "../../order/product";

@Component({
    selector: 'app-dialog-menu',
    templateUrl: 'purchase-dialog-component.html',
    styleUrls: ['purchase-dialog-component.scss'],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({ transform: 'scale3d(.3, .3, .3)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})
export class PurchaseDialogComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    id: number;
    datas: any

    @Input() product = new Product();
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private contactservice: RestfullService) {
    }

    ngOnInit() {
        this.visible=false;
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);

    }


    helloHero(){
        alert("home calling home");
    }


}
