import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CharacterComponent } from './character/character.component';
import { DetailsComponent } from './details/details.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { PreloadImageComponent } from './preload-image/preload-image.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    CharacterComponent,
    DetailsComponent,
    HeaderComponent,
    FiltersComponent,
    PreloadImageComponent,
    MenuComponent,
    PaginationComponent
  ],
  exports: [
    CharacterComponent,
    DetailsComponent,
    HeaderComponent,
    FiltersComponent,
    PreloadImageComponent,
    MenuComponent,
    PaginationComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    TranslateModule,
    RouterModule
  ]
})
export class ComponentsModule { }
