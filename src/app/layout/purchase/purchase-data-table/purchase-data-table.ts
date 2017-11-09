import {Component, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {RestfullService} from "../../../shared/services/restfullService";
import {Product} from "../../order/product";
import {Category} from "../../order/category";
import {Purchase} from "../purchase";

/**
 * @title Table with pagination
 */
@Component({
    selector: 'purchase-data-table',
    styleUrls: ['purchase-data-table.scss'],
    templateUrl: 'purchase-data-table.html',
})
export class PurchaseDataTable {
    displayedColumns = ['id', 'txnDate', 'price', 'contactName',
        'productName', 'quantity', 'total', 'timeUnit'];
    exampleDatabase: ExampleDatabase
    dataSource: ExampleDataSource | null;
    products: Product[];


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private restfullService: RestfullService) {
        this.exampleDatabase = new ExampleDatabase(restfullService);

    }


    ngOnInit() {
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    }
}


export interface PurchaseData {
    id: string
    contactName: string
    quantity: number
    txnDate: string
    price: number,
    uom: string,
    timeUnit: string
    total: number

}


export class ExampleDatabase {

    purchaseData: PurchaseData[];

    purchases: Purchase[];
    private requestUrl = 'http://localhost:8080/v1/billing/purchases';
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<PurchaseData[]> = new BehaviorSubject<PurchaseData[]>([]);

    get data(): PurchaseData[] {
        return this.dataChange.value;

    }

    constructor(restfullService) {

        restfullService.getAll(this.requestUrl).subscribe(data => {
            this.purchases = data.purchases
            console.log("one", data);
            for (let hero of this.purchases) {
                this.addPurchase(hero);
            }
            console.log("purchase", this.purchases)

        });


    }


    addPurchase(hero) {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewPurchase(hero));
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new Product. */
    private createNewPurchase(hero) {

        var total = hero.quantity * hero.price;

        var contactName;

        if(hero.contact==null){
            contactName=""
        }
        else{
            contactName=hero.contact.firstName
        }

        return {
            id: hero.id,
            productName: hero.product.title,
            quantity: hero.quantity,
            txnDate: hero.txnDate,
            contactName: contactName,
            price: hero.price,
            uom: hero.uom,
            timeUnit: hero.timeUnit,
            total: total

        };
    }


}


export class ExampleDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<PurchaseData[]> {
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

    getSortedData(): PurchaseData[] {
        const data = this._exampleDatabase.data.slice();
        if (!this._sort.active || this._sort.direction == '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'amount':
                    [propertyA, propertyB] = [a.price, b.price];
                    break;
                case 'txnDate':
                    [propertyA, propertyB] = [a.txnDate, b.txnDate];
                    break;
                case 'contactName':
                    [propertyA, propertyB] = [a.contactName, b.contactName];
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

