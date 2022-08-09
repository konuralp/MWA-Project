import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <app-top-bar></app-top-bar>
    <router-outlet></router-outlet>
    <app-bottom-bar></app-bottom-bar>
  `,
  styles: [``],
})

export class AppComponent {
  title = 'PetShelter';

  constructor(private userService: UserService, private router: Router) {
    this.userService.refreshState();
    const userState = this.userService.getUserState();
    if(userState?.user_id){
      this.router.navigate(['/pets']);
    }else{
      this.router.navigate(['/login']);
    }
  }


}
