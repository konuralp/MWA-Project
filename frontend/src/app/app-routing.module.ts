import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchPageComponent} from "./search-page.component";
import {MainPageComponent} from "./main-page.component";

const routes: Routes = [
  {path: 'search', component: SearchPageComponent},
  {path: '', component: MainPageComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
