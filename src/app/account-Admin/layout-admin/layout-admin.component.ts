import { Component, OnInit } from '@angular/core';
import { AuthAccountService } from 'src/app/service/auth-account.service';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})
export class LayoutAdminComponent implements OnInit {

  constructor(private authService: AuthAccountService) {}

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
