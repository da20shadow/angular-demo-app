import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrls} from "../../shared/constants/api-urls";
import {tap} from "rxjs";
import {UserApiResponse, User, UserRegistration} from "../../core/models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    return this.http.post<UserApiResponse>(ApiUrls.LOGIN, {email, password});
  }

  logout(){
    return this.http.post<UserApiResponse>(ApiUrls.LOGOUT, {}).pipe(
      tap(r =>
        this.removeToken()
      )
    );
  }

  async isLoggedIn(): Promise<boolean>{
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

    const regFormData: UserRegistration = {
      username,
      email,
      password,
      password_confirmation: rePassword
    }

    return this.http.post<UserApiResponse>(ApiUrls.REGISTER,regFormData);
  }

  saveUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.http.get<UserApiResponse>(ApiUrls.PROFILE);
  }

  updateProfile(user: User) {
    return this.http.patch<UserApiResponse>(ApiUrls.PROFILE_UPDATE,user);
  }

  deleteAccount() {
    return this.http.delete<UserApiResponse>(ApiUrls.PROFILE_DELETE);
  }
}
