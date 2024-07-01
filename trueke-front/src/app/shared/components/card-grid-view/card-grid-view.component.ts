import {CommonModule} from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {IPost} from '../../../models/post.js';
import {IPiece} from '../../../models/piece.js';
import {IOffer} from '../../../models/offer.js';

export class CardGridElement {
  id: string;
  title: string;
  description: string;
  image: string;
  extraInformation: string;
  tags: string[];
  notification?: {
    message: string,
    type: string,
    object: any,
  };

  constructor(post: IPost);
  constructor(piece: IPiece);
  constructor(data: IPost | IPiece) {
    if ('pieces' in data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.image = data.pieces[0].imageURL;
      this.extraInformation = `${data.user.country} ${data.user.city}`;
      this.tags = data.pieces.map(piece => piece.room ?? '');
      this.notification = data.offers.length>0 ? this.offer2Notification(data.offers) : undefined;
    } else {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.image = data.imageURL;
      this.extraInformation = '';
      this.tags = data.room ? [data.room] : [];
      this.notification = undefined;
    }
  }

  private offer2Notification(offers: Omit<IOffer, 'post' | 'user'>[]){
    return {
      message: `offers received ${offers.length}`,
      type: 'offer',
      object: offers,
    }
  }
}

@Component({
  selector: 'card-grid-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-grid-view.component.html',
  styleUrl: './card-grid-view.component.scss'
})
export class CardGridViewComponent {
  @Input() items: CardGridElement[] | undefined;
  @Output() onItemClick = new EventEmitter<string>();
  @Output() onNotificationClick = new EventEmitter<string>();
  @Input() mustShowNotification = false;

  constructor(){}

  itemClick(itemID:string):void{
    this.onItemClick.emit(itemID)
  }

  notificationCallback(itemId: string):void{
    this.onNotificationClick.emit(itemId);
  }


}
