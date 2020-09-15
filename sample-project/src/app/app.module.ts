import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { YoutubeComponent } from './youtube/youtube.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule   } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignUpDialogComponent } from './login/sign-up-dialog/sign-up-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ListComponent } from './list/list.component';
import { MainComponent } from './main/main.component';
import { MainChartComponent } from './main/main-chart/main-chart.component';
import { NewsComponent } from './main/news/news.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import { ScheduleComponent } from './schedule/schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interaction from '@fullcalendar/interaction';
import {MatTableModule} from '@angular/material/table';
import { ScheduleDialogComponent } from './schedule/schedule-dialog/schedule-dialog.component';
import { QnAComponent } from './qn-a/qn-a.component';
import { MemberPageComponent } from './member-page/member-page.component'; // a plugin
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { MemberPageDialogComponent } from './member-page/member-page-dialog/member-page-dialog.component';
import { NavComponent } from './nav/nav.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ProductPageComponent } from './product-page/product-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProductPageDialogComponent } from './product-page/product-page-dialog/product-page-dialog.component';
import { ProductPipe } from './shard/pipe/product.pipe';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ConfirmComponent } from './shard/dialog/confirm/confirm.component';
import { MainSettingPageComponent } from './main-setting-page/main-setting-page.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CategoryComponent } from './main-setting-page/site-basic-setting/category/category.component';
import { NoticeComponent } from './notice/notice.component';
import { SiteBasicSettingComponent } from './main-setting-page/site-basic-setting/site-basic-setting.component';
import { EventComponent } from './main-setting-page/event/event.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin, interaction
]);

@NgModule({
  declarations: [
    AppComponent,
    YoutubeComponent,
    PlayerListComponent,
    LoginComponent,
    SignUpDialogComponent,
    ListComponent,
    MainComponent,
    MainChartComponent,
    NewsComponent,
    ScheduleComponent,
    ScheduleDialogComponent,
    QnAComponent,
    MemberPageComponent,
    MemberPageDialogComponent,
    NavComponent,
    ProductPageComponent,
    ProductPageDialogComponent,
    ProductPipe,
    ConfirmComponent,
    MainSettingPageComponent,
    AnalyticsComponent,
    CategoryComponent,
    NoticeComponent,
    SiteBasicSettingComponent,
    EventComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatNativeDateModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatIconModule,
    MatStepperModule,
    FullCalendarModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDialogModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatMenuModule,
    MatBadgeModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
