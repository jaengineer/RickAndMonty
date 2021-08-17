import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataLocalService } from 'src/app/services/data-local.service';
import { Menu } from '../../interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public options: Observable<Menu[]>;

  constructor( private dataService: DataLocalService ) { }

  //Get options menu from the data local
  async ngOnInit() {
    this.options = this.dataService.getMenuOptions();
  }

}
