import {Component, Input, OnInit} from '@angular/core';
import {Pet} from "./PetInterface";

@Component({
  selector: 'app-pet-card',
  template: `
    <mat-card class="pet-card" *ngIf="pet" [routerLink]="['/pets', pet._id]">
      <mat-card-header>
<!--        <div mat-card-avatar class="pet-header-image"></div>-->
        <mat-card-title>{{pet.name}}</mat-card-title>
        <mat-card-subtitle>{{pet.category}} - {{pet.breed}}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <img mat-card-image src="{{pet.images[0]}}" alt="Photo of {{pet.name}}">
        <p>
          {{(pet.bio | slice:0:100)+'...'}}
        </p>
      </mat-card-content>
      <mat-card-actions>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      img, .mat-card-image{
        width: 300px;
        height: 300px;
        object-fit: cover;
        margin: 0px !important;
      }

      .mat-card-content{
        width: 300px;
        height: 350px;
      }

      .pet-card{
        cursor: pointer;
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
