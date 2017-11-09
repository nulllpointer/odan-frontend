import {CartItem} from "./cart-item";

export class CartOrder {

    cartId: number;
    contactId: number;
    txnDate:string;
    discountType: string = "amount";
    discount: number = 0;
    total: number = 0;
    taxRate: number = 0;
    serviceChargeRate: number = 0;
    txnStatus = "cash";
    cashReceived: number = 0;
    grandTotal: number = 0;
    discountValue: number = 0;
    serviceChargeValue: number = 0;
    taxValue: number = 0;
    dueAmount:number=0;

    calculate(items: CartItem[]) {
        var total, scAmount, subTotal, discount, serviceCharge, grandTotal, vat;
        total = 0;
        for (let item of items) {
            total = total + item.price * item.quantity;
        }
        scAmount = total * this.serviceChargeRate;
        if (this.discountType === "amount") {
            discount = this.discount;
        }
        else {
            discount = this.discount / 100 * total;
        }
        subTotal = total - discount;
        serviceCharge = this.serviceChargeRate / 100 * subTotal;
        subTotal = subTotal + serviceCharge;
        vat = this.taxRate / 100 * subTotal;
        grandTotal = subTotal + vat;

        //setting value to the object

        this.total = total;
        this.discountValue = discount;
        this.serviceChargeValue = serviceCharge;
        this.taxValue = vat;
        this.grandTotal = grandTotal;

        this.dueAmount=this.grandTotal-this.cashReceived;

        if(this.dueAmount==0 || this.dueAmount<0){
            this.txnStatus="cash";
        }
        else {
            this.txnStatus="due";
        }


    }

}
