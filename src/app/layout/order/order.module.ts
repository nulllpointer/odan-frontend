import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {OrderComponent} from "./order.component";
import {OrderService} from "./orderservice";
import {OrderRoutingModule} from "./order-routing.module";
import {TabsComponent} from "./tabs/tabs.component";
import {MenuService} from "../menu/menuservice";
import {CollapseComponent} from "../bs-component/components/collapse/collapse.component";
import {TableFilteringComponent} from "./tablenew/table-filtering.component";
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule,
    MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
    MatListModule,
    MatNativeDateModule, MatStepperModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRippleModule, MatSelectModule, MatSliderModule, MatSidenavModule, MatSlideToggleModule,
    MatTableModule, MatSortModule,
} from "@angular/material";
import {TablePaginationExample} from "./table-pagination-example/table-pagination-example";
import {MatToolbarModule} from "@angular/material";
import {MatTabsModule, MatTooltipModule} from "@angular/material";
import {MatSnackBarModule} from "@angular/material";
import {MatRadioModule} from "@angular/material";
import {ContactService} from "../contacts/contactservice";


@NgModule({
    imports: [
        CommonModule,
        OrderRoutingModule,
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
    declarations: [OrderComponent,TabsComponent, CollapseComponent, TableFilteringComponent, TablePaginationExample],
    providers:[OrderService, MenuService, CollapseComponent, TableFilteringComponent,ContactService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class OrderModule { }
