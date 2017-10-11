import {Component, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {UserService} from "../../users/userservice";
import {User} from "../../users/user";
import {isPropertyAssignment} from "codelyzer/util/astQuery";

/**
 * @title Table with pagination
 */
@Component({
    selector: 'table-pagination-example',
    styleUrls: ['table-pagination-example.scss'],
    templateUrl: 'table-pagination-example.html',
})
export class TablePaginationExample {
    displayedColumns = ['userId', 'progress', 'userName', 'userPhone', 'color'];
    exampleDatabase: ExampleDatabase
    dataSource: ExampleDataSource | null;
    users: User[];


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private userService: UserService) {
        this.exampleDatabase = new ExampleDatabase(userService);

    }


    ngOnInit() {
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    }
}


export interface UserData {
    id: string
    firstName: string
    email: string
    phone: string

}


export class ExampleDatabase {

    userData: UserData[];

    users: User[];

    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

    get data(): UserData[] {
        return this.dataChange.value;

    }

    constructor(userService) {

        userService.getAllUsers().subscribe(data => {
            this.users = data
            console.log("one", data);
            for (let hero of this.users) {
                this.addUser(hero);
            }
            console.log("user", this.users)

        });


    }


    addUser(hero) {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewUser(hero));
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new User. */
    private createNewUser(hero) {

        return {
            id: hero.id,
            firstName: hero.firstName,
            email: hero.email,
            phone: hero.phone,
            color: "green"

        };
    }


}

//OrigiCode
/*
export class ExampleDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator) {
        super();
    }

    /!** Connect function called by the table to retrieve one stream containing the data to render. *!/
    connect(): Observable<UserData[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._paginator.page,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            const data = this._exampleDatabase.data.slice();

            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize);
        });
    }

    disconnect() {}
}
*/

export class ExampleDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<UserData[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._paginator.page,
            this._sort.sortChange,


        ];


        return Observable.merge(...displayDataChanges).map(() => {
            const data = this.getSortedData();

            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;


            return data.splice(startIndex, this._paginator.pageSize);

        });


    }

    getSortedData(): UserData[] {
        const data = this._exampleDatabase.data.slice();
        if (!this._sort.active || this._sort.direction == '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'userId':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'userName':
                    [propertyA, propertyB] = [a.firstName, b.firstName];
                    break;
                case 'progress':
                    [propertyA, propertyB] = [a.email, b.email];
                    break;
                case 'phone':
                    [propertyA, propertyB] = [a.phone, b.phone];
                    break;

                case 'color':
                    [propertyA, propertyB] = ["green", "green"];
                    break;
            }

            let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
        });
    }


    disconnect() {
    }
}

