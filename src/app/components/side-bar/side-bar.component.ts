import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/account.interface';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input() currentUserRole = Role.USER


  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.currentUserRole = (this.accountService.onGetCurrentAccount())? this.accountService.onGetCurrentAccount().role : Role.USER
  }

  isUser(role: string){
    return (role == Role.USER)
  }

  isAdmin(role: string){
    return (role == Role.ADMIN)
  }

  onLogout(){
    this.accountService.onLogout()
    this.router.navigate([`/user/login`])
  }
}
