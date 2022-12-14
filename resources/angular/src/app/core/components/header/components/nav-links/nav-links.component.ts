import {Component, Input} from '@angular/core';
import {GlobalClasses} from "../../../../../shared/constants/Global-Classes";

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss']
})
export class NavLinksComponent {
  classes = GlobalClasses;
  @Input()
  navLinks: any;

}
