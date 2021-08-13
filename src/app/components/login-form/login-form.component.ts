import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({})

  @Output() loginRequest = new EventEmitter<{username: string, password: string}>()
  @Input() loginResponse = {status: false, message: ""}

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required])
    })
  }

  onLogin(){
    this.loginRequest.emit(this.loginForm.value)
  }

}
