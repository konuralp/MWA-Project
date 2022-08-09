import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  template: `
    <img id="headImg" src="https://images.unsplash.com/photo-1560743173-567a3b5658b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80" alt="Header Image"/>
    <app-search-pets></app-search-pets>
  `,
  styles: [
      `
        #headImg {
          object-fit: cover;
          height: calc(100% - 64px);
          width: 100%;
          position: absolute;
        }
      `
  ]
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
