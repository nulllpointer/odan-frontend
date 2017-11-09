import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthGuard} from "../shared/guard/auth.guard";
import {AuthGuardService} from "../shared/guard/auth.guard.service";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element',canActivateChild: [ AuthGuard ], loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'menu', loadChildren: './menu/menu.module#MenuModule' },
            { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' },
            { path: 'order/:id', loadChildren: './order/order.module#OrderModule' },



            { path: 'users', canActivateChild: [AuthGuard], loadChildren: './users/users.module#UsersModule' },



        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
