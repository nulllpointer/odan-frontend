import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild} from '@angular/router';
import { Router } from '@angular/router';
import {User} from "../../layout/users/user";
import {LoginComponent} from "../../login/login.component";

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {


    constructor(private router: Router, private loginComponent: LoginComponent) { }

    canActivate() {

       var canLogin;
       canLogin=localStorage.getItem("isLoggedin")

       if(canLogin=='true'){
           return true;
       }

}

    canActivateChild(): boolean {
        var hero;
        hero=localStorage.getItem("userType")



        if (hero === 'ADMIN') {
            return true;
        } else {
            window.alert("You are not authorized to view this page")
            console.log('Unauthorized to open link: ');
            return false;
        }
    }

}
