import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-bar',
  template: `
    <mat-toolbar color="primary">
      <div class="logo" [routerLink]="['']">
        <mat-icon>pets</mat-icon>
        <span class="brandName">PetBnB</span>
      </div>
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
  `
  ]
})
export class TopBarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
