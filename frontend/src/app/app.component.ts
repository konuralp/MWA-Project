import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-top-bar></app-top-bar>
    <router-outlet></router-outlet>
<!--    <app-login-page></app-login-page>-->
  `,
  styles: [``],
})

export class AppComponent {
  title = 'PetBnB';
}
