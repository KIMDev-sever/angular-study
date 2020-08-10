import { Component, OnInit } from '@angular/core';
import { FormControl,  Validators,  } from '@angular/forms';
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material/dialog';
import { SignUpDialogComponent } from './sign-up-dialog/sign-up-dialog.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validatorCheck = false;
  idformControl = new FormControl('', [
    Validators.required,
  ]);
  passformControl = new FormControl('', [
    Validators.required,
  ]);
  // tslint:disable-next-line:variable-name
  validate_state = true;
  constructor(
    private dialog: MatDialog,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  // tslint:disable-next-line:typedef
  login(id: string, password: string) {
    this.loginService.login(id, password);
  }
  // tslint:disable-next-line:typedef
  logout(){
    this.loginService.logout();
  }
  // tslint:disable-next-line:typedef
  signUp(){
    this.dialog.open(SignUpDialogComponent, {
      width: '80%',
      height: '80%'
    });
  }
}
