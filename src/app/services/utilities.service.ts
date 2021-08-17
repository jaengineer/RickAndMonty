import { EventEmitter, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Results } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  public fav: EventEmitter<Results> = new EventEmitter<Results>();

  constructor( public toastController: ToastController ) { }

  isEmpty(str) {
    return !str.trim().length;
  }

  async notify( msg, styleClass, time, icon ) {
    const toast = await this.toastController.create({
      message: msg,
      duration: time,
      cssClass: styleClass,
      buttons: [
        {
          side: 'start',
          icon
        }, {
          text: 'Close',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    toast.present();
  }

  geFav() {
    return this.fav;
  }
  emitFav( $event) {
    this.fav.emit( $event );
  }

}
