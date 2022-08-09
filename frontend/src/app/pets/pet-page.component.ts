import {Component, OnDestroy, OnInit} from '@angular/core';
import {PetsService} from "./pets.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {Pet} from "./PetInterface";

@Component({
  selector: 'app-pet-page',
  template: `
    <div class="petDiv" *ngIf="pet">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{pet.name}}</mat-card-title>
          <mat-card-subtitle>{{pet.breed}} • {{pet.size}} </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="petImgDivBg">
            <div class="petImgDiv">
              <ngx-slick-carousel class="carousel"
                                  #slickModal="slick-carousel"
                                  [config]="slideConfig">
                <div ngxSlickItem *ngFor="let image of pet.images" class="slide">
                  <img src="{{ image.src }}" alt="An image of {{pet.name}}" width="100%">
                </div>
              </ngx-slick-carousel>
            </div>
          </div>
          <h3>Biography</h3>
          <p>{{pet.bio}}</p>
          <hr>
          <div id="aboutGroup" fxLayout="column wrap" fxLayoutAlign="start" fxLayoutGap="10px grid">
            <div>
              <h3>Behaviors</h3>
              <p>{{pet.behaviors}}</p>
            </div>
            <div>
              <h3>Age</h3>
              <p>{{pet.age}}</p>
            </div>
            <div>
              <h3>Gender</h3>
              <p>{{pet.gender}}</p>
            </div>
            <div>
              <h3>Location</h3>
              <p>{{pet.state}}, {{pet.zip_code}}</p>
            </div>
          </div>
        </mat-card-content>
        <mat-card-footer>
          <div style="width: 100%" *ngIf="pet.location && pet.location.length > 0">
            <div style="width: 100%">
              <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                      [src]="mapsUrl() | safe">
              </iframe>
            </div>
          </div>
        </mat-card-footer>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .petImgDiv {
        width: 50%;
        margin: 0 auto;
      }

      .petImgDivBg {
        background: #1c1c1c;
      }

      mat-card {
        margin: 10px auto;
        padding: 20px;
        width: 90%;
      }

      h3 {
        text-weight: bold;
        margin: 0;
      }

      #mat-card-content h3, #mat-card-content p {
        margin: 0;
      }

      hr {
        display: block;
        border: 0;
        border-bottom: 1px solid #d2d1d3;
      }

    `
  ]
})
export class PetPageComponent implements OnInit, OnDestroy {
  slideConfig = {slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true, adaptiveHeight: true, arrows: true};

  querySub!: Subscription;
  petSub!: Subscription;
  params?: any;
  petId: string = '';
  pet!: Pet;

  constructor(private petService: PetsService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this.querySub = route.params.subscribe(
      (params: any) => {
        this.params = params;
        this.petId = params.petId;
      });
  }

  ngOnInit(): void {
    this.petSub = this.petService.getPet(this.petId).subscribe({
      next: (data: Pet) => {
        let newImages = [];
        let id = 0;
        for (const image of data.images) {
          newImages.push({src: image, id: id + ''});
          id++;
        }
        this.pet = data;
        this.pet.images = newImages;
      },
      error: (err: any) => {
        this._snackBar.open(err.error.message ? err.error.message : err.message, 'Dismiss', {
          duration: 2000,
        });
      }
    });
  }

  ngOnDestroy() {
    this.querySub.unsubscribe();
    this.petSub.unsubscribe();
  }

  mapsUrl(){
    let locationOne: string = this.pet.location![1].$numberDecimal;
    let locationTwo: string = this.pet.location![0].$numberDecimal;
    let url = 'https://maps.google.com/maps?width=100%25&height=600&hl=en&q='+locationOne+','+locationTwo+'&t=&z=14&ie=UTF8&iwloc=B&output=embed';
    return url;
  }

}
