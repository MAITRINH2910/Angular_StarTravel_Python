import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { url } from "../../app/common-api";

@Injectable({
  providedIn: "root"
})
export class GuestService {
  public listCityApi: string = url + "/hotels/get_list_city";
  public listFeatureApi: string = url + "/hotels/get_features";
  public topHotelApi: string = url + "/hotels/get_top_hotels";
  public predictedHotelApi: string = url + "/hotels/get_predicted_hotels";
  public detailHotelApi: string = url + "/hotels/get_one_hotel";
  public hotelByNameApi: string = url + "/hotels/get_hotel_by_name";
  public allHotelInCityApi: string = url + "/hotels/get_all_hotels_in_city";

  public city: string;
  public listFeature: any;
  public topHotel: any;
  public predictedHotel: any;
  public ratingValue: number;
  public priceValue: number;
  public params = new HttpParams();
  public property: any;
  public utilities: any;
  constructor(public http: HttpClient) {}

  public getAllCities() {
    return this.http.get(this.listCityApi);
  }
  public getFeatureByCity(city: string) {
    var obj = { city: city };
    return this.http.post(this.listFeatureApi, obj);
  }
  public getTopHotelByCity(city: string) {
    var obj = { city: city };
    return this.http.post(this.topHotelApi, obj);
  }

  public getPredictedHotelByFeature(
    city: string,
    rating: number,
    price: number,
    list_feature: any = []
  ) {
    var obj = {
      city: city,
      rating: rating,
      price: price,
      list_feature: list_feature
    };
    return this.http.post(this.predictedHotelApi, obj);
  }

  public getOneHotel(id: string) {
    return this.http.get(this.detailHotelApi + "/" + id);
  }

  public getHotelByName(name: string) {
    var obj = { name: name };
    return this.http.post(this.hotelByNameApi, obj);
  }

  public getAllHotelInCity(city: string) {
    return this.http.get(this.allHotelInCityApi + "/" + city);
  }
}
