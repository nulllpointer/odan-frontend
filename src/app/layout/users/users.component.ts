import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Http, Response, RequestMethod} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions} from '@angular/http';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Createproductservice} from "../../create-product/createproductservice.service";
import {User} from "./user";
import {UserService} from "./userservice";
import {DialogComponent} from "./dialog/dialog.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],

})
export class UsersComponent implements OnInit {

    id: number
    private datas: any;

    today: number = Date.now();
    private heroesUrl = "http://localhost:8080/v1/billing/users";
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

    constructor(private userService: UserService, private http: Http, private dialogcomponent: DialogComponent) {
        this.userService.getAllUsers().subscribe(data => this.users = data);


    }


    ngOnInit(): void {

    }

    createUser() {

        var userjson = JSON.stringify(this.user);

        this.userService.createUser(this.heroesUrl, userjson).subscribe(
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


    createOrUpdateUser(user) {
        alert(user.id)


        if (user.id == 0 || user.id == "undefined" || user.id == null) {
            this.createUser();
        }
        else {
            this.updateUser();
        }

    }

    updateUser() {
        var userjson = JSON.stringify(this.user);
        this.userService.update(userjson).subscribe(
            suc => {
                console.log("hero", suc.json().message);
                location.reload();
            },
            err => {
                console.log(err);
            }
        );
        alert("updated successfully")
        location.reload();

    }

    getUserById(id) {

        this.userService.getbyId(id).subscribe(
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
        this.userService.deleteData(`http://localhost:8080/v1/billing/users/${id}`);
        alert("Deleted Successfuly")


    }

    test(hero) {
        this.user = hero;

        this.localDialog.visible = true;
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}
