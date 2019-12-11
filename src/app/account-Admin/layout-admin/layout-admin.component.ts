import { Component } from '@angular/core';
import { AuthAccountService } from 'src/app/service/auth-account.service';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})
export class LayoutAdminComponent{

  constructor(private authService: AuthAccountService) {}

  logout() {
    this.authService.logout();
  }
}
