import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/account.interface';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginResponse = {status: false, message: ""}

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {

  }

  onLogin(loginRequest: {username: string, password: string}){
    this.accountService.onLogin(loginRequest, Role.USER).subscribe((loginResonse: {status: boolean, message: string})=> {
      this.loginResponse = loginResonse
      setTimeout(() => {
        this.router.navigate(["/user"])
      }, 500)
      
    })
  }

}
