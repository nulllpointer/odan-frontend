import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Contact} from "./contact";
import {Http} from "@angular/http";
import {DialogComponent} from "./dialog/dialog.component";
import {RestfullService} from "../../shared/services/restfullService";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    providers: [DialogComponent],

})
export class ContactsComponent implements OnInit {

    id: number
    private datas: any;

    today: number = Date.now();
    private requestUrl = 'http://localhost:8080/v1/billing/sales';
    private deleteRequestUrl = 'http://localhost:8080/v1/billing/sales/delete';

    results: string[];
    private values: any[];
    contacts: Contact[];
    @Input() contact: Contact = new Contact();
    data: ''
    @Input() firstName: string = '';
    @Input() lastName: string = '';
    @Input() email: string = '';
    @Input() phone: string = '';


    @ViewChild(DialogComponent)
    private localDialog: DialogComponent;


    constructor(private restfullService: RestfullService, private http: Http, private dialogcomponent: DialogComponent) {
       // this.restfullService.getAll(this.requestUrl).subscribe(data => this.sales = data.sales);
    }

    ngOnInit(): void {
        this.localDialog.visible = false;

    }

    createOrUpdateContact(form: NgForm) {
        console.log(form.value)

        var contactjson = JSON.stringify(form);

        this.restfullService.create(this.requestUrl, contactjson).subscribe(
            suc => {
                console.log("hero", suc.json().message);
                alert(suc.json().message);
                location.reload();
            },
            err => {
                console.log(err);
            }
        );

    }

    getContactById(id) {

        this.restfullService.getbyId(this.requestUrl + "/" + id).subscribe(
            data => {

                this.contact = data.data;
                this.localDialog.visible = true;
                console.log("I CANT SEE DATA HERE also: ", data.data.firstName);

            }


    );
             }



    }

    /*deleteContact(id) {
        var x;
        this.restfullService.deleteById(this.deleteRequestUrl + "/" + id).subscribe(data => {
            console.log("hrreer")
            console.log(data);
            console.log("agin");



        });

    }
*/
/*
    viewContact(x) {
        this.contact = x;

        this.localDialog.visible = true;
    }
*/



