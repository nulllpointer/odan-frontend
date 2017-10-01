import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsRoutingModule} from "./contacts-routing.module";
import {ContactsComponent} from "./contacts.component";
import {ContactService} from "./contactservice";


@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule
  ],
  declarations: [ContactsComponent],
    providers: [ContactService]
})
export class ContactsModule { }
