import {Component, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {RestfullService} from "../../../shared/services/restfullService";
import {Sale} from "../sale";

/**
 * @title Table with pagination
 */
@Component({
    selector: 'sale-data-table',
    styleUrls: ['sale-data-table.scss'],
    templateUrl: 'sale-data-table.html',
})
export class SaleDataTable {
    discountType: string;
    discount: number;
    taxRate: number;
    serviceChargeRate: number;
    txnStatus: string;
    cashReceived: number;
    due: number;
    displayedColumns = ['id', 'txnDate', 'amount', 'contactName',
        'discountType', 'discount', 'taxRate', 'serviceChargeRate',
        'txnStatus', 'cashReceived', 'due'];
    exampleDatabase: ExampleDatabase
    dataSource: ExampleDataSource | null;
    sales: Sale[];


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private restfullService: RestfullService) {
        this.exampleDatabase = new ExampleDatabase(restfullService);

    }


    ngOnInit() {
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    }
}


export interface SaleData {
    id: number;
    cartId: number;
    txnDate: string;
    amount: number;
    contactName: string;
    discountType: string;
    discount: number;
    taxRate: number;
    serviceChargeRate: number;
    txnStatus: string;
    cashReceived: number;
    due: number;

}


export class ExampleDatabase {

    saleData: SaleData[];

    sales: Sale[];
    private requestUrl = 'http://localhost:8080/v1/billing/sales';
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<SaleData[]> = new BehaviorSubject<SaleData[]>([]);

    get data(): SaleData[] {
        return this.dataChange.value;

    }

    constructor(restfullService) {

        restfullService.getAll(this.requestUrl).subscribe(data => {
            this.sales = data.sales
            console.log("one", data);
            for (let hero of this.sales) {
                this.addSales(hero);
            }
        });
    }

    addSales(hero) {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewSales(hero));
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new Product. */
    private createNewSales(hero) {
        var contactName;
        if (hero.contact == null) {
            contactName = "N/A"
        }
        else {
            contactName = hero.contact.firstName
        }

        return {
            id: hero.id,
            cartId: hero.cart.id,
            txnDate: hero.txnDate,
            amount: hero.amount,
            discountType: hero.discountType,
            discount: hero.discount,
            taxRate: hero.taxRate,
            serviceChargeRate: hero.serviceChargeRate,
            txnStatus: hero.txnStatus,
            cashReceived: hero.cashReceived,
            contactName: contactName,
            due: hero.due

        }
    }


}


export class ExampleDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<SaleData[]> {
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

    getSortedData(): SaleData[] {
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
                    [propertyA, propertyB] = [a.amount, b.amount];
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

