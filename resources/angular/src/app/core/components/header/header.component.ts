import { Component } from '@angular/core';
import {navBar} from "../../data/nav-links";
import {DarkLightModeService} from "../../services/dark-light-mode.service";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {GlobalClasses} from "../../../shared/constants/Global-Classes";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  classes = GlobalClasses;
  isLogged!: boolean;
  darkMode!: boolean;
  navbar: any = [];


  constructor(private darkModeService: DarkLightModeService,
              private route: Router,
              private auth: AuthService) {
    this.isLogged = this.auth.isLoggedIn();
    this.changeNavigation();
    this.darkMode = this.darkModeService.checkUserPreferredMode();
  }

  ngOnInit() {
    this.route.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isLogged = this.auth.isLoggedIn();
        this.changeNavigation();
      }
    })
  }

  changeNavigation(){
    if (this.isLogged){
      this.navbar = navBar.privateNavLinks;
    }else {
      this.navbar = navBar.publicNavLinks;
    }
  }

  toggleDarkMode() {
    if (this.darkMode){
      this.darkModeService.enableLightTheme()
      this.darkMode = false;
    }else{
      this.darkModeService.enableDarkTheme()
      this.darkMode = true;
    }
  }
}
