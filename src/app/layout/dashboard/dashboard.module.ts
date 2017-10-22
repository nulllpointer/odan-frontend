import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import {CartComponent} from "./components/cart-component/cart.component";
import {DialogComponent} from "./components/cart-dialog/dialog.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        FormsModule,

    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        CartComponent,
        DialogComponent
    ]
})
export class DashboardModule { }
