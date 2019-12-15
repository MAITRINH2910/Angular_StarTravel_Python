import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthAccountService } from "../service/auth-account.service";
import decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthAccountService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // this will be passed from the route config
    // on the data property
    const expectedRole = next.data.expectedRole;
    const token = window.localStorage.getItem("AuthToken");
    // decode the token to get its payload
    if (token != null) {
      const tokenPayload = decode(token);
      if (!this.auth.isAuthenticated() || tokenPayload.role !== expectedRole || this.auth.isTokenExpired()) {
        // navigate to login page
        this.router.navigate(["/login-owner"]);
        return false;
      }
      return true;
    } 
    this.router.navigate(["/login-owner"]);
    return false;
  
  }
  
}
