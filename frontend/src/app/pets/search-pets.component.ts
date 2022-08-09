import {Component, OnDestroy, OnInit} from '@angular/core';
import {PetsService} from "./pets.service";
import {ActivatedRoute} from "@angular/router";
import {LocationService} from "./location.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search-pets',
  template: `
    <div class="cont" fxLayout="row" fxLayoutAlign="center stretch">
      <form fxFlex="50%">
        <mat-form-field appearance="fill">
          <mat-label>Start searching for pets 🐶, 😺!</mat-label>
          <input matInput #input maxlength="50" placeholder="Ex. Terrier, Bichon Frise, Maltese">
          <button *ngIf="input.value" matSuffix mat-icon-button aria-label="C   lear" (click)="input.value=''">
            <mat-icon>close</mat-icon>
          </button>
          <mat-hint *ngIf="hasLocation">Looking for near your area</mat-hint>
          <button mat-icon-button color="primary" matSuffix mat-button [disabled]="hasLocation"
                  (click)="updateLocation()">
            <mat-icon>my_location</mat-icon>
          </button>
          <button mat-icon-button color="primary" matSuffix mat-button [routerLink]="['/pets', 'search']"
                  [queryParams]="{breed: input.value ? input.value : undefined,
                                  latitude: hasLocation ? loc.coords.latitude : undefined,
                                  longitude: hasLocation ? loc.coords.longitude : undefined,
                                  category: category.value ? category.value : undefined,
                                  size: size.value ? size.value : undefined,
                                  behaviors: behaviors.value ? behaviors.value : undefined,
                                  state: state.value ? state.value : undefined,
                                  zip_code: zip_code.value ? zip_code.value : undefined
                                  }">
            <mat-icon>search</mat-icon>
          </button>
        </mat-form-field>
        <mat-accordion class="filterDiv">
          <mat-expansion-panel hideToggle>
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon color="accent">filter_list</mat-icon>
                Advanced Filters
              </mat-panel-title>
              <mat-panel-description>
                Click for advanced search options
              </mat-panel-description>
            </mat-expansion-panel-header>
            <div class="filterGroupDiv" fxLayout="row wrap" fxLayoutAlign="start stretch">
              <mat-form-field appearance="fill">
                <mat-label>Category</mat-label>
                <mat-select #category placeholder="Ex. Dog">
                  <mat-option value="Dog">Dog</mat-option>
                  <mat-option value="Cat">Cat</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Size</mat-label>
                <mat-select #size>
                  <mat-option value="Small (0-25 lbs)">Small (0-25 lbs)</mat-option>
                  <mat-option value="Medium (26-60 lbs)">Medium (26-60 lbs)</mat-option>
                  <mat-option value="Large (61-100 lbs)">Large (61-100 lbs)</mat-option>
                  <mat-option value="Extra Large (101 lbs or more)">Extra Large (101 lbs or more)</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Behaviors</mat-label>
                <mat-select #behaviors>
                  <mat-option value="House-Trained">House-Trained</mat-option>
                  <mat-option value="Special Needs">Special Needs</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Zip Code</mat-label>
                <input matInput type="number" #zip_code placeholder="Ex. 52557" value="">
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>State</mat-label>
                <input matInput #state placeholder="Ex. California" value="">
              </mat-form-field>
            </div>
          </mat-expansion-panel>
        </mat-accordion>
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

      .filterDiv{
        padding: 10px 10px 0 10px;
      }

      .filterGroupDiv > * {
        flex: 1 0 30%;
        margin: 5px;
      }
    `
  ]
})
export class SearchPetsComponent implements OnInit, OnDestroy {
  hasLocation: boolean = false;
  loc: any = null;
  locSub!: Subscription;

  constructor(private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.locSub = this.locationService.location$.subscribe(location => {
      this.updateLocation();
      this.loc = location;
    })
  }

  updateLocation(): void {
    if (!this.hasLocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.locationService.location$.next({lat: position.coords.latitude, lng: position.coords.longitude});
        this.hasLocation = !!position;
        this.loc = position;
      });
    }
  }

  ngOnDestroy() {
    this.locSub.unsubscribe();
  }

}
