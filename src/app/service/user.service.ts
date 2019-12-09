import { Injectable } from "@angular/core";
import { url } from "../../app/common-api";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public listFeedbackApi: string = url + "/feedback/get";
  public addFeedbackApi: string = url + "/feedback/add";

  constructor(public http: HttpClient) {}

  public getAllFeedback(idHotel: string) {
    return this.http.get(`${this.listFeedbackApi}/${idHotel}`);
  }

  public addFeedback( 
    hotel_id: string,
    content: string,
    rating: number,
    headerConfig
  ) {
    var obj = {
      hotel_id: hotel_id,    
      content: content,
      rating: rating,
    };
    return this.http.post(this.addFeedbackApi, obj, headerConfig);
  }
}
