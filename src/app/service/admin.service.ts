import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Hotel } from "../model/hotel.model";
import { url } from "../../app/common-api";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  public listHotelApi: string = url + "/hotels/get_all_hotels";
  public listActiveHotelApi: string =
    url + "/hotels/get_all_hotels_status/ACTIVE";
  public listPendingHotelApi: string =
    url + "/hotels/get_all_hotels_status/INACTIVE";
  public listUserApi: string = url + "/users/get_all_user";
  public infoData: string = url + "/hotels/get_information_database";
  public updateHotelApi: string = url + "/hotels/update";
  public deleteHotelApi: string = url + "/hotels/delete";
  public deleteUserApi: string = url + "/users/delete_user";

  constructor(public http: HttpClient) {}

  public getAllHotel(headerConfig) {
    return this.http.get(this.listHotelApi, headerConfig);
  }
  public getAllUser(headerConfig) {
    return this.http.get(this.listUserApi, headerConfig);
  }
  public getActiveHotel(headerConfig) {
    return this.http.get(this.listActiveHotelApi, headerConfig);
  }
  public getPendingHotel(headerConfig) {
    return this.http.get(this.listPendingHotelApi, headerConfig);
  }
  public getInfoDashboard(headerConfig) {
    return this.http.get(this.infoData, headerConfig);
  }
  public approveHotel(hotel: Hotel, headerConfig) {
    return this.http.put(
      `${url}/hotels/approve_hotel/${hotel.id}`,
      hotel,
      headerConfig
    );
  }
  public updateHotel(
    id_hotel: string,
    name: string,
    address: string,
    city: string,
    link: string,
    img: string,
    rating: number,
    price: number,
    status: string, 
    headerConfig
  ) {
    var obj = {
      name: name,
      address: address,
      city: city,
      link: link,
      img: img,
      rating: rating,
      price: price,
      status: status
    };
    return this.http.put(this.updateHotelApi + `/${id_hotel}`, obj, headerConfig);
  }
  public deleteHotel(id_hotel: string, headerConfig) {
    return this.http.delete(this.deleteHotelApi + `/${id_hotel}`, headerConfig);
  }

  public deleteUser(id_user: string, headerConfig) {
    return this.http.delete(this.deleteUserApi + `/${id_user}`, headerConfig);
  }
}
