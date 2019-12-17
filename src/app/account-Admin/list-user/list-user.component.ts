import { Component, ViewChild, Inject } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { HeaderConfig } from "../../common-api";
import { AdminService } from "src/app/service/admin.service";
import { User } from "src/app/model/user.model";
import { Router } from "@angular/router";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA
} from "@angular/material";
@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.css"]
})
export class ListUserComponent {
  public displayedColumns: string[] = ["id", "username", "role", "action"];
  public dataSource: MatTableDataSource<User>;
  private allUser: User[];
  private temp: any;
  private paginator: MatPaginator;

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  @ViewChild(MatPaginator, { static: true }) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  async setDataSourceAttributes() {
    this.temp = await this.adminService
      .getAllUser(HeaderConfig)
      .toPromise();
    this.allUser = this.temp.response;
    this.dataSource = new MatTableDataSource(this.allUser);
    this.dataSource.paginator = this.paginator;
    if (this.paginator) {
      this.applyFilter("");
    }
  }

  openDialog(id: string) {
    this.dialog.open(DeleteUserModal, {
      data: {
        id: id
      }
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

@Component({
  selector: "delete-user-dialog",
  styles: [],
  template: `
    <h2 mat-dialog-title>Do you want to delete this account?</h2>

    <mat-dialog-actions align="center">
      <button
        mat-raised-button
        color="primary"
        mat-dialog-close
        (click)="onDeleteUser(id)"
      >
        Delete
      </button>
      <button mat-raised-button color="secondary" mat-dialog-close>
        Close
      </button>
    </mat-dialog-actions>
  `
})
export class DeleteUserModal {
  public id: string;
  public listUser: User[] = [];
  public user: any;
  private temp: any;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private routerService: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteUserModal>
  ) {
    if (this.data) {
      this.id = this.data.id;
    }
  }

  onDeleteUser(id: string): void {
    this.adminService.deleteUser(id, HeaderConfig).subscribe(data => {
      this.temp = data;
      if (this.temp.response.error == "Permission denied!") {
        this.dialog.open(AlertDeleteAdmin);
      } else if (this.temp.status == 200) {
        this.routerService.navigate(["/admin/estay"]);
      } else {
        this.dialog.open(AlertDeleteFail);
      }
    });
    this.dialogRef.close(true);
  }
}

@Component({
  selector: "alert-delete-admin",
  styles: [],
  template: `
    <h2 mat-dialog-title>You cannot delete this account with role ADMIN</h2>

    <mat-dialog-actions align="center">
      <button mat-raised-button color="secondary" mat-dialog-close>
        Close
      </button>
    </mat-dialog-actions>
  `
})
export class AlertDeleteAdmin {}

@Component({
  selector: "alert-delete-fail",
  styles: [],
  template: `
    <h2 mat-dialog-title>Cannot delete this account!</h2>

    <mat-dialog-actions align="center">
      <button mat-raised-button color="secondary" mat-dialog-close>
        Close
      </button>
    </mat-dialog-actions>
  `
})
export class AlertDeleteFail {}
