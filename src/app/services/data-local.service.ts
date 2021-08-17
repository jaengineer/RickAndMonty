/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Menu, Results } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public characters: Results[] = [];

  constructor( private http: HttpClient,
               private utilities: UtilitiesService,
               private translate: TranslateService,
               private storage: Storage ) {
               }

  getMenuOptions() {
    return this.http.get<Menu[]>('/assets/data/menu.json');
  }

  async loadFavorites() {

    let characters = null;

    characters = await this.storage.get('favorites');

    this.characters = characters || [];

    return characters;

  }

  //Check if character exist in fav list
  async existCharacter( id ) {

    id = Number(id);

    await this.loadFavorites();
    const exist = this.characters.find( c => c.id === id);

    return (exist) ? true: false;

  }

  //Save character in fav list ( local storage )
  saveCharacter( character: Results) {

    let exist = false;
    let msg = '';

    for( const c of this.characters ) {
      if( c.id === character.id ) {
        exist = true;
        break;
      }
    }

    if( exist ){
      this.characters = this.characters.filter( c => c.id !== character.id );
      msg = this.translate.instant('MESSAGES.favouritesDeleted');

    } else {
      this.characters.push( character );
      msg = this.translate.instant('MESSAGES.favouritesAdded');
    }

    this.utilities.notify( msg, 'toastSuccess', 4000, 'checkmark-circle-outline' );
    this.storage.set('favorites', this.characters );

    return !exist;

  }


}
