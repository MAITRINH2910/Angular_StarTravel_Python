import { Component, Inject } from "@angular/core";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA
} from "@angular/material";
import { Router } from "@angular/router";
import { OwnerService } from "src/app/service/owner.service";
import { Hotel } from 'src/app/model/hotel.model';
import { HeaderConfig } from "../../../common-api";

@Component({
  selector: "app-delete-hotel",
  templateUrl: "./delete-hotel.component.html",
  styleUrls: ["./delete-hotel.component.css"]
})
export class DeleteHotelComponent {
  public message: string = "Are you sure want to delete?";
  public confirmButtonText = "Yes";
  public cancelButtonText = "Cancel";
  public id: string;
  public hotel: any;
  public listHotel: Hotel[] = [];

  constructor( private ownerService: OwnerService,
    public dialog: MatDialog,
    private routerService: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteHotelComponent>
  ) {
    if (this.data) {
     this.id = this.data.id;
    }
  }

  onDeleteList(id: string): void {
    this.ownerService.deleteHotel(id, HeaderConfig).subscribe(data => {
      this.updateDataAfterDelete(id);
    });
    this.routerService.navigate(["/host/dashboard"]);
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
