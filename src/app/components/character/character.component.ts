import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Characters } from '../../interfaces/interfaces';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {

  @Input() characters: Characters;

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

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
