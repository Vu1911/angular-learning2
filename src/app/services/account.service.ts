import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountStatus, IAccount, Role } from '../interfaces/account.interface';

@Injectable()
export class AccountService {
  currentAccount = 'currentAccount';

  constructor(private http: HttpClient) {}

  onLogin(
    loginRequest: { username: string; password: string },
    role: string
  ): Observable<boolean> {
    return new Observable((observer) => {
      this.onGetAccountByUsername(loginRequest.username).subscribe(
        (account) => {
          let canLogin = false;
          if (account.length > 0) {
            if (account[0].role == role) {
              if (account[0].status == AccountStatus.ACTIVATED) {
                if (account[0].password == loginRequest.password) {
                  canLogin = true;
                  localStorage.setItem(
                    this.currentAccount,
                    JSON.stringify(account[0])
                  );
                }
              }
            }
          }
          observer.next(canLogin);
        }
      );
    });
  }

  onLogout() {
    localStorage.removeItem('currentAccount');
  }

  onGetAllAccounts(): Observable<any> {
    return this.http.get('http://localhost:3000/accounts');
  }

  onGetAccountById(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/accounts/${id}`);
  }

  onGetAccountByUsername(username: string): Observable<any> {
    return this.http.get(`http://localhost:3000/accounts?username=${username}`);
  }

  onGetCurrentAccount() {
    let currentAcc = localStorage.getItem(this.currentAccount);
    return currentAcc ? JSON.parse(currentAcc) : null;
  }

  onCreateAccount(account: IAccount) : Observable<any> {
    account.id = 0
    return this.http.post('http://localhost:3000/accounts', account);
  }

  onUpdateAccount(account: IAccount) {
    return this.http.put(`http://localhost:3000/accounts/${account.id}`, account);
  }

  onDelete(id: number) {
    return this.http.delete(`http://localhost:3000/accounts/${id}`);
  }

  checkIsLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(this.currentAccount)) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  checkIsAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let currentAcc = localStorage.getItem(this.currentAccount);
      if (currentAcc) {
        if (JSON.parse(currentAcc).role == Role.ADMIN) {
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  }

  checkUsernameFormDuplication(control: AbstractControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onGetAccountByUsername(control.value).subscribe((accounts) => {
        if (accounts.length > 0) {
          resolve({ isUsernameDuplicated: true });
        } else {
          resolve(null);
        }
      });
    });
  }
}
