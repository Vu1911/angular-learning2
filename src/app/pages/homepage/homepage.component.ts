import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/interfaces/account.interface';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  currentUser:  IAccount = {
    id: 0,
    username: "stranger",
    email: " ",
    password: " ",
    dob: new Date(),
    status: " ",
    role: ""
  }

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    let account = this.accountService.onGetCurrentAccount()
    if (account){
      this.currentUser = account
    } 
  }

}
