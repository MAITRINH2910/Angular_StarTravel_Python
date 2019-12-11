import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Hotel } from "src/app/model/hotel.model";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { OwnerService } from "src/app/service/owner.service";
import { DeleteHotelComponent } from "../../delete-hotel/delete-hotel.component";

@Component({
  selector: "app-all-hotel-owner",
  templateUrl: "./all-hotel-owner.component.html",
  styleUrls: ["./all-hotel-owner.component.css"]
})
export class AllHotelOwnerComponent implements OnInit {
  dataSource: MatTableDataSource<Hotel>;
  temp: any;
  public allHotel: Hotel[];
  private paginator: MatPaginator;
  private sort: MatSort;
  public hotel: any;
  public listHotel: Hotel[] = [];
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
    public dialog: MatDialog,
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
    this.temp = await this.ownerService
      .getAllHotelsByOwner(this.headerConfig)
      .toPromise();
    this.allHotel = this.temp.response;
    this.dataSource = new MatTableDataSource(this.allHotel);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.paginator && this.sort) {
      this.applyFilter("");
    }
    console.log(this.allHotel);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  openDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteHotelComponent, {
      data: {
        id: id
      }
    })    
  }

  // onDeleteList(id: string) {
  //   alert("Do you want to delete it?");
  //   this.ownerService.deleteHotel(id, this.headerConfig).subscribe(data => {
  //     this.routerService.navigate(["/host/hotel"]);
  //     this.updateDataAfterDelete(id);
  //   });
  // }

 
}
