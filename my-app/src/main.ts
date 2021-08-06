import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


var form = (<HTMLFormElement>document.getElementById('search'));

document.onload = () => {
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



var search_events = (<HTMLAnchorElement><unknown>document.getElementsByName("event_line")); 


};








// function generateHTMLSearchList(data: any) {
//   //   document.getElementById("text").innerHTML = "";
//   //   document.getElementById("image").innerHTML = "";
//   //   document.getElementById("event_name").innerHTML = "";
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
//     let table = document.createElement("table");
//     // TODO add style
//     let header = document.createElement("tr");
//     header.innerHTML = "<th>#</th><th>Date</th><th>Event</th><th>Category</th><th>Venue Info</th><th>Favorite</th>";
//     table.appendChild(header);
//     for (var i = 0; i < jsonObj.length; i++) {
//       let line = document.createElement("tr");

//       let td_number = document.createElement("td");
//       td_number.innerHTML = (i+1).toString();
//       line.appendChild(td_number);

//       let td_date = document.createElement("td");
//       td_date.innerHTML = (jsonObj[i].dates.start.localDate).toString();
//       line.appendChild(td_date);


//     }


//     html_text +=
//       "<table border='1' style=\"width: 80%; border-collapse: collapse;\" >";

//     html_text +=
//       "<tr><th>#</th><th>Date</th><th>Event</th><th>Category</th><th>Venue Info</th><th>Favorite</th></tr>";

//     for (var i = 0; i < jsonObj.length; i++) {
//       html_text += "<tr>";
//       html_text +=
//         '<tr><td style="padding:10px;">' + (i + 1) + '</td>' +
//         '<td style="padding:10px;">' +
//         jsonObj[i].dates.start.localDate +
//         "</td>" +
//         '<td style="padding:10px; text-align: left;">' +
//         '<a id="'+jsonObj[i].id+'")" href="#text" data-toggle="tooltip" title="'+jsonObj[i].name+'"name="event_link" (click)="loadDetails("'+
//         jsonObj[i].id +
//         "')>";
//         var name = jsonObj[i].name;
//         if (jsonObj[i].name.length > 35)
//           name = name.substring(0,35) + '...';

//         html_text += name;

//         html_text += "</a></td>" +
//         '<td style="padding:10px;">';


//       if (
//         jsonObj[i].classifications[0].subGenre != undefined &&
//         jsonObj[i].classifications[0].subGenre.name != undefined
//       )
//         html_text += jsonObj[i].classifications[0].subGenre.name;
//       if (
//         jsonObj[i].classifications[0].genre != undefined &&
//         jsonObj[i].classifications[0].genre.name != undefined
//       )
//         html_text += "&nbsp|&nbsp" + jsonObj[i].classifications[0].genre.name;
//       if (
//         jsonObj[i].classifications[0].segment != undefined &&
//         jsonObj[i].classifications[0].segment.name != undefined
//       )
//         html_text += "&nbsp|&nbsp" + jsonObj[i].classifications[0].segment.name;
//       if (
//         jsonObj[i].classifications[0].subType != undefined &&
//         jsonObj[i].classifications[0].subType.name != undefined
//       )
//         html_text += "&nbsp|&nbsp" + jsonObj[i].classifications[0].subType.name;
//       if (
//         jsonObj[i].classifications[0].type != undefined &&
//         jsonObj[i].classifications[0].type.name != undefined
//       )
//         html_text += "&nbsp|&nbsp" + jsonObj[i].classifications[0].type.name;

//       html_text += "</td>" +
//         '<td style="padding:10px; text-align: left;">' +
//         jsonObj[i]._embedded.venues[0].name +
//         "</td>";

//         var svg_star = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"> \
//                             <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/> \
//                         </svg>"'
//         var svg_star_fill = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> \
//                                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> \
//                              </svg>'

//         html_text += '<td><input type="checkbox" id="fav"/>' + svg_star + svg_star_fill + '</td>';
//         html_text += "</tr>" 
//       }
//     html_text += "</table>";
//   }
//   (<HTMLElement>document.getElementById("search_result")).innerHTML = html_text;

// }



