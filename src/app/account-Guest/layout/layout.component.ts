import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { AuthAccountService } from "src/app/service/auth-account.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { BookingModalComponent } from "../booking-modal/booking-modal.component";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent implements OnInit {
  public username: string;
  public role: string;

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthAccountService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getAuthority();
      if (this.role === "USER") {
        this.username = this.tokenStorage.getUsername();
        return true;
      }
    }
  }
  onClick() {
    this.dialog.open(BookingModalComponent);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }
}
