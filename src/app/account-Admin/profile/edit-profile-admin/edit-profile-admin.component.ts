import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/model/user.model";
import { HttpHeaders } from "@angular/common/http";
import { AuthAccountService } from 'src/app/service/auth-account.service';

@Component({
  selector: 'app-edit-profile-admin',
  templateUrl: './edit-profile-admin.component.html',
  styleUrls: ['./edit-profile-admin.component.css']
})
export class EditProfileAdminComponent implements OnInit {
  public infoAdmin: any;
  public message: string;
  public user: User;
  public editForm: FormGroup;
  public submitted = false;
  private idAdmin: string;
  headerConfig = {
    headers: new HttpHeaders({
      "user-access-token": window.localStorage.getItem("AuthToken")
    })
  };
  constructor(
    private userService: AuthAccountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.infoAdmin = this.userService
      .getInfoUser(this.headerConfig)
      .subscribe(data => {
        this.infoAdmin = data;
        this.infoAdmin = this.infoAdmin.response;
        this.idAdmin = this.infoAdmin.id;
      });

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
    this.userService.updateInfoUser( this.editForm.value.password, this.headerConfig).subscribe(
      data => {
        console.log(data);
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