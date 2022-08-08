import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pet} from "./PetInterface";
import {PetsService} from "./pets.service";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-pets',
  template: `
    <div class="grid" fxLayout="row wrap" fxLayoutAlign="center stretch" fxLayoutGap="10px grid">
      <app-pet-card *ngFor="let pet of pets" [pet]="pet"></app-pet-card>
    </div>
    <div fxLayout="row" fxLayoutAlign="center">
      <button mat-raised-button (click)="loadMore()" [hidden]="!skipping">Load more</button>
    </div>
  `,
  styles: [
    `
      .grid {
        padding: 10px;
      }
    `
  ]
})
export class ListPetsComponent implements OnInit, OnDestroy {
  querySub!: Subscription;
  petSub!: Subscription;
  qParams?: any;
  skipping: boolean = false;
  skip: number = 0;
  pets: Array<Pet> = [];

  constructor(private petService: PetsService, private route: ActivatedRoute) {
    this.querySub = route.queryParams.subscribe(
      (params: any) => {
        this.qParams = params;
        this.skip = params.skip ? params.skip : 0;
      });
  }

  ngOnInit(): void {
    this.loadMore();
  }

  ngOnDestroy() {
    this.querySub.unsubscribe();
    this.petSub.unsubscribe();
  }

  loadMore() {
    this.skipping = true;
    this.petSub = this.petService.searchPets(this.qParams.breed, this.skip).subscribe(
      (data: any) => {
        this.skipping = false;
        console.log(data);
        if(data && data.length > 0) {
          this.pets = this.pets.concat(data);
          this.skip = this.skip + 10;
        }
      }
    );
  }

}
