import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Hotel } from "src/app/model/hotel.model";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { OwnerService } from "src/app/service/owner.service";
import { DeleteHotelComponent } from '../delete-hotel/delete-hotel.component';

@Component({
  selector: "app-all-hotel-owner",
  templateUrl: "./all-hotel-owner.component.html",
  styleUrls: ["./all-hotel-owner.component.css"]
})
export class AllHotelOwnerComponent implements OnInit {
  private temp: any;
  private allHotel: Hotel[];
  private paginator: MatPaginator;

  public hotel: any;
  public listHotel: Hotel[] = [];
  public dataSource: MatTableDataSource<Hotel>;
  public message: any; 
  public displayedColumns: string[] = [
    "name",
    "address",
    "city",
    "img",
    "price",
    "rating",
    "status",
    "action"
  ];

  constructor(
    private ownerService: OwnerService,
    private dialog: MatDialog,
    private routerService: Router
  ) {}
  headerConfig = {
    headers: new HttpHeaders({
      "user-access-token": window.localStorage.getItem("AuthToken")
    })
  };

  ngOnInit() {
    this.hotel = new Hotel();
  }

  @ViewChild(MatPaginator, { static: true }) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  async setDataSourceAttributes() {
    this.temp = await this.ownerService
      .getAllHotelsByOwner(this.headerConfig)
      .toPromise();
    this.allHotel = this.temp.response;
    this.dataSource = new MatTableDataSource(this.allHotel);
    this.dataSource.paginator = this.paginator;
    if (this.paginator) {
      this.applyFilter("");
    }
    this.message = this.temp.response.message;
    if (this.message!=null){
      this.routerService.navigate(['login-owner'])
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  openDialog(id: string) {
   this.dialog.open(DeleteHotelComponent, {
      data: {
        id: id
      }
    })    
  }
}
