import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivateChild {
    loggedInUser: any

    constructor(private router: Router) {
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.loggedInUser= localStorage.getItem("authenticatedUser")
        if (this.loggedInUser.type === 'ADMIN') {
            return true;
        } else {
            console.log('Unauthorized to open link: '+ state.url);
            return false;
        }
    }
























    CanActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

        var canAccess;
        canAccess=localStorage.getItem('authenticatedUser')
        console.log(canAccess);
        return true;

    }

}
