import {HttpHeaders } from "@angular/common/http";
export const url = "http://localhost:9999";

export const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

export const HeaderConfig = {
  headers: new HttpHeaders({
    token: window.localStorage.getItem("AuthToken")
  })
};
