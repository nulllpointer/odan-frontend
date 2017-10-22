import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent } from '../shared';
import {RestfullService} from "../shared/services/restfullService";
import { OrderprocessComponent } from './orderprocess/orderprocess.component';
import { TestComponent } from './test/test.component';

@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,

    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
        OrderprocessComponent,
        TestComponent,
    ],

})
export class LayoutModule { }
