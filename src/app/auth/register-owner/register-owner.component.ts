import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SignUpInfo } from "src/app/model/signup.model";
import { AuthAccountService } from "src/app/service/auth-account.service";

@Component({
  selector: "app-register-owner",
  templateUrl: "./register-owner.component.html",
  styleUrls: ["./register-owner.component.css"]
})
export class RegisterOwnerComponent implements OnInit {
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
    private authService: AuthAccountService
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
      "HOTEL_OWNER"
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
