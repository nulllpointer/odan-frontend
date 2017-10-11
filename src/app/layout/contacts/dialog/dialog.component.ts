import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {Contact} from "../contact";
import {RestfullService} from "../../../shared/services/restfullService";

@Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.component.html',
    styleUrls: ['dialog.component.scss'],
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
export class DialogComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    id: number;
    datas: any

    @Input() contact = new Contact();
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
