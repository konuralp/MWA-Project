import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../appSettings";
import {Pet} from "./PetInterface";

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private http: HttpClient) {}

  searchPets(breed?: string, skip?: number) {
    return this.http.get<Array<Pet>>(AppSettings.BASE_API_URL + 'pets/search'+(skip ? "?skip=" + skip : "") + (breed ? "?breed=" + breed : ""));
  }

  getPet(pet_id: number) {
    return this.http.get<Pet>(AppSettings.BASE_API_URL + 'pets/' + pet_id);
  }

  listUserPets() {
    return this.http.get<Array<Pet>>(AppSettings.BASE_API_URL);
  }

}
