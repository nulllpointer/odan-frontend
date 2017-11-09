import {Product} from "./product";
import {ProductPrice} from "./product-price";

export class CartItem {

    productId: number
    id:number
    quantity:number
    productPrice:ProductPrice

    productPriceId: number;

    cartId: number;

    serial:number;
    txnDate:string;

    price:number;

    //productPrice: ProductPrice;


}
