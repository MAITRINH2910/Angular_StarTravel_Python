import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Hotel } from "../model/hotel.model";
import { url } from '../../app/common-api';

@Injectable({
  providedIn: "root"
})
export class OwnerService {
  constructor(public http: HttpClient) {}
  
  public addHouse(
    city: string,
    name: string,
    link: string,
    img: string,
    address: string,
    rating: number,
    price: number, headerConfig
  ) {
    var obj = {
      city: city,
      name: name,
      link: link,
      img: img,
      address: address,
      rating: rating,
      price: price
    };
    return this.http.post<Hotel>(`${url}/hotels/add_hotel`, obj, headerConfig);
  }
 
  public getOneHotel(id: string) {
    return this.http.get(`${url}/hotels/get_one_hotel/${id}`);
  }

  public getOneHotelOwner(id: string, headerConfig) {
    return this.http.get(`${url}/hotels/get_one_hotel_owner/${id}`, headerConfig);
  }

  public updateHotel(house: Hotel, headerConfig) {
    return this.http.put(`${url}/hotels/update_hotel/${house.id}`, house, headerConfig);
  } 

  public deleteHotel(id:string, headerConfig) {
    return this.http.delete(`${url}/hotels/delete_hotel/${id}`, headerConfig);
  }

  public getAllHotelsByOwner(headerConfig) {
    return this.http.get(`${url}/hotels/get_all_hotels_of_owner`, headerConfig);
  }

  public getInfoDashboardOwner(headerConfig) {
    return this.http.get(`${url}/hotels/get_information_owner`, headerConfig);
  }
}
