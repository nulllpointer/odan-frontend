import {Component, OnInit} from '@angular/core';

/**
 * @title Stacked chips
 */
@Component({
    selector: 'table-filtering',
    templateUrl: 'table-filtering.component.html',
    styleUrls: ['table-filtering.component.scss'],
})
export class TableFilteringComponent{
    color: string;

    availableColors = [
        { name: 'none', color: '' },
        { name: 'Primary', color: 'primary' },
        { name: 'Accent', color: 'accent' },
        { name: 'Warn', color: 'warn' }
    ];
}
