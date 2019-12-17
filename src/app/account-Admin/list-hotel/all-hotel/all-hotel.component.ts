import { Component, ViewChild, Inject } from "@angular/core";
import { HeaderConfig } from "../../../common-api";
import { AdminService } from "src/app/service/admin.service";
import { Hotel } from "src/app/model/hotel.model";
import { Router } from "@angular/router";
import {
  MatPaginator,
  MatTableDataSource,
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA
} from "@angular/material";

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
  private allHotel: Hotel[];
  private temp: any;
  private paginator: MatPaginator;

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  @ViewChild(MatPaginator, { static: true }) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  async setDataSourceAttributes() {
    this.temp = await this.adminService
      .getAllHotel(HeaderConfig)
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
  styles: [],
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
    this.adminService.deleteHotel(id, HeaderConfig);
    this.routerService.navigate(["/admin/estay"]);
    this.dialogRef.close(true);
  }
}
