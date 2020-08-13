import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { } from '@angular/material/datepicker';
@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss']
})
export class SignUpDialogComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // tslint:disable:typedef
  constructor(
    // tslint:disable:variable-name
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // this.firstFormGroup = this._formBuilder.group({
    //   name: ['', Validators.required],
    //   birthDay: ['', [Validators.required]],
    //   phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{11}$')]]
    // });
    // 작업용 샘플 데이터
    this.firstFormGroup = this._formBuilder.group({
      name: ['test', Validators.required],
      birthDay: ['1/1/2020', [Validators.required]],
      phoneNumber: ['01012341234', [Validators.required, Validators.pattern('^\\d{11}$')]]
    });

    this.secondFormGroup = this._formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required, Validators.pattern('')],
      name: ['', Validators.required],
      birthDay: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{11}$')]]
    });
  }
  checkId(id: string) {

  }
  signUp(level: number, stepper: MatStepper) {
    switch (level) {
      case 1: {
        stepper.next();
        break;
      }
      case 2: {
        stepper.next();
        break;
      }
      case 3: {
        console.log('done');
        break;
      }
    }
  }
}
