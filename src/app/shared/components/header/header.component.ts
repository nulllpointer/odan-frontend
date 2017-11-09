import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [LoginComponent]
})
export class HeaderComponent implements OnInit {

    pushRightClass: string = 'push-right';
    authenticatedUser:any;

    constructor(private translate: TranslateService, public router: Router, private loginCOmponent:LoginComponent) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
        let user= new User();
      this.authenticatedUser= localStorage.getItem('authenticatedUser');

        console.log(this.authenticatedUser)


    }

    ngOnInit() {}


    logout(){
        localStorage.clear();
        this.router.navigate(['/login']);


    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
import { TranslateService } from '@ngx-translate/core';

import {User} from "../../../layout/users/user";
import {LoginComponent} from "../../../login/login.component";
