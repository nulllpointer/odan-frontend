import {Component, Input, OnInit} from '@angular/core';
import { routerTransition } from '../router.animations';
import {User} from "../layout/users/user";
import {RestfullService} from "../shared/services/restfullService";
import {Http} from "@angular/http";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    id: number
    private datas: any;

    today: number = Date.now();
    private requestUrl = 'http://localhost:8080/v1/security/users';
    private deleteRequestUrl = "http://localhost:8080/v1/security/users/delete";

    results: string[];
    private values: any[];
    users: User[];
    @Input() user: User = new User();
    @Input() firstName: string = '';
    @Input() lastName: string = '';
    @Input() email: string = '';
    @Input() phone: string = '';
    @Input() userName: string = '';
    @Input() userPassword: string = '';






    constructor(private http: Http, private restfullService: RestfullService) {
    }



        createOrUpdateUser(form: NgForm) {

            console.log(form.value);
            var userjson = JSON.stringify(form.value);

            this.restfullService.create(this.requestUrl, userjson).subscribe(
                suc => {
                    console.log("hero", suc.json().message);
                    alert(suc.json().message);
                    location.reload();
                },
                err => {
                    console.log(err);
                }
            );
        }





    ngOnInit() {
    }
}
