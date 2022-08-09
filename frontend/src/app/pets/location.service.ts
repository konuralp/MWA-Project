import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  location$ = new BehaviorSubject<{ lat: number, lng: number }>({ lat: 0, lng: 0 });

  constructor() { }

  getLocation() {
    return this.location$.asObservable();
  }
}
