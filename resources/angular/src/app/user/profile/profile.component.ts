import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {User} from "../../core/models";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: User|undefined;

  constructor(private title: Title,) {
    //TODO: add all site Titles in one constant or enum and use it!
    this.title.setTitle('Profile -Goals App');
  }

  ngOnInit(): void {
  }

}
