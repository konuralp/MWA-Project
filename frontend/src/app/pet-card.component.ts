import {Component, Input, OnInit} from '@angular/core';
import {Pet} from "./PetInterface";

@Component({
  selector: 'app-pet-card',
  template: `
    <mat-card class="pet-card" *ngIf="pet">
      <mat-card-header>
<!--        <div mat-card-avatar class="pet-header-image"></div>-->
        <mat-card-title>{{pet.name}}</mat-card-title>
        <mat-card-subtitle>{{pet.category}}</mat-card-subtitle>
      </mat-card-header>
      <img mat-card-image src="{{pet.images[0]}}" alt="Photo of {{pet.name}}">
      <mat-card-content>
        <p>
          {{(pet.bio | slice:0:50)+'...'}}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button>LIKE</button>
        <button mat-raised-button>SHARE</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `.pet-card {
      max-width: 400px;
    }
    `
  ]
})
export class PetCardComponent implements OnInit {
  @Input() pet?: Pet;

  constructor() { }

  ngOnInit(): void {
  }

}
