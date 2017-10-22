import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {OrderComponent} from "./order.component";
import {OrderRoutingModule} from "./order-routing.module";
import {TabsComponent} from "./tabs/tabs.component";
import {MenuService} from "../menu/menuservice";
import {CollapseComponent} from "../bs-component/components/collapse/collapse.component";
import {TableFilteringComponent} from "./tablenew/table-filtering.component";
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
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
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
} from "@angular/material";
import {TablePaginationExample} from "./table-pagination-example/table-pagination-example";
import {ArticlesPubSubService} from "./service/articles-pub-sub.service";
import {CartService} from "../../shared/services/cart-service";
import {FormsModule} from "@angular/forms";
import {CartItemDialogComponent} from "./cart-item-dialog/dialog.component";


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
        FormsModule,
        NgbModule.forRoot(),

    ],
    declarations: [OrderComponent,TabsComponent, CollapseComponent, TableFilteringComponent, TablePaginationExample,CartItemDialogComponent],
    providers:[CartService, MenuService, CollapseComponent, TableFilteringComponent, ArticlesPubSubService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class OrderModule { }
