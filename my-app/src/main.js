"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
var environment_1 = require("./environments/environment");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.error(err); });
var form = document.getElementById('search');
(function () {
    'use strict';
    window.addEventListener('load', function () {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    }, false);
})();
document.getElementById("custom").addEventListener("change", handleRadios);
document.getElementById("current").addEventListener("change", handleRadios);
function handleRadios() {
    // function handleRadioButton() {
    if (document.getElementById("custom").checked) {
        document.getElementById("custom_location").disabled = false;
        document.getElementById("custom_location").required = true;
    }
    else {
        document.getElementById("custom_location").disabled = true;
        document.getElementById("custom_location").required = false;
        document.getElementById("custom_location").value = "";
    }
}
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var req = new XMLHttpRequest();
    var formData = new FormData(form);
    fetch("https://ipinfo.io/json?token=4916b89d62d548")
        .then(function (response) { return response.json(); })
        .then(function (jsonResponse) {
        var lat_longi_info = ["", ""];
        if (formData.get("location") == "current")
            lat_longi_info = jsonResponse.loc.split(",");
        console.log(lat_longi_info);
        var url = "/events?keyword=" +
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
        fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data);
            //             generateHTMLSearchList(data);
        });
    });
}, false);
// function generateHTMLSearchList(data) {
// //   document.getElementById("text").innerHTML = "";
// //   document.getElementById("image").innerHTML = "";
// //   document.getElementById("event_name").innerHTML = "";
//   let html_text = "";
//   if (
//     data == undefined ||
//     data._embedded == undefined ||
//     data._embedded.events == undefined
//   ) {
//     html_text +=
//       "<div class='no_records'><center>No records have been found</center></div><br/><br/><hr/>";
//   } else {
//     let jsonObj = data._embedded.events;
//
//     html_text +=
//       "<table border='1' style=\"width: 80%; border-collapse: collapse;\" >";
//
//     html_text +=
//       "<tr><th>Date</th><th>Icon</th><th>Event</th><th>Genre</th><th>Venue</th></tr>";
//
//     for (var i = 0; i < jsonObj.length; i++) {
//       html_text += "<tr>";
//       html_text +=
//         '<tr><td style="padding:10px;">' +
//         jsonObj[i].dates.start.localDate +
//         "&nbsp" +
//         jsonObj[i].dates.start.localTime +
//         "</td>" +
//         '<td style="padding:10px;"><img src=\'' +
//         jsonObj[i].images[0].url +
//         "' width=50 hieght=50/></td>" +
//         '<td style="padding:10px; text-align: left;">' +
//         '<a href="#text" id="event_link" onclick=loadDetails(\'' +
//         jsonObj[i].id +
//         "')>" +
//         jsonObj[i].name +
//         "</a></td>" +
//         '<td style="padding:10px;">' +
//         jsonObj[i].classifications[0].segment.name +
//         "</td>" +
//         '<td style="padding:10px; text-align: left;">' +
//         jsonObj[i]._embedded.venues[0].name +
//         "</td></tr>";
//     }
//     html_text += "</table>";
//   }
//   (<HTMLElement>document.getElementById("search_result")).innerHTML = html_text;
// }
