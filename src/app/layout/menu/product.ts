export class Product {

     _id: number;
    _name: string;
    _price: number;



    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    Hero(id: number, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
    }



}
