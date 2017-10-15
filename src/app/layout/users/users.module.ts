import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormModule} from "../form/form.module";
import {FormsModule} from "@angular/forms";
import {DialogComponent} from "./dialog/dialog.component";
import {Browser} from "selenium-webdriver";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {UsersDataTable} from "./users-data-table/users-data-table";
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
import {UsersRoutingModule} from "./users-routing.module";
import {RestfullService} from "../../shared/services/restfullService";
import {UsersComponent} from "./users.component";


@NgModule({
  imports: [
    CommonModule,
      FormsModule,
    UsersRoutingModule,
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
  declarations: [UsersComponent, UsersDataTable, DialogComponent],
    providers: [RestfullService, DialogComponent]
})
export class UsersModule { }
