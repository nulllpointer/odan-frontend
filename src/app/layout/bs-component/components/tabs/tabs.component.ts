import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../../../../Hero";
import {ProductService} from "../../../../product/productservice";
import {Http} from "@angular/http";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
