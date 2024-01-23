import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public refreshTokenKey: string = 'refreshToken';
  public tokenKey: string = 'token';

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!this.getCookie(this.tokenKey);
  }

  login(login: string, password: string, rememberMe: boolean = false): Observable<LoginResponseType | DefaultResponseType> {
    if (rememberMe) {
      localStorage.setItem('ga', JSON.stringify({'login': login, 'password': password}));
    } else {
      localStorage.setItem('ga', JSON.stringify({'login': '', 'password': ''}));
    }
    return this.http.post<LoginResponseType | DefaultResponseType>(environment.api + 'login', {
      login, password
    });
  }

  setCookie(token: string, refreshToken: string): void {
    document.cookie = `${encodeURIComponent(this.tokenKey)}=${encodeURIComponent(token)}`;
    document.cookie = `${encodeURIComponent(this.refreshTokenKey)}=${encodeURIComponent(refreshToken)}`;
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  getCookie(name: string) {
    let match = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`));

    return match ? match.split('=')[1] : undefined;
  }

  // getLoggedIn(){
  //   return this.isLogged;
  // }
}
