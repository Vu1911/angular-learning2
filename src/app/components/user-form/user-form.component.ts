import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountStatus, IAccount, Role } from 'src/app/interfaces/account.interface';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  roles = Object.values(Role)
  statusList = Object.values(AccountStatus)
  userForm: FormGroup = new FormGroup({})

  @Input() userFormTitle: string = ""
  @Input() placeholder : IAccount = {
    id: 0,
    username: 'Username',
    email: "E-mail",
    password: "Password",
    dob: new Date("2000-11-19"),
    status: AccountStatus.ACTIVATED,
    role: Role.USER
  }

  @Output() onCloseForm = new EventEmitter<boolean>()
  @Output() submit = new EventEmitter<IAccount>()

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'username' : new FormControl(this.placeholder.username, [Validators.required], [this.accountService.asyncValidatorUserNameDuplication(this.placeholder)]),
      "email" : new FormControl(this.placeholder.email, [Validators.required, Validators.email]),
      "password" : new FormControl(this.placeholder.password, [Validators.required]),
      "dob": new FormControl(this.placeholder.dob.toLocaleString().split(',')[1], [Validators.required]),
      "status" : new FormControl(this.placeholder.status),
      "role" : new FormControl(this.placeholder.role)
    })

  }

  onSubmit(){
    let chosenAccount = JSON.parse(JSON.stringify(this.placeholder))
    Object.keys(chosenAccount).map((key) => {
      if(key != 'id'){
        if(this.userForm.value[key]){
          chosenAccount[key] = this.userForm.value[key]
        }
      }
    })
    this.submit.emit(chosenAccount)
    return
  }

  onClose(){
    this.onCloseForm.emit(true)
  }
}
