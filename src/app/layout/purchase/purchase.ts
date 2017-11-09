import {PurchaseItem} from "./purchase-item";

export class Purchase {

    id: number;
    amount:number;
    txnDate=new Date();
    contactName:string;
    productId:number;
    quantity:number;
    price:number;
    timeUnit:string;
    uom:string;
    contactId:number;


}
