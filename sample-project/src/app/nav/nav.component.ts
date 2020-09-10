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
  updateTrigger = false;
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
    this.pre_list = lodash.cloneDeep(this.nav_list); //
  }

  add() {
    const data: NavModel = {
      disabled: false,
      visible: true,
      title: 'test' + this.nav_list.length,
      url: ''
    };
    this.nav_list.push(data);
    this.updateTrigger = true;
  }
  del(index: number) {
    if (this.nav_list.length > 0) {
      this.nav_list.splice(index, 1);
    } else {
      this.nav_list = [];
    }
    this.updateTrigger = true;
  }
  inputData(key: string, value: any, index: number) {
    this.nav_list[index][key] = value;
    this.updateTrigger = true;
  }
  sendData() {
    this.nav_list = lodash.cloneDeep(this.pre_list);
    //데이터 전송 서비스 구현예정
  }
  update() {
    this.pre_list = lodash.cloneDeep(this.nav_list);
    this.updateTrigger = false;
  }
}
