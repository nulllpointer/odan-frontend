import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {CartItem} from "../cart-item";

@Injectable()
export class ArticlesPubSubService extends ReplaySubject<Boolean> {

    constructor() {
        super();
    }

}
