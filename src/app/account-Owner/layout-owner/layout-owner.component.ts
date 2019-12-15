import { Component } from '@angular/core';
import { AuthAccountService } from 'src/app/service/auth-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-owner',
  templateUrl: './layout-owner.component.html',
  styleUrls: ['./layout-owner.component.css']
})
export class LayoutOwnerComponent {

  constructor(private authService: AuthAccountService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['login-owner'])
  }
}
