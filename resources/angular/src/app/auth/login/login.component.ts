import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import {GlobalClasses} from "../../shared/constants/Global-Classes";
import {DarkLightModeService} from "../../core/services/dark-light-mode.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  globalClasses = GlobalClasses;
  isDarkMode: boolean = this.darkModeService.isDarkModeEnabled();

  constructor(private titleService: Title,
              private route: Router,
              private authService: AuthService,
              private darkModeService: DarkLightModeService) {
    this.titleService.setTitle('Login - GoalsApp')
  }

  loginHandler(loginForm: NgForm) {
    //TODO: show notification instead alert!
    if(loginForm.invalid){
      alert("Invalid Credentials!");
      return;
    }

    const {email, password} = loginForm.value;
    this.authService.login(email, password).subscribe({
      next: data => {
        this.route.navigate(['profile'])
      },
      error: (err) => {
        console.log('err',err)
        console.log('error message: ', err.error.message);
      }
    });
  }
}
