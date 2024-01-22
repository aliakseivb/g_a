import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/user.service";
import {LoginResponseType} from "../../../types/login-response.type";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  thisUser: LoginResponseType | undefined;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if(this.userService.userInfo){
      this.thisUser = this.userService.userInfo;
      if(this.thisUser.userInfo.userAvatar.indexOf(' ') !== -1){
        this.thisUser.userInfo.userAvatar = this.thisUser.userInfo.userAvatar.replace(' ', '%20');
      }
      console.log(this.thisUser)
      console.log(this.userService.userInfo)
    }
  }
}
