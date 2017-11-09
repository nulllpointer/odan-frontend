import {Component, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {Contact} from "../../contacts/contact";
import {RestfullService} from "../../../shared/services/restfullService";

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
    contacts: Contact[];


    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private contactService:RestfullService) {
        this.exampleDatabase = new ExampleDatabase(contactService);

    }


    ngOnInit() {
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);
    }
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
    'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

const PHONE = ['8098080', '7878', '3355', '98989', '4545', '45454545',
    '66767', '66767', '66767', '66767', '66767', '454545454545',
    '66767', '4343', '434343434343', '4343', '43434343', '43434343', '4343'];




export interface UserData {
    id: string
    name: string
    progress: string
    phone: string
    color: string

}


export interface ContactData {
    id: string
    firstName: string
    email: string
    phone: string


}





/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
    private requestUrl = "http://localhost:8080/v1/billing/sales";


    contactData: ContactData[];

    contacts: Contact[];

    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<ContactData[]> = new BehaviorSubject<ContactData[]>([]);
    get data(): ContactData[] { return this.dataChange.value; }

    constructor(contactService) {

        contactService.getAll(this.requestUrl).subscribe(data => {this.contacts = data
            console.log("one",data);
               for(let hero of this.contacts){
               this.addUser(hero);
           }
            console.log("contact",this.contacts)

        });

    }


    /** Adds a new user to the database. */
    addUser(hero) {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewUser(hero));
        this.dataChange.next(copiedData);
    }
    /** Builds and returns a new User. */
    private createNewUser(hero) {
       /* const name =
            NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
            NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

        const phone =
            PHONE[Math.round(Math.random() * (PHONE.length - 1))] + ' ' +
            PHONE[Math.round(Math.random() * (PHONE.length - 1))].charAt(0) + '.';

*/

       /* return {
            id: (this.data.length + 1).toString(),
            name: name,
            progress: Math.round(Math.random() * 100).toString(),
            phone: Math.round(Math.random() * 100).toString(),

            color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
            sales: this.sales
        };*/
        return {
            id: hero.id,
            firstName: hero.firstName,
            email:hero.email,
            phone: hero.phone,

            color:"green"

        };
    }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<ContactData[]> {
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
