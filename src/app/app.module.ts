import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';
import {CreateProductComponent} from './create-product/create-product.component';
import {TablesComponent} from "./layout/tables/tables.component";
import {TablesService} from "./app.data.service";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {LayoutComponent} from "./layout/layout.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {LoginComponent} from "./login/login.component";
import {PageHeaderModule} from "./shared/modules/page-header/page-header.module";
import { ProductComponent } from './product/product.component';
import {ProductService} from "./product/productservice";
import { OrderComponent } from './order/order.component';
import {OrderService} from "./order/orderservice";
import {Createproductservice} from "./create-product/createproductservice.service";


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent, TablesComponent, CreateProductComponent, LayoutComponent,
        HeaderComponent,
        SidebarComponent, LoginComponent, ProductComponent, OrderComponent

    ],
    imports: [

        CommonModule,
        NgbDropdownModule.forRoot(),
        PageHeaderModule,
        TranslateModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    providers: [AuthGuard, ProductService, ProductComponent, OrderService, Createproductservice],
    bootstrap: [AppComponent]
})
export class AppModule {


}
