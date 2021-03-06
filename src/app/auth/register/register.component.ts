import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SignUpInfo } from 'src/app/model/signup.model';
import { AuthAccountService } from 'src/app/service/auth-account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public loading = false;
  public submitted = false;
  public form: any = {};
  public signupInfo: SignUpInfo;
  public isSignUpFailed = false;
  public registerForm: FormGroup;
  public errorMessage = "";
  private response: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthAccountService   
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],//Validators.minLength(6)
      cfPassword: ["", Validators.required]
    },
    {
      validator: MustMatch("password", "cfPassword")
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.signupInfo = new SignUpInfo(
      this.f.username.value,
      this.f.password.value,
      "HOTEL_OWNER"
    );
    console.log(this.signupInfo);

    this.authService.signUp(this.signupInfo).subscribe(data => {
      this.response = data;
      this.response = this.response.response;
      console.log(data);
      
    });
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
