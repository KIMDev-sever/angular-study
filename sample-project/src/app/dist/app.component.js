"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var AppComponent = /** @class */ (function () {
    function AppComponent(utilityService, // 의존성주입 내부에서 만든 변수를 외부에서 넣어줌,
    loginService, router) {
        this.utilityService = utilityService;
        this.loginService = loginService;
        this.router = router;
        // tslint:disable:typedef
        this.loadingSw = false;
        this.subscription = new rxjs_1.Subscription();
        this.logined = false;
        // 회원이 관리자에게 메세지 및 글을 등록한우 새소식으로
        this.newMessage = 15;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription.add(this.utilityService.getLoadingCheckData().subscribe(function (value) {
            _this.loadingSw = value;
        }));
        this.subscription.add(this.utilityService.getlogined().subscribe(function (value) {
            _this.logined = value;
        }));
    };
    AppComponent.prototype.go_main = function () {
        this.router.navigate(['main']);
    };
    AppComponent.prototype.logout = function () {
        this.loginService.logout();
        this.logined = false;
        this.router.navigate(['login']);
    };
    AppComponent.prototype.openMemberPage = function () {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
