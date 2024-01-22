import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    login: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });

  notValueInForm: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  login(){
    if(!this.loginForm.value.login && !this.loginForm.value.password){
      this.notValueInForm = true;
    } else {

    }

  }
}
