import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../../auth/services/auth.service";

export const isLoggedInGuardFn: CanActivateFn = () => {
  const router = inject(Router);
  const isLogged = inject(AuthService).isLoggedIn();
  if (!isLogged){
    router.navigate(['no-access']);
  }
  return isLogged;
}
