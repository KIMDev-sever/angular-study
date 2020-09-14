import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { NavModel } from '../shard/nav.model';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // tslint:disable:variable-name
  // tslint:disable:typedef
  // db파이어베이스든뭐든 작업필요
  nav_list: NavModel[] = [];
  pre_list: NavModel[] = [];
  updateTrigger = false;
  deleteTrigger = false;
  del_list: string[] = [];
  constructor() { }

  ngOnInit(): void {
    // sample
    for (let index = 0; index < 5; index++) {
      const data: NavModel = {
        disabled: false,
        visible: true,
        title: 'test' + index,
        url: '',
        id: uuidv4().substring(0, 6)
      };
      this.nav_list.push(data);

    }
    this.pre_list = cloneDeep(this.nav_list); //
  }

  add() {
    const data: NavModel = {
      disabled: false,
      visible: true,
      title: 'test' + this.nav_list.length,
      url: '',
      id: uuidv4().substring(0, 6)
    };

    this.nav_list.push(data);
    this.updateTrigger = true;
  }
  del() {
    this.nav_list = this.nav_list.filter((data) => {
      const is_data = this.del_list.find((del) => {
        return del === data.id;
      });
      return !is_data;
    });
    this.del_list = [];
    this.updateTrigger = true;
    this.deleteTrigger = false;
  }
  inputData(key: string, value: any, index: number) {
    this.nav_list[index][key] = value;
    this.updateTrigger = true;
  }
  sendData() {
    this.nav_list = cloneDeep(this.pre_list);
    // 데이터 전송 서비스 구현예정;
  }
  checkdel(value: boolean, id: string) {
    if (!!value) {
      this.del_list.push(id);
      this.deleteTrigger = true;
    } else {
      // tslint:disable-next-line:no-shadowed-variable
      const value_index = this.del_list.findIndex((value) => {
        return value === id;
      });
      if (value_index !== undefined && value_index !== null) {
        if (this.del_list.length > 0) {
          this.del_list.splice(value_index, 1);
        } else {
          this.del_list = [];
        }
      }
      if (this.del_list.length === 0) {
        this.deleteTrigger = false;
      }
    }
  }
  update() {
    this.pre_list = cloneDeep(this.nav_list);
    this.updateTrigger = false;
  }
}
