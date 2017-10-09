import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {OrderComponent} from "./order.component";
import {OrderService} from "./orderservice";
import {OrderRoutingModule} from "./order-routing.module";
import {TabsComponent} from "./tabs/tabs.component";
import {MenuService} from "../menu/menuservice";
import {CollapseComponent} from "../bs-component/components/collapse/collapse.component";
import {TableFilteringComponent} from "./tablenew/table-filtering.component";
import {MatDatepickerModule, MatNativeDateModule} from "@angular/material";



@NgModule({
    imports: [
        CommonModule,
        OrderRoutingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgbModule.forRoot(),

    ],
    declarations: [OrderComponent,TabsComponent, CollapseComponent, TableFilteringComponent],
    providers:[OrderService, MenuService, CollapseComponent, TableFilteringComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class OrderModule { }
