import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "./contact";
import {ContactService} from "./contactservice";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions} from '@angular/http';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    @Input() firstName: string;
    @Input() email: string;
    @Input() contact: Contact = new Contact();

    showDialog = false;


    today: number = Date.now();
    private heroesUrl: "http://localhost:8080/all/contact";
    results: string[];
    private values: any[];
    contacts: Contact[];


    constructor(private contactService: ContactService, private http: Http) {
        this.contactService.getAllContacts().subscribe(data => this.contacts = data);


    }


    ngOnInit(): void {
        /* this.getContacts().then(data=>this.herooo=data)
         console.log("my data ",this.herooo)*/


        /* this.http.get('/api/items').subscribe(data => {
             // Read the result field from the JSON response.
             this.results = data['results'];
 */


    }

    createContact() {


        var contact = {
            firstName: this.contact.firstName,
            email: this.contact.email

        };

        alert(contact);


        var contactjson = JSON.stringify(contact);


        this.contactService.createContact(contactjson).subscribe(
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


    updateContact() {


        var contact = {
            id: 1,
            firstName: "amit",
            email: "achaulagain123@gmail.com"

        };
        var contactjson = JSON.stringify(contact);


        this.contactService.update(contactjson).subscribe(
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

    getContact(id) {
        this.contactService.getContactById(id).subscribe(data => {
            this.contact = data;
        });

    }


    /* getContacts() :Observable<Contact[]>{


          this.http.get('http://localhost:8080/v1/billing/contacts').map((res: Response) => res.json().contacts).subscribe(res => {
               this.contacts = res;
              return  res;
          } );

         return

     }*/

}
