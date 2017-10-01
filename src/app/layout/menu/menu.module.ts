import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuRoutingModule} from "./menu-routing.module";
import {MenuComponent} from "./menu.component";
import {TabsComponent} from "./tabs/tabs.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    imports: [
        CommonModule,
        MenuRoutingModule,
        NgbModule.forRoot(),
    ],
    declarations: [MenuComponent,TabsComponent]
})
export class MenuModule { }
