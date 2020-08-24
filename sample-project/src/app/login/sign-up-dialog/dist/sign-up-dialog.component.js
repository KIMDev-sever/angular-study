"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignUpDialogComponent = exports.MY_FORMATS = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var moment = require("moment");
exports.MY_FORMATS = {
    parse: {
        dateInput: 'YYYY/MM/DD'
    },
    display: {
        dateInput: 'YYYY/MM/DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
var SignUpDialogComponent = /** @class */ (function () {
    // tslint:disable:typedef
    function SignUpDialogComponent(
    // tslint:disable:variable-name
    _formBuilder, loginService, matDialogRef) {
        this._formBuilder = _formBuilder;
        this.loginService = loginService;
        this.matDialogRef = matDialogRef;
        this.idChecked = false;
        this.idCheckBoxState = false;
        this.accountChecked = false;
        this.confirmationCode = '';
        this.userName = '';
    }
    SignUpDialogComponent.prototype.ngOnInit = function () {
        this.member = {
            id: '',
            password: '',
            birthDay: '',
            email: '',
            name: '',
            phone_number: ''
        };
        this.firstFormGroup = this._formBuilder.group({
            name: ['', forms_1.Validators.required],
            birthDay: ['', [forms_1.Validators.required]],
            phoneNumber: ['', [forms_1.Validators.required, forms_1.Validators.pattern('^\\d{11}$')]]
        });
        // 작업용 샘플 데이터
        // this.firstFormGroup = this._formBuilder.group({
        //   name: ['test', Validators.required],
        //   birthDay: ['', [Validators.required]],
        //   phoneNumber: ['01012341234', [Validators.required, Validators.pattern('^\\d{11}$')]]
        // });
        this.secondFormGroup = this._formBuilder.group({
            id: ['', forms_1.Validators.required],
            // tslint:disable-next-line:max-line-length
            password: ['', [forms_1.Validators.required, forms_1.Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$')]],
            name: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            birthDay: ['', forms_1.Validators.required],
            phoneNumber: ['', [forms_1.Validators.required, forms_1.Validators.pattern('^\\d{11}$')]]
        });
    };
    SignUpDialogComponent.prototype.checkId = function (id, check) {
        var _this = this;
        if (!check) {
            return;
        }
        this.loginService.id_check(id).then(function (value) {
            var newLocal = 'cheked';
            console.log(value);
            if (!!value && !value[newLocal]) {
                // tslint:disable-next-line:no-string-literal
                _this.idChecked = true;
            }
            else {
                _this.idChecked = false;
            }
        });
    };
    SignUpDialogComponent.prototype.inputData = function (key, value) {
        console.log(value);
        if (key === 'phone_number') {
            value = '+82' + value;
        }
        if (key === 'birthDay') {
            var date = moment(value).format('YYYY/MM/DD');
            value = date;
        }
        this.member[key] = value;
    };
    SignUpDialogComponent.prototype.signUp = function (level, stepper) {
        var _this = this;
        switch (level) {
            case 1: {
                this.loginService.check_signUp(this.member).then(function (value) {
                    // tslint:disable-next-line:no-string-literal
                    console.log(value);
                    var newLocal = 'cheked';
                    if (!!value && !!value[newLocal]) {
                        // tslint:disable-next-line:no-string-literal
                        stepper.next();
                    }
                    else {
                        _this.accountChecked = true;
                    }
                });
                break;
            }
            case 2: {
                console.log(this.member);
                this.loginService.signUp(this.member).then(function (value) {
                    // tslint:disable-next-line:no-string-literal
                    if (!!value['message'] && value['message'] === 'ok' && !_this.idChecked) {
                        stepper.next();
                    }
                });
                break;
            }
            case 3: {
                this.loginService.confirmSignUp(this.member, this.confirmationCode).then(function (value) {
                    // tslint:disable-next-line:no-string-literal
                    if (!!value['message'] && value['message'] === 'ok') {
                        stepper.next();
                    }
                });
                break;
            }
            case 4: {
                console.log('done');
                this.matDialogRef.close();
                break;
            }
        }
    };
    SignUpDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-sign-up-dialog',
            templateUrl: './sign-up-dialog.component.html',
            styleUrls: ['./sign-up-dialog.component.scss'],
            providers: [
                { provide: core_2.MAT_DATE_FORMATS, useValue: exports.MY_FORMATS },
            ]
        })
    ], SignUpDialogComponent);
    return SignUpDialogComponent;
}());
exports.SignUpDialogComponent = SignUpDialogComponent;
