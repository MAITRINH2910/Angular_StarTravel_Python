import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { Hotel } from "src/app/model/hotel.model";
import { HeaderConfig } from "../../../common-api";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { OwnerService } from "src/app/service/owner.service";
import { GuestService } from "src/app/service/guest.service";

@Component({
  selector: "app-add-hotel",
  templateUrl: "./add-hotel.component.html",
  styleUrls: ["./add-hotel.component.css"]
})
export class AddHotelComponent implements OnInit {
  public submitted = false;
  public loading = false;
  public formAddHouse: FormGroup;
  public city: string;
  public name: string;
  public link: string;
  public address: string;
  public img: string;
  public rating: number;
  public price: number;
  public option: string;
  public myControl = new FormControl();
  public filteredOptions: Observable<string[]>;
  public errorMessage: string;

  private temp: any;
  private hotel: Hotel;
  private cities: any;

  constructor(
    private formBuilder: FormBuilder,
    private ownerService: OwnerService,
    private routerService: Router,
    private guestService: GuestService
  ) {}

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  async ngOnInit() {
    this.hotel = new Hotel();
    this.createForm();

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

  createForm() {
    this.formAddHouse = this.formBuilder.group({
      name: ["", Validators.required],
      address: ["", [Validators.required, removeSpaces]],
      city: ["", Validators.required],
      img: [""],
      rating: ["", [Validators.required, Validators.pattern("^([1-9]|10)$")]],
      price: [
        "",
        [Validators.required, Validators.pattern("[1-9]{1}[0-9]{5,6}")]
      ]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.hotel.name = this.formAddHouse.value.name;
    this.hotel.address = this.formAddHouse.value.address;
    this.hotel.city = this.city;    
    this.hotel.link = ""; 
    this.hotel.price = this.formAddHouse.value.price;
    this.hotel.rating = this.formAddHouse.value.rating;
    this.hotel.img = this.formAddHouse.value.img;
    for (let i = 0; i < this.cities.length; i++) {
      if (this.city == this.cities[i]) {
        if (
          this.hotel.name != "" &&
          this.hotel.address != "" &&
          this.hotel.city != "" &&
          this.hotel.price != null &&
          this.hotel.price > 99999 &&
          this.hotel.price < 10000000 &&
          this.hotel.rating != null &&
          this.hotel.rating > 0 &&
          this.hotel.rating < 11
        ) {
          this.ownerService
            .addHouse(
              this.hotel.city,
              this.hotel.name,
              this.hotel.link,
              this.hotel.img,
              this.hotel.address.trim(),
              this.hotel.rating,
              this.hotel.price,
              HeaderConfig
            )
            .subscribe(data => {
              this.temp = data;
              if (this.temp.status == 400) {
                this.errorMessage = this.temp.response.error;
              }
              if (this.temp.status == 200) {
                this.routerService.navigate(["host/hotel/all-hotel"]);
              }
            });
        }
      }
    }
  }
}
import { AbstractControl } from '@angular/forms';

export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}