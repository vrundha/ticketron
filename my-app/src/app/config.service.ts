// config.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  getSearchResults() {
    var form = (<HTMLFormElement>document.getElementById('search'));

    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        var req = new XMLHttpRequest();
        var formData = new FormData(form);

        fetch("https://ipinfo.io/json?token=4916b89d62d548")
          .then((response) => response.json())
          .then((jsonResponse) => {
            let lat_longi_info = ["", ""];
            if (formData.get("location") == "current")
              lat_longi_info = jsonResponse.loc.split(",");

            var url =
              "/api?keyword=" +
              formData.get("keyword") +
              "&category=" +
              formData.get("category") +
              "&distance=" +
              formData.get("distance") +
              "&custom_location=" +
              formData.get("custom_location") +
              "&lat=" +
              lat_longi_info[0] +
              "&lng=" +
              lat_longi_info[1];

              // console.log(this.httpClient);

              this.data = this.httpClient.get(url).toPromise();

            // fetch(url)
            //   .then((response) => response.json())
            //   .then((data) => {
            //     this.data = data;
            //   });
          });
      },
      false
    );
  }



  getIPInfo() {
    return this.getURL("https://ipinfo.io/json?token=4916b89d62d548");
  }

  getURL(url: string){
    return this.http.get(url);
  } 
}