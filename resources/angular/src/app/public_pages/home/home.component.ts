import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {GlobalClasses} from "../../shared/constants/Global-Classes";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  classes = GlobalClasses;
  constructor(private titleService: Title) {
    this.titleService.setTitle('Home - GoalsApp')
  }

}
