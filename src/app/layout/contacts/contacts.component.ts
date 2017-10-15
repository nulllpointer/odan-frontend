import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Contact} from "./contact";
import {Http} from "@angular/http";
import {DialogComponent} from "./dialog/dialog.component";
import {RestfullService} from "../../shared/services/restfullService";

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
    private requestUrl = 'http://localhost:8080/v1/billing/contacts';
    private deleteRequestUrl = 'http://localhost:8080/v1/billing/contacts/delete';

    results: string[];
    private values: any[];
    contacts: Contact[];
    @Input() contact: Contact = new Contact();
    @Input() firstName: string = '';
    @Input() lastName: string = '';
    @Input() email: string = '';
    @Input() phone: string = '';


    @ViewChild(DialogComponent)
    private localDialog: DialogComponent;


    constructor(private restfullService: RestfullService, private http: Http, private dialogcomponent: DialogComponent) {
       // this.restfullService.getAll(this.requestUrl).subscribe(data => this.contacts = data.contacts);
    }

    ngOnInit(): void {
        this.localDialog.visible = false;

    }

    createOrUpdateContact(contact) {

        var contactjson = JSON.stringify(this.contact);

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
                this.contact = data;
                console.log("I CANT SEE DATA HERE also: ", this.contact);
            }
        );

        console.log(this.contact.firstName)
        this.firstName = this.contact.firstName
        this.lastName = this.contact.lastName
        this.phone = this.contact.phone
        this.email = this.contact.email

    }

    deleteContact(id) {
        var x;
        this.restfullService.deleteById(this.deleteRequestUrl + "/" + id).subscribe(data => {
            console.log("hrreer")
            console.log(data);
            console.log("agin");



        });

    }

    viewContact(hero) {
        this.contact = hero;

        this.localDialog.visible = true;
    }


}
