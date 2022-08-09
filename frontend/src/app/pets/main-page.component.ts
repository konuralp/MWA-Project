import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  template: `
    <app-search-pets></app-search-pets>
  `,
  styles: [
  ]
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
