import { Component } from '@angular/core';
import {DarkLightModeService} from "../../../../services/dark-light-mode.service";
import {navBar} from "../../../../data/nav-links";

@Component({
  selector: 'app-public-navigation',
  templateUrl: './public-navigation.component.html',
  styleUrls: ['./public-navigation.component.scss']
})
export class PublicNavigationComponent {
  darkMode!: boolean;
  publicNavLinks = navBar.publicNavLinks;

  constructor(private darkModeService: DarkLightModeService) {
    this.darkMode = this.darkModeService.checkUserPreferredMode();
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
