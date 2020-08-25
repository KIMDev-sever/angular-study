"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewsComponent = void 0;
var core_1 = require("@angular/core");
var moment = require("moment");
var NewsComponent = /** @class */ (function () {
    function NewsComponent() {
        this.newsList = [];
    }
    NewsComponent.prototype.ngOnInit = function () {
        // 샘플 데이터
        for (var index = 0; index < 20; index++) {
            var newsModel = {
                index: index,
                url: '',
                write_owner: '회원이름',
                content: '',
                title: '여기 일정 기간에 있는 신규 글들을 취득합니다. ',
                date: moment(new Date()).format('YYYY-MM-DD')
            };
            this.newsList.push(newsModel);
        }
    };
    NewsComponent = __decorate([
        core_1.Component({
            selector: 'app-news',
            templateUrl: './news.component.html',
            styleUrls: ['./news.component.scss']
        })
    ], NewsComponent);
    return NewsComponent;
}());
exports.NewsComponent = NewsComponent;
