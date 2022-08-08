import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../appSettings";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  login(email: string, password: string) {
    return this.http.post(AppSettings.BASE_API_URL + 'users/login', {email, password});
  }
}
