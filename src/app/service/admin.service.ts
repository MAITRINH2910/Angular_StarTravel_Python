import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Hotel } from '../model/hotel.model';
import { url } from '../../app/common-api';

@Injectable({
  providedIn: "root"
})
export class AdminService {
  public listHotelApi: string = url + "/hotels/get_all_hotels";
  public listActiveHotelApi: string = url + "/hotels/get_all_hotels_status/ACTIVE";
  public listPendingHotelApi: string = url + "/hotels/get_all_hotels_status/INACTIVE";
  public listUserApi: string = url + "/users/get_all_user";
  public infoData: string = url + "/hotels/get_information_database";
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
    return this.http.put(`${url}/hotels/approve_hotel/${hotel.id}`,hotel, headerConfig);
  }
}
