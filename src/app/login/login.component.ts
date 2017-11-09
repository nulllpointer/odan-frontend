import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from "../router.animations";
import {User} from "../layout/users/user";
import {FormControl, Validators} from "@angular/forms";
import {RestfullService} from "../shared/services/restfullService";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    private heroesUrl = "http://localhost:8080/v1/security/login";
    @Input() user: User = new User();
    users: User[]
    hide = true;
    email = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }

    constructor(public router: Router, private restfullService: RestfullService) {
    }

    ngOnInit() {
    }

    onLoggedin(user) {
        console.log(user);
        var checkuser = JSON.stringify(user);
        this.restfullService.create(this.heroesUrl, checkuser).subscribe(
            data => {
                let body = data.text();
                let userss=data.json();
                console.log(userss);
                console.log("I CANT SEE server sent user here", body);

                if (body == "null") {
                    alert("Incorrect Username/Password")


                    localStorage.setItem("isLoggedin", 'false')

                    this.router.navigate(['/login']);
                }

                else {
                    localStorage.setItem('isLoggedin', 'true');
                    this.user=userss.data

                    localStorage.setItem("authenticatedUser",userss.data.firstName);
                    localStorage.setItem("userType",userss.data.type);



                    alert(userss.data.email);
                    console.log(userss.data.email);

                    this.router.navigate(['/dashboard']);

                }
            }
        )
    }

    }


