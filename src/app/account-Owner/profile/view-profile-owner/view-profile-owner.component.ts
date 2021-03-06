import { Component, OnInit } from '@angular/core';
import { AuthAccountService } from 'src/app/service/auth-account.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-profile-owner',
  templateUrl: './view-profile-owner.component.html',
  styleUrls: ['./view-profile-owner.component.css']
})
export class ViewProfileOwnerComponent implements OnInit {

  private infoHost: any;
  public username;
  public role;
  headerConfig = {
    headers: new HttpHeaders({
      "user-access-token": window.localStorage.getItem("AuthToken")
    })
  };

  constructor(private authService: AuthAccountService) {}

  ngOnInit() {
    this.infoHost = this.authService.getInfoUser(this.headerConfig).subscribe(data => {
        this.infoHost = data;
        this.infoHost = this.infoHost.response;
        this.role = this.infoHost.role;
        this.username = this.infoHost.username;
      });
  }
}
