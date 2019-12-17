import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { map, startWith } from "rxjs/operators";
import { GuestService } from "src/app/service/guest.service";
import { AuthAccountService } from "src/app/service/auth-account.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
  private city: string;
  private cities: any;
  private listFeature: any;
  private topHotel: any;
  public option: string;
  public myControl = new FormControl();
  public filteredOptions: Observable<string[]>;
  public authority: string;
  public role: string;

  constructor(
    private guestService: GuestService,
    private authService: AuthAccountService,
    private routerService: Router
  ) {}

  async ngOnInit() {
    this.cities = await this.guestService.getAllCities().toPromise();
    this.cities = this.cities.response;

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  // Filter input
  public _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  // Get City Name from input
  onOptionSelected(dataOption: any) {
    this.city = dataOption.option.value;
  }

  // Click button Search
  async onSubmit() {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.city == this.cities[i]) {
        this.listFeature = await this.guestService
          .getFeatureByCity(this.city)
          .toPromise();
        this.listFeature = this.listFeature.response;
  
        this.topHotel = await this.guestService
          .getTopHotelByCity(this.city)
          .toPromise();
        this.topHotel = this.topHotel.response;
  
        this.guestService.listFeature = this.listFeature;
        this.guestService.topHotel = this.topHotel;
        this.guestService.city = this.city;
  
        this.routerService.navigate(["/top-hotel"]);
      }
    }
   
  }

  logout() {
    this.authService.logout();
  }
}
