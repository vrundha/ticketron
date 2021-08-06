// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

// [START gae_node_request_example]
import Geohash from "latlon-geohash";
import express, { request } from "express";
const app = express();
import get from "axios";
import send from "send";
import SpotifyWebApi from "spotify-web-api-node";
import {} from 'path';

app.get("/api", (req, res) => {
  // res.status(200).send('{"a": 10}').end();
  var keyword = req.query.keyword;
  keyword = keyword.replace(" ", "+");
  var category = req.query.category;
  var segment_id = "";
  if (category == "Music") segment_id = "KZFzniwnSyZfZ7v7nJ";
  else if (category == "Sports") segment_id = "KZFzniwnSyZfZ7v7nE";
  else if (category == "Arts & Theatre") segment_id = "KZFzniwnSyZfZ7v7na";
  else if (category == "Film") segment_id = "KZFzniwnSyZfZ7v7nn";
  else if (category == "Miscellaneous") segment_id = "KZFzniwnSyZfZ7v7n1";

  var radius = req.query.distance;
  if (radius == 'null' || radius == undefined || radius == null || radius == ''){
    radius = 10; 
  }




  var unit = req.query.unit;
  if (unit == 'null' || unit == undefined || unit == null || unit == '' || unit == 'Miles') 
    unit = "miles";
  if(unit=='Kilometers')
    unit = "km";
  
    console.log(radius)
    console.log(unit)
  var lat = req.query.lat;
  var lng = req.query.lng;
  var custom_location = req.query.custom_location;
  var address = "";
  var precision = 5;
  if (custom_location != "" && lat == "") {
    address = custom_location.replace(" ", "+");
    var url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "&key=AIzaSyDH-frknS5aEnjhV9UqY01rAFJdadMVOSk";

    get(url)
      .then(function (response) {
        // handle success
        var loc = response.data;
        lat = loc["results"][0]["geometry"]["location"]["lat"];
        lng = loc["results"][0]["geometry"]["location"]["lng"];

        const geo_hash = Geohash.encode(lat, lng, precision);
        var url =
          "https://app.ticketmaster.com/discovery/v2/events.json?apikey=kQ4FFAgWbn1TmcHvI366QPyPQ8zI4GMo&keyword=" +
          keyword +
          "&SegmentId=" +
          segment_id +
          "&radius=" +
          radius +
          "&unit=" +
          unit +
          "&geoPoint=" +
          geo_hash;

        get(url)
          .then(function (response) {
            res.end(JSON.stringify(response.data, null, 3));
          })
          .catch(function (error) {
            console.log("ERROR!!");
            console.log(error);
          });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  } else {
    const geo_hash = Geohash.encode(lat, lng, precision);
    var url =
      "https://app.ticketmaster.com/discovery/v2/events.json?apikey=kQ4FFAgWbn1TmcHvI366QPyPQ8zI4GMo&keyword=" +
      keyword +
      "&SegmentId=" +
      segment_id +
      "&radius=" +
      radius +
      "&unit=" +
      unit +
      "&geoPoint=" +
      geo_hash;
    get(url)
      .then(function (response) {
        res.end(JSON.stringify(response.data, null, 3));
      })
      .catch(function (error) {
        // handle error

        console.log("ERROR!!");
        // console.log(error);
      });
  }
});

app.get("/api/spotify", (req, res) => {
  
  console.log("spot");
  var spotifyApi = new SpotifyWebApi({
    clientId: "68119cbb3a0048be9c1a3d8216d72b15",
    clientSecret: "55c8aad3885f42e28ed7ecf07dc5d4a2",
    // redirectUri: 'http://www.example.com/callback'
  });

  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      
      spotifyApi.searchArtists(req.query.attraction).then(
        function (data) {
          console.log('Search artists by "Love"', data.body);
          res.end(JSON.stringify(data.body, null, 3));
        },
        function (err) {
          console.error(err);
        }
      );
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );


});

app.get("/api/venue", (req, res) => {
  var url =
    "https://app.ticketmaster.com/discovery/v2/venues/" +
    req.query.venueid +
    "?apikey=kQ4FFAgWbn1TmcHvI366QPyPQ8zI4GMo"; // eg: id=KovZpZAJeldA
  get(url)
    .then(function (response) {
      // console.log(url, response.data);
      res.end(JSON.stringify(response.data, null, 3));
    })
    .catch(function (error) {
      console.log("ERROR!!");
      console.log(error);
    });
});

app.get("/api/details", (req, res) => {
  var url =
    "https://app.ticketmaster.com/discovery/v2/events/" +
    req.query.eventid +
    "?apikey=kQ4FFAgWbn1TmcHvI366QPyPQ8zI4GMo";
  get(url)
    .then(function (response) {
      // console.log(url, response.data);
      res.end(JSON.stringify(response.data, null, 3));
    })
    .catch(function (error) {
      console.log("ERROR!!");
      console.log(error);
    });
});

app.get("/api/auto-complete", (req, res) => {
  var url =
    "https://app.ticketmaster.com/discovery/v2/suggest?apikey=kQ4FFAgWbn1TmcHvI366QPyPQ8zI4GMo&keyword=" +
    req.query.keyword;
  get(url)
    .then(function (response) {
      // console.log(url, response.data);
      res.end(JSON.stringify(response.data, null, 3));
    })
    .catch(function (error) {
      console.log("ERROR!!");
      console.log(error);
    });
});

app.use('/', express.static('my-app/dist/my-app'));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
// [END gae_node_request_example]

export default app;
