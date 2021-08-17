/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-input-rename */
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-preload-image',
  templateUrl: './preload-image.component.html',
  styleUrls: ['./preload-image.component.scss'],
  animations: [
    trigger('imageAnimation',[
      state('show-image', style({
        opacity:'1',
      })),
      state('hide-image', style({
        opacity:'0'
      })),
      transition('show-image <=> hide-image', animate('1000ms ease-in')),
    ])
  ]
})
export class PreloadImageComponent implements OnInit {

  public imageCtrl = 'hide-image';
  public contentCtrl = 'show-image';
  @ViewChild('lImage',{static: true}) lImage: ElementRef;

  @Input('url') set url(url: string){
    if(url){
      this.loadImage(url);
    }
  }

    constructor() { }

    ngOnInit() {
        this.lImage.nativeElement.onload=()=>{
            this.imageCtrl='show-image';
            this.contentCtrl='hide-image';
        };
     }

    loadImage(urlImage){
        this.imageCtrl='hide-image';
        this.contentCtrl='show-image';
        this.lImage.nativeElement.src = urlImage;
    }

}
