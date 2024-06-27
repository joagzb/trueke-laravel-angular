import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import {IPiece} from '../../../../models/piece.js';
import Swiper from 'swiper';

@Component({
  selector: 'piece-details',
  standalone: true,
  imports: [],
  templateUrl: './piece-details.component.html',
  styleUrl: './piece-details.component.scss'
})
export class PieceDetailsComponent{
  @Input() piece: IPiece | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }

  onDelete(){
    this.delete.emit();
  }

  onClose() {
    this.close.emit();
  }
}
