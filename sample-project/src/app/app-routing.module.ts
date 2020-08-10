import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', component:  LoginComponent, pathMatch: 'full' },
  { path: 'my_player', component:  YoutubeComponent, canActivate: [AuthGuard]},
  // { path: '',   redirectTo: '/first-component', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
