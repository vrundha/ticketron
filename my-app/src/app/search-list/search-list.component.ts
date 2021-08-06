import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  ticketResponse: any;
  test: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.test = "alse";
  }

  method() {
    console.log("method called");
  }

  updateResults(ticketResponse: any) {
    console.log(ticketResponse);
    this.ticketResponse = ticketResponse;
  }

}
