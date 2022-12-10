import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {GlobalClasses} from "../../shared/constants/Global-Classes";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  classes = GlobalClasses;

  constructor(private titleService: Title) {
    this.titleService.setTitle('404 Not Found - GoalsApp')
  }

}
