import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {routerTransition} from "../router.animations";
import {User} from "../layout/users/user";
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    @Input() user: User = new User();
    hide = true;
    email = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    onLoggedin(hero) {

        console.log(hero.email)

        if (hero.username=="Odan" && hero.phone=="9999")
        {localStorage.setItem('isLoggedin', 'true');
        alert("u are logged")
        }else {
            this.getErrorMessage()
        }
         }

}
