import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class NoAccessComponent {

  constructor(private titleService: Title) {
    this.titleService.setTitle('No Access - GoalsApp')
  }

}
