import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  template: `
    <app-search-pets></app-search-pets>
    <app-list-pets></app-list-pets>
  `,
  styles: [
  ]
})
export class SearchPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
