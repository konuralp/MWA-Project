import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ListPetsComponent } from './pets/list-pets.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { PetCardComponent } from './pets/pet-card.component';
import {MatCardModule} from "@angular/material/card";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from "@angular/material/button";
import { SearchPetsComponent } from './pets/search-pets.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { SearchPageComponent } from './pets/search-page.component';
import { MainPageComponent } from './pets/main-page.component';
import { LoginPageComponent } from './login-page.component';
import { TopBarComponent } from './top-bar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import { SignupPageComponent } from './signup-page.component';
import {AttachTokenInterceptor} from "./attach-token.interceptor";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { BottomBarComponent } from './bottom-bar.component';
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TopBarComponent,
    SignupPageComponent,
    BottomBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AttachTokenInterceptor, multi: true}],
  exports: [
    TopBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
