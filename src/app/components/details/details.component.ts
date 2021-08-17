import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Results } from '../../interfaces/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  @Input() character: Results;
  public star = 'star-outline';

  constructor( private modalCtrl: ModalController,
               private utilities: UtilitiesService,
               private dataLocal: DataLocalService ) { }

  ngOnInit() {}

  //Check if character exist in fav list
  async ionViewWillEnter() {
    const exit = await this.dataLocal.existCharacter( this.character.id )
    .then( exist => this.star = (exist) ? 'star' : 'star-outline');
  }

  close() {
    this.modalCtrl.dismiss();
  }

  //Add character to fav list ( local storage )
  setFavorite() {
    const exist = this.dataLocal.saveCharacter( this.character );
    this.star = (exist) ? 'star' : 'star-outline';
    this.utilities.emitFav( this.character );
  }

  isEmpty( label){
    return this.utilities.isEmpty( label );
  }

}
