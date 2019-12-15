import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { AdminService } from "src/app/service/admin.service";
import { AuthAccountService } from 'src/app/service/auth-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  private infoAdmin: any;
  private infoData: any;
  public number_of_hotel: number;
  public number_of_user : number;
  public number_of_hotel_active : number;
  public number_of_hotel_inactive : number

  headerConfig = {
    headers: new HttpHeaders({
      "user-access-token": window.localStorage.getItem("AuthToken")
    })
  };

  constructor(
    private authService: AuthAccountService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
 
      
    this.adminService.getInfoDashboard(this.headerConfig).subscribe(data => {
      this.infoData = data;     
      this.infoData = this.infoData.response;
      this.number_of_user = this.infoData.number_of_user;
      this.number_of_hotel = this.infoData.number_of_hotel;
      this.number_of_hotel_active = this.infoData.number_of_hotel_active;
      this.number_of_hotel_inactive = this.infoData.number_of_hotel_inactive;
    });
  }
}
