// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppComponent } from './app.component';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ApiService } from './shared/api.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
// import { RegistrationComponent } from './registration/registration.component';
// import { RecoverComponent } from './recover/recover.component';
import { MenuComponent } from './menu/menu.component';
// import { HowComponent } from './how/how.component';
// import { FavourComponent } from './favour/favour.component';
// import { AskComponent } from './ask/ask.component';
// import { AnswerComponent } from './answer/answer.component';
// import { ProfileNewComponent } from './profile-new/profile-new.component';

import { MustStartWithZeroDirective } from './shared/start-with-zero.directive';
import { BeANumberDirective } from './shared/be-a-number.directive';
import { AppPasswordDirective } from './shared/app-password.directive';
import { ContentComponent } from './content/content.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    // RegistrationComponent,
    // RecoverComponent,
     MenuComponent,
    // HowComponent,
    // FavourComponent,
    // AskComponent,
    // AnswerComponent,
    // ProfileNewComponent
    MustStartWithZeroDirective,
    BeANumberDirective,
    AppPasswordDirective,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
