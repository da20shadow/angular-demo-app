import { Component } from '@angular/core';
import {DarkLightModeService} from "../../../../services/dark-light-mode.service";

@Component({
  selector: 'app-private-navigation',
  templateUrl: './private-navigation.component.html',
  styleUrls: ['./private-navigation.component.scss']
})
export class PrivateNavigationComponent {
  darkMode!: boolean;
  privateNavLinks: any = [
    {url: 'dashboard', name: 'Dashboard'},
    {url: 'profile', name: 'Profile'},
    {url: 'edit-profile', name: 'Profile'},
    {url: 'goals', name: 'Goals'},
    {url: 'logout', name: 'Logout'},

  ];


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
