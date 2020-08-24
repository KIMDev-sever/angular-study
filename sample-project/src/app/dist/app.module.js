"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var toolbar_1 = require("@angular/material/toolbar");
var form_field_1 = require("@angular/material/form-field");
var youtube_component_1 = require("./youtube/youtube.component");
var player_list_component_1 = require("./player-list/player-list.component");
var list_1 = require("@angular/material/list");
var sidenav_1 = require("@angular/material/sidenav");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var input_1 = require("@angular/material/input");
var dialog_component_1 = require("./shard/dialog/dialog.component");
var icon_1 = require("@angular/material/icon");
var http_1 = require("@angular/common/http");
var snack_bar_1 = require("@angular/material/snack-bar");
var stepper_1 = require("@angular/material/stepper");
var login_component_1 = require("./login/login.component");
var card_1 = require("@angular/material/card");
var forms_1 = require("@angular/forms");
var sign_up_dialog_component_1 = require("./login/sign-up-dialog/sign-up-dialog.component");
var datepicker_1 = require("@angular/material/datepicker");
var core_2 = require("@angular/material/core");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var checkbox_1 = require("@angular/material/checkbox");
var list_component_1 = require("./list/list.component");
var main_component_1 = require("./main/main.component");
var main_chart_component_1 = require("./main/main-chart/main-chart.component");
var news_component_1 = require("./main/news/news.component");
var menu_1 = require("@angular/material/menu");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                youtube_component_1.YoutubeComponent,
                player_list_component_1.PlayerListComponent,
                dialog_component_1.DialogComponent,
                login_component_1.LoginComponent,
                sign_up_dialog_component_1.SignUpDialogComponent,
                list_component_1.ListComponent,
                main_component_1.MainComponent,
                main_chart_component_1.MainChartComponent,
                news_component_1.NewsComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                button_1.MatButtonModule,
                core_2.MatNativeDateModule,
                card_1.MatCardModule,
                icon_1.MatIconModule,
                stepper_1.MatStepperModule,
                checkbox_1.MatCheckboxModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                input_1.MatInputModule,
                snack_bar_1.MatSnackBarModule,
                animations_1.BrowserAnimationsModule,
                form_field_1.MatFormFieldModule,
                progress_spinner_1.MatProgressSpinnerModule,
                dialog_1.MatDialogModule,
                list_1.MatListModule,
                toolbar_1.MatToolbarModule,
                sidenav_1.MatSidenavModule,
                datepicker_1.MatDatepickerModule,
                menu_1.MatMenuModule
            ],
            providers: [
                datepicker_1.MatDatepickerModule
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
