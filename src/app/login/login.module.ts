import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {FormControlDirective, FormGroupDirective, FormsModule} from "@angular/forms";
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
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
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
    declarations: [LoginComponent],
    providers: [FormControlDirective, FormGroupDirective]
})
export class LoginModule {



}
