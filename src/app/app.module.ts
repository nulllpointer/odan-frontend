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
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {PageHeaderModule} from "./shared/modules/page-header/page-header.module";
import {ProductComponent} from './product/product.component';
import {ProductService} from "./product/productservice";
import {Createproductservice} from "./create-product/createproductservice.service";
import { CollapsibleModule } from 'angular2-collapsible';
import {RestfullService} from "./shared/services/restfullService";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent, ProductComponent

    ],
    imports: [

        CommonModule,
        NgbDropdownModule.forRoot(),
        PageHeaderModule,
        TranslateModule,
        BrowserModule,
        BrowserAnimationsModule,
        CollapsibleModule,
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
    providers: [AuthGuard, ProductService, Createproductservice,RestfullService],
    bootstrap: [AppComponent]
})
export class AppModule {


}
