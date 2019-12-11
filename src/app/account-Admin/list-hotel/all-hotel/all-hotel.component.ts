import { Component, ViewChild } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { AdminService } from "src/app/service/admin.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Hotel } from "src/app/model/hotel.model";

@Component({
  selector: 'app-all-hotel',
  templateUrl: './all-hotel.component.html',
  styleUrls: ['./all-hotel.component.css']
})
export class AllHotelComponent {
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
  public allHotel: Hotel[];
  public temp: any;
  private paginator: MatPaginator;
  private sort: MatSort;

  headerConfig = {
    headers: new HttpHeaders({
      "user-access-token": window.localStorage.getItem("AuthToken")
    })
  };

  constructor(
    private adminService: AdminService
  ) {}

  @ViewChild(MatSort, { static: true }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator, { static: true }) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  async setDataSourceAttributes() {
    this.temp = await this.adminService
      .getAllHotel(this.headerConfig)
      .toPromise();
    this.allHotel = this.temp.response;
    this.dataSource = new MatTableDataSource(this.allHotel);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter("");
    }
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}