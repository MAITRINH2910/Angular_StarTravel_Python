import { Component, ViewChild } from "@angular/core";
import { HeaderConfig } from "../../../common-api";
import { AdminService } from "src/app/service/admin.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Hotel } from "src/app/model/hotel.model";

@Component({
  selector: 'app-approved-hotel',
  templateUrl: './approved-hotel.component.html',
  styleUrls: ['./approved-hotel.component.css']
})
export class ApprovedHotelComponent {
  public displayedColumns: string[] = [
    "id",
    "address",
    "city",
    "hotel_owner",
    "name",
    "price",
    "rating",
    "status"
  ];
  public dataSource: MatTableDataSource<Hotel>;
  private allHotel: Hotel[];
  private temp: any;
  private paginator: MatPaginator;

  constructor(
    private adminService: AdminService
  ) {}  
  
  @ViewChild(MatPaginator, { static: true }) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  async setDataSourceAttributes() {
    this.temp = await this.adminService
      .getActiveHotel(HeaderConfig)
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
}
