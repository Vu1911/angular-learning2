import { Component, OnInit } from '@angular/core';
import { AccountStatus, IAccount, Role } from 'src/app/interfaces/account.interface';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  
  editFormOpen = false
  createFormOpen = false

  allAccounts : Array<IAccount> = [{
    id: 0,
    username: "default",
    email: "default",
    password: "default",
    dob: new Date(),
    status: AccountStatus.ACTIVATED,
    role: Role.USER
  }]
  
  usersShowed : Array<IAccount> = [{
    id: 0,
    username: "default",
    email: "default",
    password: "default",
    dob: new Date(),
    status: AccountStatus.ACTIVATED,
    role: Role.USER
  }]

  totalPage = 10
  noPerPage = 1
  currentPage = 0

  placeholder : IAccount = {
    id: 0,
    username: 'Username',
    email: "E-mail",
    password: "Password",
    dob: new Date("2000-11-19"),
    status: AccountStatus.ACTIVATED,
    role: Role.USER
  }

  constructor(private accountService: AccountService) { }

  ngOnInit(): void { 
    this.updatePagination()
  }

  getStartIndex(){
    return (this.currentPage)*this.noPerPage
  }

  getEndIndex(){
    return this.getStartIndex() + this.noPerPage
  }

  onChangePage(pageNumber: number){
    this.currentPage = pageNumber
    this.usersShowed = this.allAccounts.slice(this.getStartIndex(), this.getEndIndex())
  }

  onEditUser(userId: number){
    
    this.accountService.onGetAccountById(userId).subscribe((account: IAccount) => {
      this.placeholder = account
      this.placeholder.dob = new Date(account.dob)
      this.editFormOpen = true
    })

  }

  closeEditForm(isCloseForm: boolean){
    this.editFormOpen = !isCloseForm
  }

  onEditSubmit(account : IAccount){
    this.accountService.onUpdateAccount(account).subscribe((account) => {
      this.updatePagination()
    })

  }

  onCreateUser(){
    this.createFormOpen = true
    
  }

  closeCreateForm(isCloseForm: boolean){
    this.createFormOpen = !isCloseForm
  }

  onCreateSubmit(account: IAccount){
    this.accountService.onCreateAccount(account).subscribe((newAccount: IAccount) => {
      this.updatePagination()
    })
  }

  updatePagination(){
    this.accountService.onGetAllAccounts().subscribe((accounts) => {
      this.allAccounts = accounts
      this.totalPage = Math.ceil(this.allAccounts.length / this.noPerPage)
      this.currentPage = 0
      this.usersShowed = this.allAccounts.slice(this.getStartIndex(), this.getEndIndex())
      this.createFormOpen = false
      this.editFormOpen = false
    })
  }

  onDeleteUser(userId: number){
    this.accountService.onDelete(userId).subscribe((data)=>{
      this.updatePagination()
    })
  }

}
