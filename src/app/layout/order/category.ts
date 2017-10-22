import {Product} from "./product";

export class Category {

    id: number;
    title: string;
    productType: any;
    principalCategoryType: string;
    categoryId: number;
    products: Product[];

}
