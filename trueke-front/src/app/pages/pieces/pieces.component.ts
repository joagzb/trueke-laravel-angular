import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Observable, map} from 'rxjs';
import {IPiece} from '../../models/piece.js';
import {PieceService} from '../../services/piece.service.js';
import {AuthService} from '../../services/auth.service.js';
import {PieceDetailsComponent} from './components/piece-details/piece-details.component.js';
import {CreatePieceWindowComponent} from './components/create-piece-window/create-piece-window.component.js';
import {ShowLoadingSpinnerDirective} from '../../directives/show-loading-spinner.directive.js';
import {CardGridElement, CardGridViewComponent} from '../../shared/components/card-grid-view/card-grid-view.component.js';

@Component({
  selector: 'pieces',
  standalone: true,
  imports: [CommonModule, ShowLoadingSpinnerDirective, PieceDetailsComponent, CreatePieceWindowComponent, CardGridViewComponent],
  templateUrl: './pieces.component.html',
  styleUrl: './pieces.component.scss'
})
export class PiecesComponent implements OnInit {
  pieces$: Observable<CardGridElement[]> | undefined;
  selectedPiece: IPiece | null = null;
  creatingModalShown: boolean = false;

  constructor (private pieceService: PieceService, private authService: AuthService) {}

  ngOnInit(): void {
    this._loadPieces();
  }

  private _loadPieces(): void {
    const userID = this.authService.currentUser.id;
    if (userID) {
      this.pieces$ = this.pieceService.getByUser(userID).pipe(
        map(pieces => pieces.map(piece => new CardGridElement(piece)))
      );
    }
  }

  onPieceClick(pieceID: string): void {
    this.pieceService.getByID(pieceID).subscribe(
      (piece) => {
        this.selectedPiece = piece;
      });
  }

  onCloseDetailModal(): void {
    this.selectedPiece = null;
  }

  onCloseCreatingModal(): void {
    this.creatingModalShown = false;
    this.selectedPiece = null;
    this._loadPieces();
  }

  onCreatePieceClick() {
    this.creatingModalShown = true;
  }

  onEditPiece() {
    this.creatingModalShown = true;
  }

  onDeletePiece(){
    if(this.selectedPiece){
      this.pieceService.delete(this.selectedPiece.id).subscribe(()=>{
        console.log('deleted piece' + this.selectedPiece?.id);

        this.pieces$ = this.pieces$?.pipe(
          map(pieces => pieces.filter(piece => piece.id !== this.selectedPiece?.id))
        );

        this.creatingModalShown = false;
        this.selectedPiece = null;
      });
    }
  }
}
