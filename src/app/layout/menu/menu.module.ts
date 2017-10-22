import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuRoutingModule} from "./menu-routing.module";
import {MenuComponent} from "./menu.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MenuService} from "./menuservice";
import {MenuDataTable} from "./menu-data-table/menu-data-table";
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule,
    MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
    MatListModule,
    MatNativeDateModule, MatStepperModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRippleModule, MatSelectModule, MatSliderModule, MatSidenavModule, MatSlideToggleModule,
    MatTableModule, MatSortModule, MatRadioModule, MatSnackBarModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
} from "@angular/material";
import {MenuDialogComponent} from "./menu-dialog/menu-dialog-component";
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        MenuRoutingModule,
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
        NgbModule.forRoot(),
    ],
    declarations: [MenuComponent,MenuDataTable, MenuDialogComponent],

    providers:[MenuService]
})
export class MenuModule { }
