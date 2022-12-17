import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions,createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../auth/services/auth.service";
import {UserPageActions} from "./user-page.actions";
import {catchError, from, map, of, switchMap} from "rxjs";
import {UserApiActions} from "./user-api.actions";
import {Router} from "@angular/router";
import {NotificationService} from "../../core/services/notification.service";

@Injectable()
export class UserApiEffects {
  constructor(private userService: AuthService,
              private router: Router,
              private notificationService: NotificationService,
              private store$: Store,
              private actions$: Actions) {
  }

  loginCheck$ = createEffect(() => this.actions$.pipe(
    ofType(UserPageActions.loginCheck),

    switchMap(() =>
      from(this.userService.isLoggedIn()).pipe(
        map((isLogged) => {
          if (isLogged){
            return UserPageActions.loginCheckSuccess()
          }else {
            return UserPageActions.loginCheckFailure({error:'You are not logged int!'})
          }
        }),
      ))
  ));

  get$ = createEffect(()=> this.actions$.pipe(
    ofType(UserPageActions.getProfile),
    switchMap(() =>
      from(this.userService.isLoggedIn()).pipe(
      map((isLogged) => UserPageActions.loadProfile({isLogged})),
      catchError((error) => of(UserApiActions.loadProfileFailure({error})))
    ))
  ));

  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(UserPageActions.loadProfile),
    switchMap((action) =>
      from(this.userService.getUser()).pipe(
        map((response) => UserApiActions.getProfileSuccess({response}))
      ))
  ));

  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserPageActions.login),
    switchMap((action) =>
      from(this.userService.login(action.email,action.password)).pipe(
        map((response) => {
          this.notificationService.showSuccessNotification('Successfully Logged In!')
          this.router.navigate(['dashboard']);
          return UserApiActions.loginSuccess({response})
        }),
        catchError((error) => {
          this.notificationService.showErrorNotification(error.error.message);
          return of(UserApiActions.loginFailure({error}))
        })
      ))
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserPageActions.logout),
    switchMap(() =>
      from(this.userService.logout()).pipe(
        map((response) => {
          this.router.navigate(['login']);
          return UserApiActions.logoutSuccess({response})
        }),
        catchError((error) => of(UserApiActions.logoutFailure({error})))
      ))
  ))

  register$ = createEffect(() => this.actions$.pipe(
    ofType(UserPageActions.register),
    switchMap((action) =>
      from(this.userService.register(action.regForm)).pipe(
        map((response) => {
          this.notificationService.showSuccessNotification('Successfully Registered!')
          this.router.navigate(['dashboard'])
          return UserApiActions.registerSuccess({response})
        }),
        catchError((error) => {
          this.notificationService.showErrorNotification(error.error.message);
          return of(UserApiActions.registerFailure({error}))
        })
      ))
  ));

  editProfile$ = createEffect(() => this.actions$.pipe(
    ofType(UserPageActions.editProfile),
    switchMap((action) =>
      from(this.userService.updateProfile(action.user)).pipe(
        map((response) => UserApiActions.editProfileSuccess({response})),
        catchError((error) => of(UserApiActions.editProfileFailure({error})))
      ))
  ));

  deleteProfile$ = createEffect(() => this.actions$.pipe(
    ofType(UserPageActions.deleteAccount),
    switchMap(() =>
      from(this.userService.deleteAccount()).pipe(
        map(() => {
          this.router.navigate(['home']);
          return UserApiActions.deleteSuccess()
        }),
        catchError((error) => of(UserApiActions.deleteFailure({error})))
      ))
  ));

}
