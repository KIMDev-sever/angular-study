import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoginService } from '../login.service';
import { MemberModel } from 'src/app/shard/member.model';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
  providers: [

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SignUpDialogComponent implements OnInit {
  idChecked = false;
  accountChecked = false;
  confirmationCode = '';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  private userName = '';
  private member: MemberModel;
  // tslint:disable:typedef
  constructor(
    // tslint:disable:variable-name
    private _formBuilder: FormBuilder,
    private loginService: LoginService
  ) {

  }

  ngOnInit(): void {

    this.member = {
      id: '',
      password: '',
      birthDay: '',
      email: '',
      name: '',
      phone_number: ''
    };
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      birthDay: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{11}$')]]
    });
    // 작업용 샘플 데이터
    // this.firstFormGroup = this._formBuilder.group({
    //   name: ['test', Validators.required],
    //   birthDay: ['', [Validators.required]],
    //   phoneNumber: ['01012341234', [Validators.required, Validators.pattern('^\\d{11}$')]]
    // });

    this.secondFormGroup = this._formBuilder.group({
      id: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/')]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDay: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{11}$')]]
    });
  }
  checkId(id: string) {
    this.loginService.id_check(id).then((value) => {

    });
  }
  inputData(key: string, value: string) {
    console.log(value);
    if (key === 'phone_number') {
      value = '+82' + value;
    }
    if (key === 'birthDay') {
      const date = moment(value).format('YYYY/MM/DD');
      value = date;
    }
    this.member[key] = value;
  }
  signUp(level: number, stepper: MatStepper) {
    switch (level) {
      case 1: {
        this.loginService.check_signUp(this.member).then((value: object) => {
          // tslint:disable-next-line:no-string-literal

          const newLocal = 'cheked';
          if (!!value && !!value[newLocal]) {
            // tslint:disable-next-line:no-string-literal

            stepper.next();

          } else {
            this.accountChecked = true;
          }
        });

        break;
      }
      case 2: {
        console.log(this.member);
        this.loginService.signUp(this.member).then((value) => {
          // tslint:disable-next-line:no-string-literal
          if (!!value['message'] && value['message'] === 'ok') {
            stepper.next();
          }
        });
        break;
      }
      case 3: {
        this.loginService.confirmSignUp(this.member, this.confirmationCode).then((value) => {
          // tslint:disable-next-line:no-string-literal
          if (!!value['message'] && value['message'] === 'ok') {
            stepper.next();
          }
        });
        break;
      }
      case 4: {
        console.log('done');
        break;
      }
    }
  }
}
