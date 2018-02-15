import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {RestfullService} from "../../../shared/services/restfullService";
import {Product} from "../product";

@Component({
    selector: 'app-dialog-product',
    templateUrl: 'product-dialog-component.html',
    styleUrls: ['product-dialog-component.scss'],
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
export class ProductDialogComponent implements OnInit {
    @Input() closable = true;
    @Input() dVisible: boolean;
    id: number;
    datas: any

    @Input() contact = new Product();
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private contactservice: RestfullService) {
    }

    ngOnInit() {
        this.dVisible = false;
    }

    close() {
        this.dVisible = false;
        this.visibleChange.emit(this.dVisible);

    }


    helloHero() {
        alert("home calling home");
    }


}
