import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {LoginResponseType} from "../../types/login-response.type";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: LoginResponseType | undefined;

  constructor() {
  }

  setUserInfo(data: LoginResponseType) {
    if (data) {
      this.userInfo = data;
    }
  }
}
