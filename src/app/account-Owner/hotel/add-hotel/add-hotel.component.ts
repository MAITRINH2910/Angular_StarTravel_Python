import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { Hotel } from "src/app/model/hotel.model";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { OwnerService } from 'src/app/service/owner.service';
import { GuestService } from 'src/app/service/guest.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {
  public submitted = false;
  public loading = false;
  public formAddHouse: FormGroup;
  public hotel: Hotel;
  public city: string;
  public name: string;
  public link: string;
  public address: string;
  public img: string;
  public rating: number;
  public price: number;
  private cities: any;
  public option: string;
  public myControl = new FormControl();
  public filteredOptions: Observable<string[]>;
  private temp: any;
  public message: string;
  constructor(
    private formBuilder: FormBuilder,
    private ownerService: OwnerService,
    private routerService: Router,
    private guestService: GuestService
  ) {}
  headerConfig = {
    headers: new HttpHeaders({
      "user-access-token": window.localStorage.getItem("AuthToken")
    })
  };

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
      city: ["", [Validators.required, this.noWhitespaceValidator]],
      name: ["", [Validators.required]],
      link: [""],
      img: ["", [Validators.required]],
      address: ["", [Validators.required, this.noWhitespaceValidator]],
      rating: [
        "",
        [Validators.required, Validators.pattern("^[1-9]{1}[0-9]*")]
      ],
      price: ["", [Validators.required, Validators.pattern("^[1-9]{1}[0-9]*")]]
    });
  }

  onSubmit() {
    this.submitted = true;

    this.hotel.name = this.formAddHouse.value.name;
    this.hotel.address = this.formAddHouse.value.address;
    this.hotel.city = this.city;
    this.hotel.link = null;
    this.hotel.price = this.formAddHouse.value.price;
    this.hotel.rating = this.formAddHouse.value.rating;
    this.hotel.img = this.formAddHouse.value.img;
    this.ownerService
      .addHouse(
        this.hotel.city,
        this.hotel.name,
        null,
        this.hotel.img,
        this.hotel.address,
        this.hotel.rating,
        this.hotel.price,
        this.headerConfig
      )
      .subscribe(data => {
        this.temp = data;
        this.message = this.temp.response.success;
        this.routerService.navigate(["host/hotel/all-hotel"]);
      });
  }
}
