import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {GlobalClasses} from "../../shared/constants/Global-Classes";
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {emailValidator} from "../../shared/validators/email.validator";
import {sameValueValidator} from "../../shared/validators/same-value.validator";
import {DarkLightModeService} from "../../core/services/dark-light-mode.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

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
              private fb: FormBuilder,
              private darkModeService: DarkLightModeService,
              private auth: AuthService) {
    this.titleService.setTitle('Register - GoalsApp')
  }

  registerHandler() {
    //TODO: show notification instead alert!
    if (this.regForm.invalid) {
      alert("Invalid Form Fields!");
      return;
    }
    this.auth.register(this.regForm.value).subscribe({
      next: value => {
        console.log('Success: ',value)
        alert(value)
      },
      error: (err) => {
        console.log('err' + err)
        alert('Error: ' + err.error.message)
        console.log('Error: ',err.error.message)
      }
    });

  }
}
