import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {LoginResponseType} from "../../../../types/login-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });
  loginValue: string | null = '';
  pasValue: string | null = '';
  selected: boolean = false;
  showPsw: boolean = false;
  pswElem: HTMLElement | null = document.getElementById('password');
  isValid: string = '';

  constructor(public fb: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.pswElem?.setAttribute('type', 'password');
    if (localStorage.getItem('ga')) {
      const res: {login:string, password: string} | null = JSON.parse(localStorage.getItem('ga') as string);
      this.loginValue = res!.login;
      this.pasValue = res!.password;
      this.selected = true;
    }
  }

  onChangeLogin(){
    if ((JSON.parse(localStorage.getItem('ga') as string).login !== this.loginForm.value.login)){
      this.loginValue = this.loginForm.value.login as string;
    }
  }
  toggleSvg() {
    this.showPsw = !this.showPsw;
    if (this.showPsw) {
      this.pswElem?.setAttribute('type', 'text');
    } else {
      this.pswElem?.setAttribute('type', 'password');
    }
  }

  login() {
    if (this.loginForm.valid && this.loginForm.value.login && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.login, this.loginForm.value.password, !!this.loginForm.value.rememberMe)
        .subscribe({
          next: (data: LoginResponseType | DefaultResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).hasError !== undefined) {
              error = (data as DefaultResponseType).errors[0];
            }

            const loginResponse: LoginResponseType = data as LoginResponseType;
            if (!loginResponse.tokens.token || !loginResponse.tokens.refreshToken || !loginResponse.userInfo.userId) {
              error = 'Ошибка авторизации';
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }
            this.authService.setCookie(loginResponse.tokens.token, loginResponse.tokens.refreshToken);
            this.userService.setUserInfo(loginResponse);
            this._snackBar.open("Вы успешно авторизовались");
            this.router.navigate(['/dashboard']);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message)
            } else {
              this._snackBar.open("Ошибка авторизации")
            }
          }
        })
    }
  }
}
