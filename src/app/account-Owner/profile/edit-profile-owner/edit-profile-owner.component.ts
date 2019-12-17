import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HeaderConfig } from "../../../common-api";
import { AuthAccountService } from 'src/app/service/auth-account.service';

@Component({
  selector: 'app-edit-profile-owner',
  templateUrl: './edit-profile-owner.component.html',
  styleUrls: ['./edit-profile-owner.component.css']
})
export class EditProfileOwnerComponent implements OnInit {
  public message: string;
  public editForm: FormGroup;
  public submitted = false;

  constructor(
    private authService: AuthAccountService,
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
    this.authService.updateInfoUser( this.editForm.value.password, HeaderConfig).subscribe(
      data => {
        this.router.navigate(['/admin/profile/view-profile']);
      }
    );
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

