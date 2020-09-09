import { Component, OnInit } from '@angular/core';
import { NavModel } from '../shard/nav.model';
import * as lodash from 'lodash'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // tslint:disable:variable-name
  // tslint:disable:typedef
  nav_list: NavModel[] = [];
  pre_list: NavModel[] = [];
  constructor() { }

  ngOnInit(): void {
    // sample 
    for (let index = 0; index < 5; index++) {
      const data: NavModel = {
        disabled: false,
        visible: true,
        title: 'test' + index,
        url: ''
      };
      this.nav_list.push(data);

    }
    this.pre_list =lodash.cloneDeep(this.nav_list);
  }

  add() {
    const data: NavModel = {
      disabled: false,
      visible: true,
      title: 'test' + this.nav_list.length,
      url: ''
    };
    this.nav_list.push(data);
  }
  del(index: number) {
    if (this.nav_list.length > 0) {
      this.nav_list.splice(index, 1);
    } else {
      this.nav_list = [];
    }

  }
  inputData(key: string, value: any, index: number) {
    this.nav_list[index][key] = value;
  }
  sendData() {

  }
  update() {
    this.pre_list = [...this.nav_list];
  }
}
