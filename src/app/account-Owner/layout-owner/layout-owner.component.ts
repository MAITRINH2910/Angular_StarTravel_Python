import { Component } from '@angular/core';
import { AuthAccountService } from 'src/app/service/auth-account.service';

@Component({
  selector: 'app-layout-owner',
  templateUrl: './layout-owner.component.html',
  styleUrls: ['./layout-owner.component.css']
})
export class LayoutOwnerComponent {

  constructor(private authService: AuthAccountService) {}

  logout() {
    this.authService.logout();
  }
}
