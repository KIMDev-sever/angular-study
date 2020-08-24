"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainChartComponent = void 0;
var core_1 = require("@angular/core");
var Chart = require("chart.js");
var MainChartComponent = /** @class */ (function () {
    function MainChartComponent() {
        this.month_arry = [];
        this.sampleData_arry = [];
    }
    MainChartComponent.prototype.ngAfterViewInit = function () {
        for (var index = 0; index < 12; index++) {
            this.month_arry.push((index + 1) + '월');
            var data = Math.round(Math.random() * 100);
            this.sampleData_arry.push(data);
        }
        this.initCart('line', '신규회원수', this.newMemberChart);
        this.initCart('pie', '컨텐츠 조회수', this.newContentCount);
    };
    MainChartComponent.prototype.ngOnInit = function () {
    };
    // tslint:disable-next-line:typedef
    MainChartComponent.prototype.initCart = function (types, labels, el) {
        var context = el.nativeElement.getContext('2d');
        // tslint:disable-next-line:no-unused-expression
        new Chart(context, {
            type: types,
            data: {
                labels: this.month_arry,
                datasets: [{
                        label: '',
                        data: this.sampleData_arry,
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 2, 123, 1)',
                            'rgba(54, 3, 235, 1)',
                            'rgba(123, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(5, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 2
                    }]
            }
        });
    };
    __decorate([
        core_1.ViewChild('newMemberChart')
    ], MainChartComponent.prototype, "newMemberChart");
    __decorate([
        core_1.ViewChild('newContentCount')
    ], MainChartComponent.prototype, "newContentCount");
    MainChartComponent = __decorate([
        core_1.Component({
            selector: 'app-main-chart',
            templateUrl: './main-chart.component.html',
            styleUrls: ['./main-chart.component.scss']
        })
        /*
        데이터베이스 연동 요함
         */
    ], MainChartComponent);
    return MainChartComponent;
}());
exports.MainChartComponent = MainChartComponent;
