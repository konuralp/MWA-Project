import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./pets/main-page.component";
import {LoginPageComponent} from "./login-page.component";
import {CheckTokenGuard} from "./check-token.guard";
import {SignupPageComponent} from "./signup-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'pets', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {
    path: 'pets',
    loadChildren: () => import('./pets/pets.module').then(m => m.PetsModule),
    canActivate: [CheckTokenGuard]
  },
  {path: '**', redirectTo: 'pets'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
