import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "./contact";
import {ContactService} from "./contactservice";
import {Http} from "@angular/http";

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    @Input() name: string;
    @Input() price: number;
    today: number = Date.now();


    private heroesUrl: "http://localhost:8080/all/contact";
    results: string[];
    private values: any[];
    herooo: Contact[];
    heroList: Contact[] = [];
    processValidation = false;
    heroIdToUpdate = null;
    requestProcessing = false;
    statusCode: number;
    herojson: Contact;


    constructor(private contactService: ContactService, private http: Http) {

    }

    ContactsComponent(){}


    ngOnInit(): void {
        this.getContacts();

        /* this.http.get('/api/items').subscribe(data => {
             // Read the result field from the JSON response.
             this.results = data['results'];
 */

    }

    createContact() {

        alert(this.name + "   " + this.price)

        var contact = {
            name: this.name,
            price: this.price

        };

        this.contactService.createProoduct(contact);
        alert("Contact Added Successfully");
        location.reload();

    }


    getContacts() {


        this.contactService.getAllContacts()
            .then(data => this.herooo = data);
        console.log(this.herooo)
    }

}
