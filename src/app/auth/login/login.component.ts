import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthAccountService } from "src/app/service/auth-account.service";
import { AuthLoginInfo } from "src/app/model/login.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public form: any = {};
  public isLoggedIn = false;
  public isLoginFailed = false;
  public loading = false;
  public submitted = false;
  public errorMessage = "";
  public role: string;
  private loginInfo: AuthLoginInfo;
  public response: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthAccountService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getAuthority();
    }
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.f.username.value,
      this.f.password.value
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(data => {
      this.response = data;
      this.response = this.response.response;
      this.errorMessage = this.response.error;
      if (this.response.role != null) {
        this.tokenStorage.saveToken(this.response.token);
        this.tokenStorage.saveUsername(this.response.username);
        this.tokenStorage.saveAuthority(this.response.role);
        this.router.navigate(["home"]);
      }
    });
  }
}
