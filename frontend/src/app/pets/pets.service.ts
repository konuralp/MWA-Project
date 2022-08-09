import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../../appSettings";
import {Pet} from "./PetInterface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PetsService {

  constructor(private http: HttpClient) {}

  addPet(fd: FormData) {
    return this.http.post<any>(AppSettings.BASE_API_URL + 'pets', fd);
  }

  searchPets(qParams: any, skip: any) {
    let queries = [];
    for (let key in qParams) {
      if (qParams[key]) {
        queries.push(`${key}=${qParams[key]}`);
      }
    }
    if(skip){
      queries.push("skip=" + skip);
    }
    let queryStr = queries.length > 0 ? '?' + queries.join("&") : '';
    return this.http.get<Array<Pet>>(AppSettings.BASE_API_URL + 'pets/search'+queryStr);
  }

  getPet(pet_id: string) {
    return this.http.get<Pet>(AppSettings.BASE_API_URL + 'pets/' + pet_id) as Observable<Pet>;
  }

  listUserPets() {
    return this.http.get<Array<Pet>>(AppSettings.BASE_API_URL);
  }

}
