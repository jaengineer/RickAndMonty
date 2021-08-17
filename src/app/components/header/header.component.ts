import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Output() setFilter = new EventEmitter();
  public showFilter = false;

  constructor() { }

  ngOnInit() {}

  filter() {
    this.showFilter = !this.showFilter;
    this.setFilter.emit( this.showFilter );
  }

}
