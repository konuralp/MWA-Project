import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bottom-bar',
  template: `
    <div class="fab-button-container" matTooltip="Post a pet for adoption" [routerLink]="['/pets', 'add']">
      <button mat-fab color="accent" aria-label="Post pet for adoption">
        <mat-icon>add</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      .fab-button-container {
        position: fixed;
        bottom: 2%;
        right: 2%;
      }
    `
  ]
})
export class BottomBarComponent implements OnInit {
  fullName: string = '';
  isLoggedIn: boolean = false;
  userLoggedInSub!: Subscription;

  constructor(public userService: UserService, private router: Router) {
    this.userLoggedInSub = this.userService.userState$.subscribe((userState) => {
      this.isLoggedIn = !!userState.token;
      if(this.isLoggedIn){
        this.fullName = this.userService.getUserState()?.full_name as string;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.userLoggedInSub.unsubscribe();
  }

}
