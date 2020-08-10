import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  // tslint:disable-next-line:typedef

}
