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
  selector: 'app-predict-hotel',
  templateUrl: './predict-hotel.component.html',
  styleUrls: ['./predict-hotel.component.css']
})

export class PredictHotelComponent implements OnInit {
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
    this.city = this.guestService.city;
    this.listFeature = this.guestService.listFeature;
    this.topHotel = this.guestService.topHotel;
    this.predictedHotel = this.guestService.predictedHotel;
    this.predictedHotel = this.predictedHotel.response;  
  }
  
  async submit() {
    this.loading = true
    if (this.ratingValue == undefined || this.priceValue == undefined){
      this.ratingValue=0;
      this.priceValue=0;
    }
    this.selectedListFeatureIds = this.form.value.listFeature
      .map((v, i) => (v ? this.listFeature[i] : null))
      .filter(v => v !== null);
    console.log(this.selectedListFeatureIds);
    this.predictedHotel = await this.guestService
      .getPredictedHotelByFeature(
        this.city,
        this.ratingValue,
        this.priceValue,
        this.selectedListFeatureIds
      )
      .toPromise();

    this.predictedHotel = this.predictedHotel.response;
    this.loading = false;
    this.router.navigate(["/predicted-hotel"]);  
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => (next ? prev + next : prev), 0);
    return totalSelected >= min ? null : { required: true };
  };
  return validator;
}
