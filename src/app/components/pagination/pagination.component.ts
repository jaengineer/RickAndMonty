import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {

  @Input() pages: number;
  @Output() setPage = new EventEmitter();
  public page = 1;

  constructor() { }

  ngOnInit() {}

  next() {
    this.page++;
    this.setPage.emit( this.page );
  }

  prev( page ) {
    this.page--;
    this.setPage.emit( this.page );
  }

}
