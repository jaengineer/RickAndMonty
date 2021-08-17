/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Characters } from '../../interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { Subscription } from 'rxjs';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public characters: Characters;
  public fav: Subscription;
  public page = 1;
  public pathFilter = {};
  public showFilters = false;

  constructor( private api: ApiService,
               private utilities: UtilitiesService,
               private dataLocal: DataLocalService ) { }

  ngOnInit() {
    this.fav = this.utilities.geFav().subscribe( $event => {
      this.setFav( $event );
    });
    this.getCharacters();
  }

  //Get characters list from API ( pages, filters)
  async getCharacters() {

    (await this.api.getCharacters( this.page, this.pathFilter )).subscribe(resp => {

      this.characters = resp;
      this.initFav();

    }, err => {});

  }

  //Change page
  setPage( event ) {
    this.page = event;
    this.getCharacters();
  }

  //Show filters box
  setFilter( event ){
    this.showFilters = event;
  }

  //Get characters list using filters
  filter( event ) {

    this.characters = null;
    this.pathFilter = event;
    this.getCharacters();

  }

  //init an indicator for each character added to fav list
  async initFav(){
    const favList = await this.dataLocal.loadFavorites();

    favList.forEach(fav => {
      const index = this.characters.results.findIndex(item => item.id === fav.id);
      if( index !== -1 ){
        this.characters.results[index]['fav'] = true;
      }
    });
  }

  //Set fav indicator in real time
  setFav( character ){
    const index = this.characters.results.findIndex(elem => elem.id === character.id);
    if( index !== -1 ) {

      if( this.characters.results[index]['fav'] ) {
        delete this.characters.results[index]['fav'];
      } else {
        this.characters.results[index]['fav'] = true;
      }

    }
  }


}
