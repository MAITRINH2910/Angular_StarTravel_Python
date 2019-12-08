import { Component, OnInit } from '@angular/core';
import { AuthAccountService } from 'src/app/service/auth-account.service';

@Component({
  selector: 'app-layout-owner',
  templateUrl: './layout-owner.component.html',
  styleUrls: ['./layout-owner.component.css']
})
export class LayoutOwnerComponent implements OnInit {

  constructor(private authService: AuthAccountService) {}

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
  }
}
