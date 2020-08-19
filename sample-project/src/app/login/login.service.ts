import { Injectable } from '@angular/core';
import { MemberModel } from '../shard/member.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  corsHeaders: HttpHeaders;
  constructor(
    private httpClient: HttpClient,
  ) {
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }
  // tslint:disable-next-line:typedef
  getloginSession() {
    return this.httpClient.post('http://localhost:3000/logined', // api gateway 사용예정
      { body: {  }}, { headers: this.corsHeaders }).toPromise();
  }
  // tslint:disable-next-line:typedef
  login(id: string, password: string) {
    return this.httpClient.post('http://localhost:3000/login', // api gateway 사용예정
      { body: { id, password }}, { headers: this.corsHeaders }).toPromise();
  }
  // tslint:disable-next-line:typedef
  logout() {
    return this.httpClient.post('http://localhost:3000/logout', // api gateway 사용예정
    { body: {  }}, { headers: this.corsHeaders }).toPromise();
  }

  id_check(id: string): Promise<object> {
    return this.httpClient.post('http://localhost:3000/id_check', // api gateway 사용예정
      { body: id }, { headers: this.corsHeaders }).toPromise();
  }
  signUp(data: MemberModel): Promise<object> {
    return this.httpClient.post('http://localhost:3000/sign_up', // api gateway 사용예정
      { body: data }, { headers: this.corsHeaders }).toPromise();
  }
  // tslint:disable-next-line:typedef
  confirmSignUp(data: MemberModel, confirmationCode: string) {
    return this.httpClient.post('http://localhost:3000/confirm_SignUp', // api gateway 사용예정
      { body: { confirmationCode, id: data.id } }, { headers: this.corsHeaders }).toPromise();
  }
  // tslint:disable-next-line:typedef
  check_signUp(data: MemberModel): Promise<object> {
    return this.httpClient.post('http://localhost:3000/sign_up_Check', // api gateway 사용예정
      { body: data }, { headers: this.corsHeaders }).toPromise();
  }
}
