import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {DialogComponent} from "../layout/users/dialog/dialog.component";

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule
  ],
  declarations: [SignupComponent, DialogComponent]
})
export class SignupModule { }
