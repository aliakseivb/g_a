import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(login: string, password: string, rememberMe: boolean = false): Observable<DefaultResponseType | LoginResponseType> {
    if(rememberMe){
      localStorage.setItem('ga', login);
    }
    return this.http.post<DefaultResponseType | LoginResponseType>(environment.api + 'login', {
      login, password
    })
  }
}
