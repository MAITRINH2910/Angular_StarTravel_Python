import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { Router } from "@angular/router";
import { GuestService } from "src/app/service/guest.service";
import { map, startWith } from "rxjs/operators";
import { Observable } from "rxjs";
import { AdminService } from "src/app/service/admin.service";
import { BookingModalComponent } from "../booking-modal/booking-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-top-hotel",
  templateUrl: "./top-hotel.component.html",
  styleUrls: ["./top-hotel.component.css"]
})
export class TopHotelComponent implements OnInit {
  public form: FormGroup;
  public city: string;
  public listFeature: any;
  public topHotel: any;
  public predictedHotel: any;
  public ratingValue: number;
  public priceValue: number;
  public selectedListFeatureIds: any = [];
  public loading = false;
  public option: string;
  public myControl = new FormControl();
  public filteredOptions: Observable<string[]>;
  public allHotel: any;
  public hotel: string;
  public detailHotel: any;
  public listNameHotel = [];
  public hotelName: string;

  constructor(
    private adminService: AdminService,
    private guestService: GuestService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.listFeature = this.guestService.listFeature;

    this.form = this.formBuilder.group({
      listFeature: new FormArray([], minSelectedCheckboxes(1))
    });

    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.listFeature.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.listFeature as FormArray).push(control);
    });
  }

  rating(event) {
    this.ratingValue = event.value;
  }
  price(event) {
    this.priceValue = event.value;
  }
  async ngOnInit() {
    this.listFeature = this.guestService.listFeature;
    this.topHotel = this.guestService.topHotel;
    this.city = this.guestService.city;
    this.ratingValue = this.guestService.ratingValue;
    this.priceValue = this.guestService.priceValue;
    this.allHotel = await this.guestService.getAllHotelInCity(this.city).toPromise();
    for (let i = 0; i < this.allHotel.response.length; i++) {
      this.hotelName = this.allHotel.response[i].name;
      this.listNameHotel.push(this.hotelName);
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  // Filter input
  public _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listNameHotel.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  // Get Hotel from input
  onOptionSelected(dataOption: any) {
    this.hotel = dataOption.option.value;
  }

  async submit() {
    this.loading = true;
    this.selectedListFeatureIds = this.form.value.listFeature
      .map((v, i) => (v ? this.listFeature[i] : null))
      .filter(v => v !== null);
    if (this.ratingValue == undefined || this.priceValue == undefined) {
      this.ratingValue = 0;
      this.priceValue = 0;
    }
    this.predictedHotel = await this.guestService
      .getPredictedHotelByFeature(
        this.city,
        this.ratingValue,
        this.priceValue,
        this.selectedListFeatureIds
      )
      .toPromise();
    this.guestService.predictedHotel = this.predictedHotel;
    this.loading = false;
    this.router.navigate(["/predicted-hotel"]);
  }

  onClick() {
    this.dialog.open(BookingModalComponent);
  }

  async onSubmit() {
    this.detailHotel = await this.guestService
      .getHotelByName(this.hotel)
      .toPromise();
    this.detailHotel = this.detailHotel.response;
    this.router.navigate(["detail-hotel", this.detailHotel[0].id]);
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => (next ? prev + next : prev), 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };
  return validator;
}
