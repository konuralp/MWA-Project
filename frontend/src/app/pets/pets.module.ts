import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListPetsComponent} from "./list-pets.component";
import {PetCardComponent} from "./pet-card.component";
import {SearchPetsComponent} from "./search-pets.component";
import {SearchPageComponent} from "./search-page.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MainPageComponent} from "./main-page.component";
import {RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { PetAddPageComponent } from './pet-add-page.component';
import {MatStepperModule} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";



@NgModule({
  declarations: [
    MainPageComponent,
    ListPetsComponent,
    PetCardComponent,
    SearchPetsComponent,
    SearchPageComponent,
    PetAddPageComponent,
  ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        FlexLayoutModule,
        MatButtonModule,
        MatSnackBarModule,
        RouterModule.forChild([
            {path: '', component: MainPageComponent},
            {path: 'search', component: SearchPageComponent},
            {path: 'add', component: PetAddPageComponent},
        ]),
        MatInputModule,
        MatStepperModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatAutocompleteModule,
        MaterialFileInputModule,
        MatProgressBarModule,
    ]
})
export class PetsModule { }
