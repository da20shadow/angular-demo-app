import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import {GlobalClasses} from "../../shared/constants/Global-Classes";
import {Store} from "@ngrx/store";
import {UserPageActions} from "../../Store/user-store/user-page.actions";
import {DarkLightModeService} from "../../core/services/dark-light-mode.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  isDarkMode: boolean = this.darkModeService.isDarkModeEnabled();
  globalClasses = GlobalClasses;

  constructor(private titleService: Title,
              private darkModeService: DarkLightModeService,
              private store$: Store) {
    this.titleService.setTitle('Login - GoalsApp');
  }

  ngOnInit() {

  }

  loginHandler(loginForm: NgForm) {
    //TODO: show notification instead alerts!
    if(loginForm.invalid){
      alert("Invalid Credentials!");
      return;
    }
    const {email, password} = loginForm.value;
    this.store$.dispatch(UserPageActions.login({email, password}))
  }
}
