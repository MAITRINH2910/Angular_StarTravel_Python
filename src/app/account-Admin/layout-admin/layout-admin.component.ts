import { Component } from "@angular/core";
import { AuthAccountService } from "src/app/service/auth-account.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-layout-admin",
  templateUrl: "./layout-admin.component.html",
  styleUrls: ["./layout-admin.component.css"]
})
export class LayoutAdminComponent {
  constructor(
    private authService: AuthAccountService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(["login-owner"]);
  }
}
