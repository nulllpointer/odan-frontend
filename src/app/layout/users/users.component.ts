import {Attribute, Component, Directive, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {Http, Response, RequestMethod} from "@angular/http";
import {User} from "./user";
import {DialogComponent} from "./dialog/dialog.component";
import {RestfullService} from "../../shared/services/restfullService";
import {AbstractControl, NG_VALIDATORS, NgForm, Validator} from "@angular/forms";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],

})


export class UsersComponent implements OnInit {


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


    @ViewChild(DialogComponent)
    private localDialog: DialogComponent;


    constructor(private restfullService: RestfullService, private http: Http, private dialogcomponent: DialogComponent) {
        this.restfullService.getAll(this.requestUrl).subscribe(data => this.users = data.users);


    }


    ngOnInit(): void {
        this.localDialog.visible = false;

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


    getUserById(id) {

        this.restfullService.getbyId(this.requestUrl + "/" + id).subscribe(
            data => {
                this.user = data;
                console.log("I CANT SEE DATA HERE also: ", this.user);
            }
        );

        console.log(this.user.firstName)
        this.firstName = this.user.firstName
        this.lastName = this.user.lastName
        this.phone = this.user.phone
        this.email = this.user.email

    }

    deleteUser(id) {
        var x;
        this.restfullService.deleteById(this.deleteRequestUrl + "/" + id).subscribe(data => {
            console.log("hrreer")
            console.log(data);
            console.log("agin");


        });

    }

    viewUser(hero) {
        this.user = hero;

        this.localDialog.visible = true;
    }


}

