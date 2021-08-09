import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AccountStatus, IAccount, Role } from 'src/app/interfaces/account.interface';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnChanges {
   @Input() usersShowed : Array<IAccount> = [{
    id: 0,
    username: "default",
    email: "default",
    password: "default",
    dob: new Date(),
    status: AccountStatus.ACTIVATED,
    role: Role.USER
  }]
  @Input() totalPage = 10
  @Input() noPerPage = 5
  @Input() currentPage = 0

  @Output() chosenPage = new EventEmitter<number>()
  @Output() onEditUser = new EventEmitter<number>()
  @Output() onDeleteUser = new EventEmitter<number>()
  
  pages: Array<number> = [] 

  constructor() { }

  ngOnInit(): void {
    this.pages = Array.from(Array(this.totalPage),(x,i)=>i);
  }

  ngOnChanges(){
    this.pages = Array.from(Array(this.totalPage),(x,i)=>i);
  }

  onChoosePage(pageNumber: number){
    this.chosenPage.emit(pageNumber)
  }

  onEdit(userId: number) {
    this.onEditUser.emit(userId)
  }

  onDelete(userId: number) {
    this.onDeleteUser.emit(userId)
  }

}
