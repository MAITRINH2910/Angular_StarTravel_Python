import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent {
  public message: string = "Sorry! This function is developing.";
  public confirmButtonText = "Cancel";
}
