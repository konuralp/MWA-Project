import {Component, OnInit} from '@angular/core';
import {PetsService} from "./pets.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-pets',
  template: `
    <div class="cont" fxLayout="row" fxLayoutAlign="center stretch">
      <form fxFlex="50%">
        <mat-form-field appearance="fill">
          <mat-label>Start searching for pets 🐶, 😺!</mat-label>
          <input matInput #input maxlength="50" placeholder="Ex. Terrier, Bichon Frise, Maltese">
          <button mat-icon-button color="primary" matSuffix mat-button [routerLink]="['/search']" [queryParams]="{breed: input.value ? input.value : undefined}">
            <mat-icon>search</mat-icon>
          </button>
        </mat-form-field>
      </form>
    </div>
  `,
  styles: [
    `
      .cont {
        padding: 10px 10px 0 10px;
      }

      mat-form-field {
        width: 100%;
      }

    `
  ]
})
export class SearchPetsComponent implements OnInit {

  constructor(private petService: PetsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
