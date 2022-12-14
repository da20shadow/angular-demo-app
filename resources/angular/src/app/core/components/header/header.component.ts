import { Component } from '@angular/core';
import {DarkLightModeService} from "../../services/dark-light-mode.service";
import {GlobalClasses} from "../../../shared/constants/Global-Classes";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {userSelectors} from "../../../Store/app.state";
import {UserPageActions} from "../../../Store/user-store/user-page.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  classes = GlobalClasses;
  isLoggedIn$: Observable<boolean>;

  constructor(private darkModeService: DarkLightModeService,
              private store$: Store) {
    this.store$.dispatch(UserPageActions.loginCheck());
    this.isLoggedIn$ = this.store$.select(userSelectors.isLoggedIn);
    this.darkModeService.checkUserPreferredMode();
  }



}
