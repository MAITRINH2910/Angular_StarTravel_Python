import { Component, ViewChild, Inject } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { AdminService } from "src/app/service/admin.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Hotel } from "src/app/model/hotel.model";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
@Component({
  selector: "app-all-hotel",
  templateUrl: "./all-hotel.component.html",
  styleUrls: ["./all-hotel.component.css"]
})
export class AllHotelComponent {
  public displayedColumns: string[] = [
    "name",
    "address",
    "city",
    "hotel_owner",    
    "price",
    "rating",
    "status",
    "action"
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

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

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
  openDialog(id: string) {
    this.dialog.open(DeleteHotelModal, {
      data: {
        id: id
      }
    });
  }
}

@Component({
  selector: "delete-hotel-dialog",
  styles: [
    `
      iframe {
        width: 800px;
      }
    `
  ],
  template: `
    <h2 mat-dialog-title>Do you want to delete this hotel?</h2>

    <mat-dialog-actions align="center">
      <button
        mat-raised-button
        color="primary"
        mat-dialog-close
        (click)="onDeleteHotel(id)"
      >
        Delete
      </button>
      <button mat-raised-button color="secondary" mat-dialog-close>
        Close
      </button>
    </mat-dialog-actions>
  `
})
export class DeleteHotelModal {
  public id: string;
  public hotel: any;
  public listHotel: Hotel[] = [];

  headerConfig = {
    headers: new HttpHeaders({
      "user-access-token": window.localStorage.getItem("AuthToken")
    })
  };
  constructor(
    private adminService: AdminService,
    private routerService: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteHotelModal>
  ) {
    if (this.data) {
      this.id = this.data.id;
    }
  }

  onDeleteHotel(id: string): void {
    this.adminService.deleteHotel(id, this.headerConfig).subscribe(data => {
      this.updateDataAfterDelete(id);
    });
    this.routerService.navigate(["/admin/estay"]);
    this.dialogRef.close(true);
  }

  updateDataAfterDelete(idHotel: string) {
    for (var i = 0; i < this.listHotel.length; i++) {
      if (this.hotel[i].id == idHotel) {
        this.listHotel.splice(i, 1);
        break;
      }
    }
  }
}
