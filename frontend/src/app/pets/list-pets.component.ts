import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pet} from "./PetInterface";
import {PetsService} from "./pets.service";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-pets',
  template: `
    <div class="container">
      <div class="grid" fxLayout="row wrap" fxLayoutAlign="center" fxLayoutGap="10px grid">
        <app-pet-card *ngFor="let pet of pets" [pet]="pet"></app-pet-card>
      </div>
    </div>
    <div class="loadMore" fxLayout="row" fxLayoutAlign="center">
      <mat-progress-bar *ngIf="skipping && !endOfList" mode="indeterminate"></mat-progress-bar>
      <button mat-raised-button color='primary' (click)="loadMore()" *ngIf="!skipping && !endOfList">Load more</button>
      <p *ngIf="endOfList">You have reached to the end of list 😔.</p>
    </div>
    <div class="spacer"></div>
  `,
  styles: [
    `
      .grid {
        margin: auto;
        width: calc(100% - 20px);
        padding: 20px;
      }
      .loadMore {
        margin-bottom: 10px;
      }
      .spacer {
        height: 20px;
      }
    `
  ]
})
export class ListPetsComponent implements OnInit, OnDestroy {
  querySub!: Subscription;
  petSub!: Subscription;
  qParams?: any;
  skipping: boolean = false;
  endOfList: boolean = false;
  skip: number = 0;
  pets: Array<Pet> = [];

  constructor(private petService: PetsService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
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
    this.petSub = this.petService.searchPets(this.qParams, this.skip).subscribe({
      next: (data: any) => {
        this.skipping = false;
        if (data && data.length > 0) {
          this.pets = this.pets.concat(data);
          this.skip = this.skip + 10;
        }else if(data && data.length === 0){
          this.endOfList = true;
        }
      },
      error: (err: any) => {
        this.skipping = false;
        this._snackBar.open(err.error.message ? err.error.message : err.message, 'Dismiss', {
          duration: 2000,
        });
      }
    });
  }

}
