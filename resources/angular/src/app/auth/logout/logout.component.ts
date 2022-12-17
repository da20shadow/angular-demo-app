import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {UserPageActions} from "../../Store/user-store/user-page.actions";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private store$: Store) {
    this.store$.dispatch(UserPageActions.logout());
  }

}
