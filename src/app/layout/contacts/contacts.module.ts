import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsRoutingModule} from "./contacts-routing.module";
import {ContactsComponent} from "./contacts.component";
import {FormModule} from "../form/form.module";
import {FormsModule} from "@angular/forms";
import {DialogComponent} from "./dialog/dialog.component";
import {Browser} from "selenium-webdriver";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {RestfullService} from "../../shared/services/restfullService";
import {ContactsDataTable} from "./contacts-data-tables/contacts-data-tables";
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule,
    MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
    MatListModule,
    MatNativeDateModule, MatStepperModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRippleModule, MatSelectModule, MatSliderModule, MatSidenavModule, MatSlideToggleModule,
    MatTableModule, MatSortModule, MatRadioModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule, MatTabsModule,
} from "@angular/material";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ContactsRoutingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,

    ],
    declarations: [ContactsComponent, DialogComponent, ContactsDataTable],
    providers: [RestfullService]
})
export class ContactsModule {
}
