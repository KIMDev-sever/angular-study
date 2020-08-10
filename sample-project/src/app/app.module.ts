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
import { DialogComponent } from './shard/dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule   } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignUpDialogComponent } from './login/sign-up-dialog/sign-up-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    YoutubeComponent,
    PlayerListComponent,
    DialogComponent,
    LoginComponent,
    SignUpDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
