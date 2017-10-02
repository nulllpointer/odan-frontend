import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsRoutingModule} from "./contacts-routing.module";
import {ContactsComponent} from "./contacts.component";
import {ContactService} from "./contactservice";
import {FormModule} from "../form/form.module";
import {FormsModule} from "@angular/forms";
import {DialogComponent} from "./dialog/dialog.component";
import {Browser} from "selenium-webdriver";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  imports: [
    CommonModule,
      FormsModule,
    ContactsRoutingModule,
  ],
  declarations: [ContactsComponent,DialogComponent],
    providers: [ContactService]
})
export class ContactsModule { }
