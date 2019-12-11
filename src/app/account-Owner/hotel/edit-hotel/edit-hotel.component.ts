import { Component, OnInit } from "@angular/core";
import { GuestService } from "src/app/service/guest.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { OwnerService } from "src/app/service/owner.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import { Hotel } from "src/app/model/hotel.model";

@Component({
  selector: "app-edit-hotel",
  templateUrl: "./edit-hotel.component.html",
  styleUrls: ["./edit-hotel.component.css"]
})
export class EditHotelComponent implements OnInit {
  public hotel: any;
  public property: any;
  public utilities: any;
  public formEdit: FormGroup;
  public city: string;
  private cities: any;
  public option: string;
  public myControl = new FormControl();
  public filteredOptions: Observable<string[]>;
  private temp: any;
  public errorMessage: string;
  public submitted = false;
  public img: string;
  constructor(
    private guestService: GuestService,
    private activatedRouteService: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ownerService: OwnerService,
    private routerService: Router
  ) {}
  headerConfig = {
    headers: new HttpHeaders({
      "user-access-token": window.localStorage.getItem("AuthToken")
    })
  };
  async ngOnInit() {
    this.hotel = new Hotel();
    this.getHotel();

    this.cities = await this.guestService.getAllCities().toPromise();
    this.cities = this.cities.response;

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
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
  getHotel() {
    this.activatedRouteService.params.subscribe(data => {
      let id = data.id;
      this.guestService.getOneHotel(id).subscribe(result => {
        this.hotel = result;
        this.property = this.hotel.response.detail_hotels;
        this.utilities = this.hotel.response.utilities;
        if (this.property.img == "") {
          this.img = "null";
        } else {
          this.img = this.property.img;
        }
        this.formEdit = this.formBuilder.group({
          name: [this.property.name, [Validators.required]],
          address: [this.property.address, [Validators.required]],
          city: [this.property.city, [Validators.required]],
          img: [this.img, [Validators.required]],
          rating: [
            this.property.rating,
            [Validators.required, Validators.pattern("^([1-9]|10)$")]
          ],
          price: [
            this.property.price,
            [Validators.required, Validators.pattern("^[1-9]{1}[0-9]*")]
          ]
        });
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    this.activatedRouteService.params.subscribe(data => {
      this.hotel.name = this.formEdit.value.name;
      this.hotel.address = this.formEdit.value.address;
      this.hotel.city = this.city;
      this.hotel.link = "";
      this.hotel.price = this.formEdit.value.price;
      this.hotel.rating = this.formEdit.value.rating;
      this.hotel.img = this.formEdit.value.img;

      this.ownerService
        .updateHotel(
          this.hotel.response.detail_hotels.id,
          this.hotel.name,
          this.hotel.address,
          this.hotel.response.detail_hotels.city,
          this.hotel.link,
          this.hotel.img,
          this.hotel.rating,
          this.hotel.price,
          this.hotel.response.detail_hotels.status,
          this.headerConfig
        )
        .subscribe(data => {
          this.temp = data;
          console.log(data)
          if (this.temp.status == 400) {
            this.errorMessage = this.temp.response.error;
          }
          if (this.temp.status == 200) {
            this.routerService.navigate(["host/hotel/all-hotel"]);
          }
        });
    });
  }
}
