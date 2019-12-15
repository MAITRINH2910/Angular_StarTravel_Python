import { Component, ViewChild, Inject } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { HttpHeaders } from "@angular/common/http";
import { AdminService } from "src/app/service/admin.service";
import { User } from "src/app/model/user.model";
import { Router } from '@angular/router';
import {MatSort,
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
  public allUser: User[];
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
      .getAllUser(this.headerConfig)
      .toPromise();
    this.allUser = this.temp.response;
    this.dataSource = new MatTableDataSource(this.allUser);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.allUser)
    if (this.paginator && this.sort) {
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
  styles: [
    `
      iframe {
        width: 800px;
      }
    `
  ],
  template: `
    <h2 mat-dialog-title>Do you want to delete this account?</h2>

    <mat-dialog-actions align="center">
      <button mat-raised-button color="primary" mat-dialog-close (click)="onDeleteUser(id)">Delete</button>
      <button mat-raised-button color="secondary" mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})
export class DeleteUserModal {
  public id: string
  public listUser: User[] = [];
  public user: any;

  headerConfig = {
    headers: new HttpHeaders({
      "user-access-token": window.localStorage.getItem("AuthToken")
    })
  };
  constructor(private adminService: AdminService, 
    private routerService: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteUserModal>
  ) {
    if (this.data) {
     this.id = this.data.id;
    }
  }

  onDeleteUser(id: string): void {
    console.log(this.id)

    this.adminService.deleteUser(id, this.headerConfig).subscribe(data => {
      console.log(data)
      this.updateDataAfterDelete(id);
    });
    this.routerService.navigate(["/admin/estay"]);
    this.dialogRef.close(true);
  }

  updateDataAfterDelete(idHotel: string) {
    for (var i = 0; i < this.listUser.length; i++) {
      if (this.user[i].id == idHotel) {
        this.listUser.splice(i, 1);
        break;
      }
    }
  }
}
