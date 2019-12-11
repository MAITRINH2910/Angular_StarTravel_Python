import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "src/app/service/token-storage.service";
import { AuthAccountService } from 'src/app/service/auth-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public authority: string;
  public role: string;

  constructor(
    private tokenStorage: TokenStorageService, 
    private authService: AuthAccountService,
    private router: Router
  ) {}

  ngOnInit() {    
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getAuthority();
      if (this.role === "USER") {
        this.authority = "user";
        return true;
      }
    }
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }
}

