import {Component, OnInit} from '@angular/core';
import {RestfullService} from "../../shared/services/restfullService";
import {Http} from "@angular/http";
import {Sale} from "./sale";

@Component({
    selector: 'app-sale-page',
    templateUrl: './sale.component.html',
    styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

    private requestUrl = 'http://localhost:8080/v1/billing/sales';

    sales: Sale[];

    sale: Sale;

    constructor(private restfullService: RestfullService, private http: Http) {
    }

    ngOnInit() {
        this.getAllSales();
    }

    getAllSales() {
        this.restfullService.getAll(this.requestUrl).subscribe(
            data => {
                this.sales = data.sales;
            }
        );
    }

    getSaleById(id) {

        this.restfullService.getbyId(this.requestUrl + "/" + id).subscribe(
            data => {
                this.sale = data;
            }
        );
    }

}
