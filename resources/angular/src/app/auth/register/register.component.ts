import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {GlobalClasses} from "../../shared/constants/Global-Classes";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {emailValidator} from "../../shared/validators/email.validator";
import {sameValueValidator} from "../../shared/validators/same-value.validator";
import {DarkLightModeService} from "../../core/services/dark-light-mode.service";
import {Store} from "@ngrx/store";
import {UserPageActions} from "../../Store/user-store/user-page.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  globalClasses = GlobalClasses;
  isDarkMode: boolean = this.darkModeService.isDarkModeEnabled();

  regForm = this.fb.group({
    username: ['', [Validators.required,Validators.minLength(3)]],
    email: ['', [Validators.required, emailValidator()]],
    pass: this.fb.group({

      password: ['', [Validators.required, Validators.minLength(8)]],
      rePassword: ['', [Validators.required, Validators.minLength(8)]],

    },{validators: [sameValueValidator("password","rePassword")]})
  })

  constructor(private titleService: Title,
              private darkModeService: DarkLightModeService,
              private fb: FormBuilder,
              private auth: AuthService,
              private store$: Store) {
    this.titleService.setTitle('Register - GoalsApp');
  }

  ngOnInit() {
  }

  registerHandler() {
    //TODO: show notification instead alerts!
    if (this.regForm.invalid) {
      alert("Invalid Form Fields!");
      return;
    }
    const regForm = this.regForm.value;
    this.store$.dispatch(UserPageActions.register({regForm}))
  }
}
