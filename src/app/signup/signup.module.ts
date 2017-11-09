import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {DialogComponent} from "../layout/users/dialog/dialog.component";
import {UsersComponent} from "../layout/users/users.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        SignupRoutingModule,
        FormsModule
    ],
    declarations: [SignupComponent, DialogComponent],
    providers: [UsersComponent]
})
export class SignupModule { }
