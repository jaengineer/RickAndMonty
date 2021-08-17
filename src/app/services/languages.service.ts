/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  public defaultLang: string = 'en';

  constructor( private translate: TranslateService ) { }

  setInitialAppLanguage() {

    this.translate.setDefaultLang( this.defaultLang );

  }
}
