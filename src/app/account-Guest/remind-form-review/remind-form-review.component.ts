import { Component } from '@angular/core';

@Component({
  selector: 'app-remind-form-review',
  templateUrl: './remind-form-review.component.html',
  styleUrls: ['./remind-form-review.component.css']
})
export class RemindFormReviewComponent{
  public message: string = "Please rating and comment to leave your review";
  public confirmButtonText = "OK";
}
