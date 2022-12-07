import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  constructor(private titleService: Title) {
    this.titleService.setTitle('FAQ - GoalsApp')
  }

}
