/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { DataLocalService } from 'src/app/services/data-local.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Results } from '../../interfaces/interfaces';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {

  public characters: Results[] = [];
  public fav: Subscription;

  constructor( private dataLocal: DataLocalService,
               private utilities: UtilitiesService,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.fav = this.utilities.geFav().subscribe( $event => {
      this.setFav( $event );
    });
  }

  async ionViewWillEnter(){
    this.characters = await this.dataLocal.loadFavorites();
  }

  ngOnDestroy() {
    this.fav.unsubscribe();
  }

  //Remove fav indicator in real time
  setFav( character ){
    const index = this.characters.findIndex(elem => elem.id === character.id);
    if( index !== -1 ) {
      this.characters.splice(index, 1);
    }
  }

  //Open character details
  async openDetails( character) {

    const modal = await this.modalCtrl.create({
      component: DetailsComponent,
      componentProps: {
        character
      }
    });

    modal.present();

  }

}
