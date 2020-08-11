import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss']
})
export class SignUpDialogComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      birthDay: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      birthDay: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }
  // tslint:disable-next-line:typedef
  signUp(level: number, stepper: MatStepper) {
    switch (level){
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
