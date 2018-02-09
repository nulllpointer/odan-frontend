import {Component, Input, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {RestfullService} from "../../../shared/services/restfullService";
import {Product} from "../product";
import {ProductsComponent} from "../products.component";

@Component({
    selector: 'products-data-table',
    styleUrls: ['products-data-table.scss'],
    templateUrl: 'products-data-table.html',

})
export class ProductsDataTables {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns = ['id', 'title', 'description', 'productType','category','quantity','price','update price','update inventory', 'update', 'delete'];
    exampleDatabase: ExampleDatabase
    dataSource: ExampleDataSource | null;
    products: Product[];
    @Input() contact: Product = new Product();
    private requestUrl = 'http://localhost:8080/v1/billing/products';

    constructor(private restfullService: RestfullService, private productsComponent: ProductsComponent) {
        this.exampleDatabase = new ExampleDatabase(restfullService);

    }


    ngOnInit() {

        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    }


    createOrUpdateContact(id) {
        var selectedHero = this.productsComponent.getProductById(id);
    }

    deleteContact() {
        console.log("delete clicked")
    }


}


export interface ProductData {
    id: number
    title: string
    description: string
    category: string
    productType:string
    quantity:string


}


export class ExampleDatabase {
    private requestUrl = 'http://localhost:8080/v1/billing/products';


    productData: ProductData[];

    products: Product[];
    product: Product;


    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<ProductData[]> = new BehaviorSubject<ProductData[]>([]);

    get data(): ProductData[] {
        return this.dataChange.value;

    }

    constructor(restfullService) {

        restfullService.getAll(this.requestUrl).subscribe(data => {
            this.products = data.products
            console.log("one", data);
            for (let hero of this.products) {
                this.addProduct(hero);
            }
            console.log("product", this.products)

        });


    }


    addProduct(hero) {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewProduct(hero));
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new User. */
    private createNewProduct(hero) {
        var categoryTitle=""
        if(hero.category!=null){
            categoryTitle=hero.category.title;

        }

        return {
            id: hero.id,
            title: hero.title,
            description: hero.description,
            category: categoryTitle,
            productType: hero.productType,
            quantity:hero.quantity,
            price:hero.price

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
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'title':
                    [propertyA, propertyB] = [a.title, b.title];
                    break;
                case 'description':
                    [propertyA, propertyB] = [a.description, b.description];
                    break;
                case 'productType':
                    [propertyA, propertyB] = [a.productType, b.productType];
                    break;

                case 'category':
                    [propertyA, propertyB] = [a.productType, b.productType];
                    break;


                case 'quantity':
                    [propertyA, propertyB] =[a.quantity, b.quantity];
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

