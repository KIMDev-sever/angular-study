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
        var category_Arrys = ['아이스크림', '자동차', '컴퓨터', '고기', '생선', '주식', '부동산', '등등'];
        this.initCart('bar', '', this.newMemberChart, this.month_arry);
        this.initCart('pie', '', this.newContentCount, category_Arrys);
    };
    MainChartComponent.prototype.ngOnInit = function () {
    };
    // tslint:disable-next-line:typedef
    MainChartComponent.prototype.initCart = function (types, label, el, labels) {
        var context = el.nativeElement.getContext('2d');
        // tslint:disable-next-line:no-unused-expression
        new Chart(context, {
            type: types,
            data: {
                labels: labels,
                datasets: [{
                        label: label,
                        data: this.sampleData_arry,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderWidth: 3
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
