import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {routerTransition} from "../../router.animations";
import {User} from "../users/user";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    @Input() user: User = new User();

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    onLoggedin(hero) {

        console.log(hero.email)
        localStorage.setItem('isLoggedin', 'true');
    }

}
