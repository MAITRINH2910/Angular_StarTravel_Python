import { Component, ViewChild } from "@angular/core";
import { HeaderConfig } from "../../../common-api";
import { AdminService } from "src/app/service/admin.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Hotel } from "src/app/model/hotel.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-pending-hotel",
  templateUrl: "./pending-hotel.component.html",
  styleUrls: ["./pending-hotel.component.css"]
})
export class PendingHotelComponent {
  public displayedColumns: string[] = [
    // "id",
    "address",
    "city",
    "hotel_owner",
    "name",
    "price",
    "rating",
    "status"
  ];
  public dataSource: MatTableDataSource<Hotel>;
  public allHotel: Hotel[];
  public temp: any;
  private paginator: MatPaginator;

  constructor(private adminService: AdminService, public router: Router) {}

  @ViewChild(MatPaginator, { static: true }) set matPaginator(
    mp: MatPaginator
  ) {
    this.setDataSourceAttributes();
  }

  async setDataSourceAttributes() {
    this.temp = await this.adminService
      .getPendingHotel(HeaderConfig)
      .toPromise();

    this.allHotel = this.temp.response;
    this.dataSource = new MatTableDataSource(this.allHotel);
    this.dataSource.paginator = this.paginator;

    if (this.paginator) {
      this.applyFilter("");
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onSetStatus(hotel: Hotel) {
    hotel.status = "ACTIVE";
    this.adminService.approveHotel(hotel, HeaderConfig).subscribe(data => {
      this.setDataSourceAttributes();
    });
    this.router.navigate(["admin"]);
  }
}
