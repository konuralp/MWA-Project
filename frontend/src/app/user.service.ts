import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../appSettings";
import {BehaviorSubject} from "rxjs";
import {User} from "./UserInterface";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userState$ = new BehaviorSubject<{ token: string }>({token: ''});

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(AppSettings.BASE_API_URL + 'users/login', {email, password});
  }

  signup(email: string, password: string, full_name: string, phone_number: string) {
    return this.http.post(AppSettings.BASE_API_URL + 'users/signup', {email, password, full_name, phone_number});
  }

  getUserState(): User | null {
    const decoded = this.userState$.value.token && jwt_decode(this.userState$.value.token) as User;
    return decoded || null;
  }

  persistState(){
    localStorage.setItem('userState', JSON.stringify(this.userState$.value));
  }

  refreshState(){
    const userState = localStorage.getItem('userState');
    if(userState){
      this.userState$.next(JSON.parse(userState));
    }
  }

  logout() {
    this.userState$.next({token: ''});
    localStorage.removeItem('userState');
  }
}
