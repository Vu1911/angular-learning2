import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';


@Injectable({providedIn: 'platform'})
export class AdminGuard implements CanActivate {
    constructor(private accountService : AccountService, private router: Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.accountService.checkIsAdmin()
        .then((isAdmin: boolean) => {
            if(isAdmin){
                return true
            } else {
                this.accountService.onLogout()
                this.router.navigate(['/admin/login'])
                return false
            }
        })
    }
}

@Injectable({providedIn: 'platform'})
export class AuthGuard implements CanActivate {
    constructor(private accountService : AccountService, private router: Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.accountService.checkIsLogin()
        .then((isLogin: boolean) => {
            if(isLogin){
                return true
            } else {
                this.accountService.onLogout()
                this.router.navigate(['/user/login'])
                return false
            }
        })
    }
}

@Injectable({providedIn: 'platform'})
export class isAreadlyLoginGuard implements CanActivate {
    constructor(private accountService : AccountService, private router: Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.accountService.checkIsLogin()
        .then((isLogin: boolean) => {
            if(isLogin){
                this.accountService.onLogout()
                return true
            } else {
                return true
            }
        })
    }
}
