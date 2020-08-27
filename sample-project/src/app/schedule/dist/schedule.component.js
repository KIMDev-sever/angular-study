"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ScheduleComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@fullcalendar/core");
var ScheduleComponent = /** @class */ (function () {
    function ScheduleComponent() {
    }
    ScheduleComponent.prototype.ngOnInit = function () {
        var calendar = new core_2.Calendar(calendarEl, {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin]
        });
    };
    ScheduleComponent = __decorate([
        core_1.Component({
            selector: 'app-schedule',
            templateUrl: './schedule.component.html',
            styleUrls: ['./schedule.component.scss']
        })
    ], ScheduleComponent);
    return ScheduleComponent;
}());
exports.ScheduleComponent = ScheduleComponent;
