import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private api: ApiService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.api.getUserData()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const url: string = state.url;
//     return this.checkLogin(url);
//   }

//   checkLogin(url: string): boolean {
//     if (this.api.getUserData()) { return true; }
//     // this.authService.redirectUrl = url;
//     this.router.navigate(['/login']);
//     return false;
//   }
}
