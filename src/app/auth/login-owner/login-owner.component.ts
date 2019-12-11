import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthAccountService } from 'src/app/service/auth-account.service';
import { AuthLoginInfo } from 'src/app/model/login.model';

@Component({
  selector: 'app-login-owner',
  templateUrl: './login-owner.component.html',
  styleUrls: ['./login-owner.component.css']
})
export class LoginOwnerComponent implements OnInit {
  public loginForm: FormGroup;
  public form: any = {};
  public isLoggedIn = false;
  public isLoginFailed = false;
  public loading = false;
  public submitted = false;
  public errorMessage = "";
  public role: string;
  private loginInfo: AuthLoginInfo;
  private token: any;
  response: any;
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
      }

      if (this.response.role == "ADMIN") {
        this.router.navigate(["admin/estay"]);
      } else if (this.response.role == "HOTEL_OWNER"){
        this.router.navigate(["host"]);
      } 
    
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
