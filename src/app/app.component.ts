import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import * as Global from './shared/global';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'favour-right';
  loggedIn = false;
  // loggedIn = true;
  showLogin = true;
  showRegistration = false;
  showRecover = false;
  showMenu = 'how';

  ngOnInit(): void {
    this.apiService.setLoginUser(null);
    console.log('AppComp Load ');

    this.apiService.doStartup().subscribe((result) => {
      console.log(' doStartup ');
      console.log(result);
      Global.setCirclesData(result);
    });

  }

  constructor( private apiService: ApiService
    ) { }

  authEvent(eventValue: string) {
    this.showLogin = false;
    this.showRegistration = false;
    this.showRecover = false;
    switch (eventValue) {
      // case 'login_success':  this.loggedIn = true; break;
      case 'otp_success':  this.loggedIn = true; break;
      case 'register_success':  this.loggedIn = true; break;
      case 'recover_success':  this.loggedIn = true; break;
      case 'register':  this.showRegistration = true; break;
      case 'recover':  this.showRecover = true; break;
      case 'login':  this.showLogin = true; break;
    }

  }

  menuProcessEvent(eventVale: string) {
    console.log(' event ' + eventVale);
    this.showMenu = eventVale;
  }
}
