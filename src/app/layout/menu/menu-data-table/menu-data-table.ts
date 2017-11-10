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

/**
 * @title Table with pagination
 */
@Component({
    selector: 'menu-data-table',
    styleUrls: ['menu-data-table.scss'],
    templateUrl: 'menu-data-table.html',
})
export class MenuDataTable {
    displayedColumns = ['productId','productTitle', 'productType'];
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


export interface ProductData {
    id: string
    title: string
    productType: string
    category: Category
    principalCategoryType:  string

}


export class ExampleDatabase {

    productData: ProductData[];

    products: Product[];
    private requestUrl = 'http://localhost:8080/v1/billing/purchases';
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<ProductData[]> = new BehaviorSubject<ProductData[]>([]);

    get data(): ProductData[] {
        return this.dataChange.value;

    }

    constructor(restfullService) {

        restfullService.getAll(this.requestUrl).subscribe(data => {
            this.products = data.purchases
            console.log("one", data);
            for (let hero of this.products) {
                this.addProduct(hero);
            }
            console.log("purchase", this.products)

        });


    }


    addProduct(hero) {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewProduct(hero));
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new Product. */
    private createNewProduct(hero) {

        return {
            id: hero.id,
            title: hero.title,
            productType: hero.productType,
            principalCategoryType: hero.principalCategoryType,
            category: hero.category



        };
    }


}


export class ExampleDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<ProductData[]> {
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

    getSortedData(): ProductData[] {
        const data = this._exampleDatabase.data.slice();
        if (!this._sort.active || this._sort.direction == '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'productId':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'productTitle':
                    [propertyA, propertyB] = [a.title, b.title];
                    break;
                case 'productType':
                    [propertyA, propertyB] = [a.productType, b.productType];
                    break;
                case 'productCategory':
                    [propertyA, propertyB] = [a.category.title, b.category.title];
                    break;

                case 'principalproductCategory':
                    [propertyA, propertyB] = [a.principalCategoryType, b.principalCategoryType];
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

