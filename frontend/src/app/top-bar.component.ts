import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-top-bar',
  template: `
    <mat-toolbar color="primary">
      <div class="logo" [routerLink]="['/']">
        <mat-icon>pets</mat-icon>
        <span class="brandName">PetShelter</span>
      </div>
      <span class="spacer"></span>
      <p *ngIf="isLoggedIn">Welcome, {{fullName}}</p>
      <span class="spacer"></span>
      <button mat-raised-button (click)="logout()" *ngIf="isLoggedIn">Logout</button>
    </mat-toolbar>
  `,
  styles: [`
    .logo {
      cursor: pointer;
    }

    .brandName {
      font-family: 'Pacifico', cursive;
      font-weight: bold;
      margin-left: 5px;
    }

    .spacer {
      flex: 1 1 auto;
    }

  `
  ]
})
export class TopBarComponent implements OnInit, OnDestroy {
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

  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
