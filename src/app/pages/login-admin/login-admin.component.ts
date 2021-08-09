import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/account.interface';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginRequest: {username: string, password: string}){
    this.accountService.onLogin(loginRequest, Role.ADMIN).subscribe((isLogin: boolean)=> {
      console.log(isLogin)
      this.router.navigate(["/admin"])
    })
  }
}
