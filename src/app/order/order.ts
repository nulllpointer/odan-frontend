import {Hero} from "../Hero";
export class Order {

    private _id: number;
   private _product :Hero[];


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get product(): Hero[] {
        return this._product;
    }

    set product(value: Hero[]) {
        this._product = value;
    }
}
