import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthAccountService } from "src/app/service/auth-account.service";
import { AuthLoginInfo } from "src/app/model/login.model";
import { SignUpInfo } from "src/app/model/signup.model";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

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
      this.dialog.open(RegisterUserModal);
      this.dialogRef.close(true);
    }
  }
}

@Component({
  selector: "register-user-dialog",
  styles: [
    `
    @import url('https://fonts.googleapis.com/css?family=Numans');
    .shadow-right {
        height: 50px;
        margin: 10px;
        background-color: black;
        -moz-box-shadow: 3px 3px 5px 0px #666;
        -webkit-box-shadow: 3px 3px 5px 0px #666;
        box-shadow: 3px 3px 5px 0px #666;
    }
    
    .container {
        height: 100%;
        align-content: center;
    }
    
    .card {
        height: 500px;
        margin-top: auto;
        margin-bottom: auto;
        width: 400px;
        background-color: rgba(0, 0, 0, 0.71) !important;
    }
    
    .social_icon span {
        font-size: 60px;
        margin-left: 10px;
        color: #FFC312;
    }
    
    .social_icon span:hover {
        color: white;
        cursor: pointer;
    }
    
    .card-header h3 {
        color: white;
    }
    
    .social_icon {
        position: absolute;
        right: 20px;
        top: -45px;
    }
    
    .input-group-prepend span {
        width: 50px;
        background-color: #FFC312;
        color: black;
        border: 0 !important;
    }
    
    input:focus {
        outline: 0 0 0 0 !important;
        box-shadow: 0 0 0 0 !important;
    }
    
    .remember {
        color: white;
    }
    
    .remember input {
        width: 20px;
        height: 20px;
        margin-left: 15px;
        margin-right: 5px;
    }
    
    .login_btn {
        color: black;
        background-color: #FFC312;
        width: 100px;
    }
    
    .login_btn:hover {
        color: black;
        background-color: white;
    }
    
    .links {
        color: white;
    }
    
    .links a {
        margin-left: 4px;
    }
    `
  ],
  template: `
  <!DOCTYPE html>
  <html>
  
  <head>
      <title>Login Page</title>
  
      <!--Bootsrap 4 CDN-->
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
  
      <!--Fontawesome CDN-->
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />
  </head>
  
  <body>
  
      <div class="container">
          <div class="d-flex justify-content-center h-100">
              <div class="card shadow-right">
                  <div class="card-header">
                      <h3>Sign Up</h3>
                  </div>
                  <div class="card-body">
                      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                          <div class="input-group form-group">
                              <div class="input-group-prepend">
                                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                              </div>
                              <input type="text" formControlName="username" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.username.errors }" placeholder="Username" />
                              <div *ngIf="submitted && f.username.errors" class="invalid-feedback">
                                  <div *ngIf="f.username.errors['required']">Username is required</div>
                              </div>
                          </div>
                          <div class="input-group form-group">
                              <div class="input-group-prepend">
                                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                              </div>
                              <input type="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" placeholder="Password" />
                              <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
                                  <div *ngIf="f.password.errors['required']">Password is required</div>
                              </div>
                          </div>
                          <div class="input-group form-group">
                              <div class="input-group-prepend">
                                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                              </div>
                              <input type="password" formControlName="cfPassword" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.cfPassword.errors }" placeholder="Confirm Password" />
                              <div *ngIf="submitted && f.cfPassword.errors" class="invalid-feedback">
                                  <div *ngIf="f.cfPassword.errors['required']">Confirm Password is required</div>
                                  <div *ngIf="registerForm.get('cfPassword').errors['mustMatch']">Confirm Password must match</div>
                              </div>
                          </div>
                          <button class="btn btn-primary">
                              Register
                          </button>
                          <div *ngIf="errorMessage" class="alert alert-danger mt-3 mb-0">{{errorMessage}}</div>
                          <div *ngIf="successMessage" class="alert alert-success mt-3 mb-0">{{successMessage}}</div>
                      </form>
                  </div>
                  <div class="card-footer">
                      <div class="d-flex justify-content-center links">
                          Already have an account?
                          <a style="color: #007bff; cursor: pointer;" (click)="onSignIn()">Sign In</a>
                      </div>
                      <div class="d-flex justify-content-center">
                          <a href="#">Forgot your password?</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </body>
  
  </html>
  `
})
export class RegisterUserModal {
  public loading = false;
  public submitted = false;
  public form: any = {};
  public signupInfo: SignUpInfo;
  public isSignUpFailed = false;
  public registerForm: FormGroup;
  public errorMessage = "";
  public successMessage = "";

  private response: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthAccountService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterUserModal>
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        username: ["", Validators.required],
        password: ["", Validators.required], //Validators.minLength(6)
        cfPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "cfPassword")
      }
    );
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    this.signupInfo = new SignUpInfo(
      this.f.username.value,
      this.f.password.value,
      "USER"
    );
    if (
      this.f.cfPassword.value == this.f.password.value &&
      this.f.password.value != ""
    ) {
      this.authService.signUp(this.signupInfo).subscribe(data => {
        this.response = data;
        this.response = this.response.response;
        this.errorMessage = this.response.error;
        if (this.errorMessage == null) {
          this.successMessage = "Register succesfully";
        }
      });
    }
  }
  onSignIn() {
    {
      this.dialog.open(LoginModalComponent);
      this.dialogRef.close(true);
    }
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
