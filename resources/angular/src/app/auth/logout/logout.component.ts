import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private auth: AuthService,private route: Router) {
    this.auth.logout().subscribe({
      next: (data) => {
        console.log(data)
        this.route.navigate(['login']);
      },
      error: (err) => {
        console.log(err)
        alert('An Error occur please try again!')
      }
    });
  }

}
