import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoticeComponent } from './notice/notice.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './main/main.component';
import { MemberPageComponent } from './member-page/member-page.component';
import { NavComponent } from './nav/nav.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AnalyticsComponent  } from './analytics/analytics.component';
import { MainSettingPageComponent } from './main-setting-page/main-setting-page.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard],
  },
  {
    path: 'main-setting', component: MainSettingPageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'member_management', component: MemberPageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'nav', component: NavComponent, canActivate: [AuthGuard],
  },
  {
    path: 'nav', component: NavComponent, canActivate: [AuthGuard],
  },
  {
    path: 'product_management/:category_num', component: ProductPageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard],
  },
  { path: 'notice-management', component: NoticeComponent, canActivate: [AuthGuard] }
  // { path: '',   redirectTo: '/first-component', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
