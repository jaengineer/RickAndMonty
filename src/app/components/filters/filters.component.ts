/* eslint-disable @typescript-eslint/dot-notation */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {

  @Output() filter = new EventEmitter();
  public statuses = ['All','alive', 'dead', 'unknown'];
  public gender =   ['All','female', 'male', 'genderless', 'unknown'];
  public textSearch = '';
  public statusSelected = 'All';
  public genderSelected = 'All';
  public pathFilter = '';
  public objFilter = {};

  constructor() { }

  ngOnInit() {}

  //Set filters in real time ( filter by name, status, gender)
  emitFilter( event, key ) {
    if( event.detail.value === 'All' ) {
      delete this.objFilter[key];
    } else {
      this.objFilter[key] = event.detail.value;
    }
    this.filter.emit( this.objFilter );
  }

}
