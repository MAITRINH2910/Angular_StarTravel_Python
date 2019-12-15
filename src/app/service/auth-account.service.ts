import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { url, httpOptions } from "../../app/common-api";
import decode from "jwt-decode";
import { Router } from "@angular/router";
import { SignUpInfo } from "../model/signup.model";
import { AuthLoginInfo } from "../model/login.model";

@Injectable({
  providedIn: "root"
})
export class AuthAccountService {
  constructor(private http: HttpClient, private _router: Router) {}
  headerConfig = {
    headers: new HttpHeaders({
      "user-access-token": window.localStorage.getItem("AuthToken")
    })
  };

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(`${url}/users/register`, info, httpOptions);
  }

  attemptAuth(credentials: AuthLoginInfo) {
    return this.http.post(`${url}/users/login`, credentials, httpOptions);
  }

  updateInfoUser(newPass: string, headerConfig) {
    var obj = { password: newPass };
    return this.http.put(`${url}/users/update_current_user`, obj, headerConfig);
  }

  getInfoUser(headerConfig) {
    return this.http.get(
      `${url}/users/get_information_current_user`,
      headerConfig
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("AuthToken") != null && !this.isTokenExpired();
  }

  getToken(): string {
    return localStorage.getItem("AuthToken");
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  clear(): void {
    localStorage.clear();
  }

  logout(): void {
    this.clear();
  }

  decode() {
    return decode(localStorage.getItem("AuthToken"));
  }
}
