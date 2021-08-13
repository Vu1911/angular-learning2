import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITransaction, TransactionType } from 'src/app/interfaces/transaction.interface';


@Component({
  selector: 'app-ioproduct-form',
  templateUrl: './ioproduct-form.component.html',
  styleUrls: ['./ioproduct-form.component.css']
})
export class IoproductFormComponent implements OnInit {
  transactionTypes = Object.values(TransactionType)
  transactionForm: FormGroup = new FormGroup({})

  @Input() productId = 0

  @Output() onCloseForm = new EventEmitter<boolean>()
  @Output() submit = new EventEmitter<ITransaction>()

  constructor() { }

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
      'type': new FormControl(TransactionType.ADD, [Validators.required]),
      'quantity': new FormControl(null, [Validators.required, Validators.min(1)]),
      'date': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){
    let transaction = JSON.parse(JSON.stringify(this.transactionForm.value))
    transaction["productId"] = this.productId
    this.submit.emit(transaction)
  }

  onClose(){
    this.onCloseForm.emit(true)
  }
}
