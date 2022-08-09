import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {PetsService} from "./pets.service";
import {Pet} from "./PetInterface";

@Component({
  selector: 'app-pet-add-page',
  template: `
    <mat-stepper orientation="vertical" [linear]="false" #stepper>
      <mat-step [stepControl]="nameFormGroup">
        <form [formGroup]="nameFormGroup">
          <ng-template matStepLabel>Fill out your pet's name</ng-template>
          <mat-form-field appearance="fill">
            <mat-label>Pet Name</mat-label>
            <input matInput placeholder="Ex. Simba" formControlName="name" required>
          </mat-form-field>
          <div>
            <button mat-button matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step [stepControl]="bioFormGroup">
        <form [formGroup]="bioFormGroup">
          <ng-template matStepLabel>Fill out short bio of your pet</ng-template>
          <mat-form-field appearance="fill">
            <mat-label>Short Bio</mat-label>
            <textarea matInput formControlName="bio"
                      placeholder="Ex. Likes to sleep a lot, best friend a human can have."
                      required>
            </textarea>
          </mat-form-field>
          <div>
            <button mat-button matStepperPrevious>Back</button>
            <button mat-button matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step [stepControl]="aboutPetFormGroup">
        <form [formGroup]="aboutPetFormGroup">
          <ng-template matStepLabel>Fill out details</ng-template>
          <mat-form-field appearance="fill">
            <mat-label>Category</mat-label>
            <input matInput formControlName="category" placeholder="Ex. Dog"
                   required>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Breed</mat-label>
            <input matInput formControlName="breed" placeholder="Ex. Pomeranian"
                   required>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Gender</mat-label>
            <mat-select formControlName="gender" required>
              <mat-option value="M">Male</mat-option>
              <mat-option value="F">Female</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Age</mat-label>
            <input matInput type="number" formControlName="age" placeholder="Ex. 1"
                   required>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Size</mat-label>
            <mat-select formControlName="size" required>
              <mat-option value="Small (0-25 lbs)">Small (0-25 lbs)</mat-option>
              <mat-option value="Medium (26-60 lbs)">Medium (26-60 lbs)</mat-option>
              <mat-option value="Large (61-100 lbs)">Large (61-100 lbs)</mat-option>
              <mat-option value="Extra Large (101 lbs or more)">Extra Large (101 lbs or more)</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Behaviors</mat-label>
            <mat-select formControlName="behaviors" required>
              <mat-option value="House-Trained">House-Trained</mat-option>
              <mat-option value="Special Needs">Special Needs</mat-option>
            </mat-select>
          </mat-form-field>
          <div>
            <button mat-button matStepperPrevious>Back</button>
            <button mat-button matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step [stepControl]="addressFormGroup">
        <form [formGroup]="addressFormGroup">
          <ng-template matStepLabel>Fill out short bio of your pet</ng-template>
          <mat-form-field appearance="fill">
            <mat-label>Zipcode</mat-label>
            <input matInput type="number" formControlName="zip_code" placeholder="Ex. 94043"
                   required>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>State</mat-label>
            <mat-select formControlName="state" placeholder="Ex. California"
                        required>
              <mat-option *ngFor="let state of usaStateNames" [value]="state">{{state}}</mat-option>
            </mat-select>
          </mat-form-field>
          <div>
            <button mat-button matStepperPrevious>Back</button>
            <button mat-button matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step [stepControl]="imagesFormGroup">
        <form [formGroup]="imagesFormGroup">
          <ng-template matStepLabel>Upload some pictures</ng-template>
          <p>You are almost done, upload some pictures and post it.</p>
          <mat-form-field appearance="fill">
            <mat-label>Cover Image</mat-label>
            <ngx-mat-file-input formControlName="image1" [accept]="'image/*'" required (change)="fileChanged($event, 1)"
                                multiple></ngx-mat-file-input>
            <mat-icon matSuffix>folder</mat-icon>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Additional Image 1</mat-label>
            <ngx-mat-file-input formControlName="image2" [accept]="'image/*'"
                                (change)="fileChanged($event, 2)"></ngx-mat-file-input>
            <mat-icon matSuffix>folder</mat-icon>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Additional Image 2</mat-label>
            <ngx-mat-file-input formControlName="image3" [accept]="'image/*'"
                                (change)="fileChanged($event, 3)"></ngx-mat-file-input>
            <mat-icon matSuffix>folder</mat-icon>
          </mat-form-field>
          <div>
            <button mat-button matStepperPrevious>Back</button>
            <button mat-button matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Done</ng-template>
        <p>You are almost finished, click submit to publish.</p>
        <div>
          <button mat-button matStepperPrevious>Back</button>
          <button *ngIf="!submitting" mat-button (click)="addPet()">Submit</button>
          <mat-progress-bar mode="indeterminate" *ngIf="submitting"></mat-progress-bar>
        </div>
      </mat-step>
    </mat-stepper>
  `,
  styles: [
    `
      mat-form-field {
        width: 33%;
        padding: 10px;
      }

      textarea {
        height: 150px;
      }
    `
  ]
})
export class PetAddPageComponent implements OnInit {
  submitting: boolean = false;
  usaStateNames = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  nameFormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });
  bioFormGroup = this.fb.group({
    bio: ['', [Validators.required, Validators.minLength(6)]],
  });
  hide = true;
  aboutPetFormGroup = this.fb.group({
    category: ['', Validators.required],
    breed: ['', Validators.required],
    gender: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(0)]],
    size: ['', Validators.required],
    behaviors: ['', Validators.required],
  });
  addressFormGroup = this.fb.group({
    zip_code: [null, [Validators.required, Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/)]],
    state: ['', Validators.required],
  });
  imagesFormGroup = this.fb.group({
    image1: [null, [Validators.required]],
    image2: [null],
    image3: [null],
  });
  images: any[] = [null, null, null];

  constructor(private fb: FormBuilder, private petsService: PetsService,
              private _snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }

  addPet() {
    this.submitting = true;
    let images = this.images.filter(image => image !== null && image !== undefined);
    let pet = {
      name: this.nameFormGroup.value.name as string,
      bio: this.bioFormGroup.value.bio as string,
      category: this.aboutPetFormGroup.value.category as string,
      breed: this.aboutPetFormGroup.value.breed as string,
      gender: this.aboutPetFormGroup.value.gender as string,
      age: this.aboutPetFormGroup.value.age as number,
      size: this.aboutPetFormGroup.value.size as string,
      behaviors: this.aboutPetFormGroup.value.behaviors as string,
      zip_code: this.addressFormGroup.value.zip_code! as string,
      state: this.addressFormGroup.value.state as string,
      available: true,
      latitude: 1.234234 as number,
      longitude: 1.234234 as number,
    } as Pet;
    const fd = new FormData();
    for (let image of images) {
      fd.append('image', image as File);
    }
    fd.append('pet', JSON.stringify(pet));

    this.petsService.addPet(fd).subscribe({
      next: (res: any) => {
        this._snackBar.open('Pet post has been added successfully', '', {
          duration: 2000,
        });
        this.router.navigate(['/pets']);
        this.submitting = false;
      },
      error: err => {
        this._snackBar.open('Error: ' + err.message, '', {
          duration: 2000,
        });
        this.submitting = false;
      }
    });

  }

  fileChanged(event: any, index: number) {
    const file: File = event.target.files[0];
    this.images[index - 1] = file;
  }

}
