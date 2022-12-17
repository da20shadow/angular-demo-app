import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  // isLogged: boolean = this.auth.isLoggedIn();

  constructor(private titleService: Title,
              // private auth: AuthService,
              private route: Router) {
    this.titleService.setTitle('Home - GoalsApp')

  }

  ngOnInit() {
    // this.route.events.subscribe(event => {
    //   if (event.constructor.name === "NavigationEnd") {
    //     this.isLogged = this.auth.isLoggedIn();
    //   }
    // })
  }

}
