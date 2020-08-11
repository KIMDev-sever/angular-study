import { Injectable } from '@angular/core';
import {MemberModel } from '../shard/member.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  // tslint:disable-next-line:typedef
  login(id: string, password: string) {
  }
  // tslint:disable-next-line:typedef
  logout(){
  }

  // tslint:disable-next-line:typedef
  check_signUp(data: MemberModel){

  }
}
