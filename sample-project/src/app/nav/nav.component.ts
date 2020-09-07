import { Component, OnInit } from '@angular/core';
import { NavModel } from '../shard/nav.model';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // tslint:disable:variable-name
  // tslint:disable:typedef
  nav_list: NavModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    const data: NavModel = {
      disabled: false,
      visible: true,
      title: '',
      url: ''
    };
    this.nav_list.push(data);
  }
  del(index: number) {
    if (this.nav_list.length > 0) {
      this.nav_list.splice(0, index);
    } else {
      this.nav_list = [];
    }

  }
}
