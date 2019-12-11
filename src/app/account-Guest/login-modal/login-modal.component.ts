import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthAccountService } from "src/app/service/auth-account.service";
import { AuthLoginInfo } from "src/app/model/login.model";
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import {
  MatDialogRef,
  MatDialog
} from "@angular/material/dialog";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.css"]
})
export class LoginModalComponent implements OnInit {
  onNoClick(): void {
    this.dialogRef.close();
  }

  public loginForm: FormGroup;
  public form: any = {};
  public isLoggedIn = false;
  public isLoginFailed = false;
  public loading = false;
  public submitted = false;
  public errorMessage = "";
  public role: string;
  private loginInfo: AuthLoginInfo;
  response: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthAccountService,
    private tokenStorage: TokenStorageService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginModalComponent>,
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
        this.dialogRef.close(true);
        window.location.reload();
      }
    });
  }
  onSignUp() {
    {
      this.dialog.open(RegisterModalComponent);
      this.dialogRef.close(true);
    }
  }
}
