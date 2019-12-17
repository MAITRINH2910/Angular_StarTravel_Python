import { Component, OnInit } from '@angular/core';
import { AuthAccountService } from 'src/app/service/auth-account.service';
import { HeaderConfig } from "../../../common-api";

@Component({
  selector: 'app-view-profile-owner',
  templateUrl: './view-profile-owner.component.html',
  styleUrls: ['./view-profile-owner.component.css']
})
export class ViewProfileOwnerComponent implements OnInit {

  private infoHost: any;
  public username;
  public role;

  constructor(private authService: AuthAccountService) {}

  ngOnInit() {
    this.infoHost = this.authService.getInfoUser(HeaderConfig).subscribe(data => {
        this.infoHost = data;
        this.infoHost = this.infoHost.response;
        this.role = this.infoHost.role;
        this.username = this.infoHost.username;
      });
  }
}
