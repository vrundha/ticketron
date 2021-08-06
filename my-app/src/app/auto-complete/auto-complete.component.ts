import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  autoComplete: any;

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  counter: number = 0;
  constructor(private service: ConfigService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }



  private _filter(value: string): string[] {
    if (this.counter == 1) {
      console.log("reset");
      this.counter = 0;
      return this.options;
      // const filterValue = value ? value.toLowerCase() : "";
      // return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    if (value != '') {
      var url = "/api/auto-complete?keyword=" + value;

      this.service.getURL(url).subscribe((autoComplete: any) => {
        this.options = autoComplete._embedded.attractions.map((element: any) => element.name);
        this.counter = 1;
        console.log(this.options);
        this.myControl.setValue(this.myControl.value);
      });


    }
    else {
      this.options = []
    }

    return this.options;

    // const filterValue = value ? value.toLowerCase() : "";
    // return this.options.filter(option => option.toLowerCase().includes(filterValue));

  }

}

