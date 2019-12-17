import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HeaderConfig } from "../../../common-api";
import { AuthAccountService } from "src/app/service/auth-account.service";

@Component({
  selector: "app-edit-profile-admin",
  templateUrl: "./edit-profile-admin.component.html",
  styleUrls: ["./edit-profile-admin.component.css"]
})
export class EditProfileAdminComponent implements OnInit {
  public editForm: FormGroup;
  public submitted = false;

  constructor(
    private userService: AuthAccountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() { 
    this.editInfoForm();
  }

  editInfoForm() {
    this.editForm = this.formBuilder.group(
      {
        password: ["", Validators.required],
        cfPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "cfPassword")
      }
    );
  }

  onSubmit() {
    this.userService
      .updateInfoUser(this.editForm.value.password, HeaderConfig)
      .subscribe(data => {
        this.router.navigate(["/admin/profile/view-profile"]);
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
