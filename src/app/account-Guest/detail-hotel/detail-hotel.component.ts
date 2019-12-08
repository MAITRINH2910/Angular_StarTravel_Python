import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Hotel } from "./../../model/hotel.model";
import { GuestService } from 'src/app/service/guest.service';

@Component({
  selector: 'app-detail-hotel',
  templateUrl: './detail-hotel.component.html',
  styleUrls: ['./detail-hotel.component.css']
})
export class DetailHotelComponent implements OnInit {
  public hotel: any;
  public property: any;
  public utilities: any;
  public haveUtility = [];
  constructor(
    private guestService: GuestService,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit() {
    this.hotel = new Hotel();
    this.getHotel();
  }

  getHotel() {
    this.activatedRouteService.params.subscribe(data => {
      let id = data.id;
      this.guestService.getOneHotel(id).subscribe(result => {
        this.hotel = result;
        this.property = this.hotel.response.detail_hotels;
        this.utilities = this.hotel.response.utilities;
        for (let utility in this.utilities) {
          let value = this.utilities[utility];
          if (value == 1) {
            this.haveUtility.push(utility);
            console.log(this.haveUtility);
          }
        }
      });
    });
  }
}

