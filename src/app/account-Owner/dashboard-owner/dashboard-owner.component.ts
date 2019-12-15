import { Component, OnInit } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { OwnerService } from 'src/app/service/owner.service';

@Component({
  selector: 'app-dashboard-owner',
  templateUrl: './dashboard-owner.component.html',
  styleUrls: ['./dashboard-owner.component.css']
})
export class DashboardOwnerComponent implements OnInit {
  private infoData: any;
  public number_of_hotel: number;
  public number_of_hotel_active: number;
  public number_of_hotel_inactive: number;

  headerConfig = {
    headers: new HttpHeaders({
      "user-access-token": window.localStorage.getItem("AuthToken")
    })
  };

  constructor(
    private ownerService: OwnerService
  ) {}

  ngOnInit() {
    this.ownerService.getInfoDashboardOwner(this.headerConfig).subscribe(data => {
      this.infoData = data;
      this.infoData = this.infoData.response; 
      this.number_of_hotel = this.infoData.number_of_hotel;
      this.number_of_hotel_active = this.infoData.number_of_hotel_active;
      this.number_of_hotel_inactive = this.infoData.number_of_hotel_inactive;
    });
  }
}

