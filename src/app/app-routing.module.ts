import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';
import {CreateProductComponent} from "./create-product/create-product.component";
import {TablesComponent} from "./layout/tables/tables.component";
import {LoginComponent} from "./login/login.component";
import {LayoutComponent} from "./layout/layout.component";
import {ProductComponent} from "./product/product.component";
import {OrderComponent} from "./order/order.component";


const routes: Routes = [
    /*{
        path: '',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuard]

    },



    *///{ path: '', component: ProductComponent },

   { path: 'products', component: ProductComponent },
    { path: 'editproduct/:id', component: CreateProductComponent },
    { path: 'orders', component: OrderComponent },


    { path: '**', redirectTo: 'not-found' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
