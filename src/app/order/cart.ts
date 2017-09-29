import {Hero} from "../Hero";
export class Cart {


   private _product :Hero=new Hero();

   private _quantity:number;

   private _discount: number;

   private _total: number;


    get discount(): number {
        return this._discount;
    }

    set discount(value: number) {
        this._discount = value;
    }

    get total(): number {
        return this._total;
    }

    set total(value: number) {
        this._total = value;
    }

    get product(): Hero {
        return this._product;
    }

    set product(value: Hero) {
        this._product = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }
}
