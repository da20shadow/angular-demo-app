import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrls} from "../../shared/constants/api-urls";
import {User} from "../../core/models/User";
import {Router} from "@angular/router";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    return this.http.post<User>(ApiUrls.LOGIN, {email, password});
  }

  logout(){
    return this.http.post(ApiUrls.LOGOUT, {}).pipe(
      tap(r =>
        this.removeToken()
      )
    );
  }

  isLoggedIn(){
    return !!this.getToken();
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token ? token : undefined;
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  register(regForm: any) {

    const {username,email,pass} = regForm;
    const {password,rePassword} = pass;

    return this.http.post(ApiUrls.REGISTER,{
      username,
      email,
      password,
      password_confirmation: rePassword
    });
  }
}
