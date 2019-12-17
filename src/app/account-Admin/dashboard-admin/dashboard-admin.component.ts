import { Component, OnInit } from '@angular/core';
import { HeaderConfig } from "../../common-api";
import { AdminService } from "src/app/service/admin.service";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  private infoData: any;
  public number_of_hotel: number;
  public number_of_user : number;
  public number_of_hotel_active : number;
  public number_of_hotel_inactive : number

  constructor(
    private adminService: AdminService,
  ) {}

  ngOnInit() {      
    this.adminService.getInfoDashboard(HeaderConfig).subscribe(data => {
      this.infoData = data;     
      this.infoData = this.infoData.response;
      this.number_of_user = this.infoData.number_of_user;
      this.number_of_hotel = this.infoData.number_of_hotel;
      this.number_of_hotel_active = this.infoData.number_of_hotel_active;
      this.number_of_hotel_inactive = this.infoData.number_of_hotel_inactive;
    });
  }
}
