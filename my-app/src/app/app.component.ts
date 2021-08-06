import { Component } from '@angular/core';
import { response } from 'express';
import { ConfigService } from './config.service';
import { SearchListComponent } from './search-list/search-list.component';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { } from 'google.maps';
import * as $ from 'jquery';
import {RoundProgressModule} from 'angular-svg-round-progressbar';



const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class AppComponent {

  show_results = false;
  show_details = false;
  show_details_button = false;
  ticketResponse: any = {};
  ticketSingleEvent: any = {};
  ticketVenue: any = {};
  spotifyDetails: any = {};
  favorites: any = {};
  counter: number = 0;
  activeTab: string = "results";
  showProgress: boolean = false;

  constructor(private service: ConfigService, private searchListComponent: SearchListComponent) { }
  formSubmit() {
    this.showProgress = true;
    this.ticketSingleEvent = {};
    this.service.getIPInfo().subscribe(response => this.callTicketmaster(response))
  }
  ngOnInit() {
    this.handleSubmitButton();
  }

  private callTicketmaster(response: any) {
    var form = (<HTMLFormElement>document.getElementById('search'));
    var formData = new FormData(form);
    let lat_longi_info = ["", ""];
    if (formData.get("location") == "current")
      lat_longi_info = response.loc.split(",");

    var url =
      "/api?keyword=" +
      formData.get("keyword") +
      "&category=" +
      formData.get("category") +
      "&distance=" +
      (<HTMLInputElement>document.getElementById("distance")).value +
      "&custom_location=" +
      (<HTMLInputElement>document.getElementById("custom_location")).value +
      "&lat=" +
      lat_longi_info[0] +
      "&lng=" +
      lat_longi_info[1] +
      "&unit=" +
      (<HTMLInputElement>document.getElementById("unit")).value;
    console.log((<HTMLInputElement>document.getElementById("unit")).value);

    this.service.getURL(url).subscribe((ticketResponse: any) => {
      // this.ticketResponse = ticketResponse;
      console.log("called");
      if (ticketResponse._embedded) {
        console.log(ticketResponse._embedded.events);
        ticketResponse._embedded.events.sort(function (a: any, b: any) {
          let dateA = new Date(a.dates.start.localDate), dateB = new Date(b.dates.start.localDate);
          return (dateA.getTime() - dateB.getTime()); //sort by date ascending
        });
        this.ticketResponse = ticketResponse._embedded.events;
      }
      else {
        this.ticketResponse = {}
      }

      this.showProgress = false;
      this.show_results = true;
      this.show_details_button = false;
      // console.log(this.ticketResponse);
    })
  }

  public loadDetails(id: string) {

    var url = "/api/details?eventid=" + id;

    this.service.getURL(url).subscribe(ticketSingleEvent => {
      this.show_details_button = true;
      this.ticketSingleEvent = ticketSingleEvent;
      this.show_results=true;
      console.log("Event");

      // console.log(this.ticketSingleEvent);
    });
  }

  public venueDetails(id: string) {

    var url = "/api/venue?venueid=" + id;

    this.service.getURL(url).subscribe(ticketVenue => {
      this.ticketVenue = ticketVenue;
      console.log("Venue")
      console.log(this.ticketVenue);
      this.initMap(parseFloat(this.ticketVenue. ), parseFloat(this.ticketVenue.location.longitude));
    });
  }

  sliderReset() {
    this.counter = 0;
  }

  sliderNext() {
    this.counter = 1;
  }

  sliderPrevious() {
    this.counter = 0;
  }


  // Initialize and add the map
  initMap(latitude: number, longitude: number): void {
    // The location of Uluru
    const uluru = { lat: latitude, lng: longitude };
    console.log(uluru);
    // The map, centered at Uluru
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 4,
        center: uluru,
      }
    );

    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });

    // console.log("map")
  }

  public spotify(attraction: string) {
    var url = "/api/spotify?attraction=" + attraction;

    this.service.getURL(url).subscribe(spotifyDetails => {
      this.spotifyDetails = spotifyDetails;
      console.log("Spotify");
      console.log(this.spotifyDetails);
    });
  }

  public handleRadios() {

    if ((<HTMLInputElement>document.getElementById("custom")).checked) {
      (<HTMLInputElement>document.getElementById("custom_location")).disabled = false;
      (<HTMLInputElement>document.getElementById("custom_location")).required = true;
      // (<HTMLInputElement>document.getElementById("submit")).disabled = true;
    } else {
      (<HTMLInputElement>document.getElementById("custom_location")).disabled = true;
      (<HTMLInputElement>document.getElementById("custom_location")).required = false;
      (<HTMLInputElement>document.getElementById("custom_location")).value = "";
      // (<HTMLInputElement>document.getElementById("submit")).disabled = false;
    }
  }

  handleSubmitButton() {
    console.log("chnaged");

    if ((<HTMLInputElement>document.getElementById("keyword")).value == ''
      || ((<HTMLInputElement>document.getElementById("custom")).checked) && (<HTMLInputElement>document.getElementById("custom_location")).value == '') {
      (<HTMLInputElement>document.getElementById("submit")).disabled = true;

    }
    else {

      (<HTMLInputElement>document.getElementById("submit")).disabled = false;
    }


  }

  handleCustomLoc() {
    (<HTMLInputElement>document.getElementById("custom_location")).required = false;
    (<HTMLInputElement>document.getElementById("custom_location")).disabled = true;
  }



  addFavorite(response: any) {
    console.log(response);
    let storage = localStorage.getItem("favorites");
    if (!storage) storage = "[]";
    let fav = JSON.parse(storage);
    fav.push(response);
    localStorage.setItem("favorites", JSON.stringify(fav));

  }

  removeFavorite(id: any) {
    console.log(id)
    let storage = localStorage.getItem("favorites");
    if (!storage) storage = "[]";
    let fav = JSON.parse(storage);
    fav = fav.filter((item: any) => item.id != id);
    localStorage.setItem("favorites", JSON.stringify(fav));
  }

  getFavorites() {
    let storage = localStorage.getItem("favorites");
    if (!storage) storage = "[]";
    let fav = JSON.parse(storage);
    this.favorites = fav;
    console.log(this.favorites);
  }


  isFavorite(id: string) {
    let found = false;
    let storage = localStorage.getItem("favorites");
    if (!storage) storage = "[]";
    let fav = JSON.parse(storage);
    fav.forEach((item: any) => {
      if (item.id == id) {
        found = true;
        // break;
      }

    });
    return found;
  }



  validate_form() {
    var form = (<HTMLFormElement>document.getElementById('search'));

    var event = jQuery.Event("submit");
    // form.addEventListener('submit', function (event) {
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
    // }, false);

  }





}


// Spotify
// Client ID 68119cbb3a0048be9c1a3d8216d72b15
// Client Secret 55c8aad3885f42e28ed7ecf07dc5d4a2 