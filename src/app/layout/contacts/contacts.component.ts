import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Contact} from "./contact";
import {ContactService} from "./contactservice";
import {Http, Response, RequestMethod} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions} from '@angular/http';
import {DialogComponent} from "./dialog/dialog.component";
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

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
    private heroesUrl = "http://localhost:8080/v1/billing/contacts";
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


    constructor(private contactService: ContactService, private http: Http, private dialogcomponent: DialogComponent) {
        this.contactService.getAllContacts().subscribe(data => this.contacts = data);


    }


    ngOnInit(): void {

    }

    createContact() {

        var contactjson = JSON.stringify(this.contact);

        this.contactService.createContact(this.heroesUrl, contactjson).subscribe(
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


    createOrUpdateContact(contact) {
        alert(contact.id)


        if (contact.id == 0 || contact.id == "undefined" || contact.id == null) {
            this.createContact();
        }
        else {
            this.updateContact();
        }

    }

    updateContact() {
        var contactjson = JSON.stringify(this.contact);
        this.contactService.update(contactjson).subscribe(
            suc => {
                console.log("hero", suc.json().message);
                location.reload();
            },
            err => {
                console.log(err);
            }
        );
        alert("updated successfully")
        location.reload();

    }

    getContactById(id) {

        this.contactService.getbyId(id).subscribe(
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


       let contact=new Contact();
       id=63;

        var body=JSON.stringify(id)
        alert(body)
        return this.contactService.deleteContact(this.heroesUrl,body).subscribe();
//        location.reload()

    }


    test(hero) {
        this.contact = hero;

        this.localDialog.visible = true;
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }




}
