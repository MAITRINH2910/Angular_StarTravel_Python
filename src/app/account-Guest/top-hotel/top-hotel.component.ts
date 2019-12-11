import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { Router } from "@angular/router";
import { GuestService } from 'src/app/service/guest.service';

@Component({
  selector: 'app-top-hotel',
  templateUrl: './top-hotel.component.html',
  styleUrls: ['./top-hotel.component.css']
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

  constructor(
    private guestService: GuestService,
    private formBuilder: FormBuilder,
    private router: Router,
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
  ngOnInit() {
    this.listFeature = this.guestService.listFeature;
    this.topHotel = this.guestService.topHotel;
    this.city = this.guestService.city;
    this.ratingValue = this.guestService.ratingValue;
    this.priceValue = this.guestService.priceValue;
  }

  async submit() {
    this.loading = true
    this.selectedListFeatureIds = this.form.value.listFeature
      .map((v, i) => (v ? this.listFeature[i] : null))
      .filter(v => v !== null);
    if (this.ratingValue == undefined || this.priceValue == undefined){
      this.ratingValue=0;
      this.priceValue=0;
    }
    this.predictedHotel = await this.guestService
      .getPredictedHotelByFeature(
        this.city,
        this.ratingValue,
        this.priceValue,
        this.selectedListFeatureIds
      )
      .toPromise();

    console.log(this.predictedHotel);
    this.guestService.predictedHotel = this.predictedHotel;
    this.loading = false;
    this.router.navigate(["/predicted-hotel"]);
  }
  ngOnDestroy() {
    this.guestService.listFeature = this.listFeature;
    this.guestService.topHotel = this.topHotel;
    this.guestService.city = this.city;
    // this.cityService.predictedHotel = this.predictedHotel;
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
