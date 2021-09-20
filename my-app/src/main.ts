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



