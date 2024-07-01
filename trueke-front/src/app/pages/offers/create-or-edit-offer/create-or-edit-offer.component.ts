import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {InputErrorMsgComponent} from '../../../shared/components/input-error-msg/input-error-msg.component.js';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PieceService} from '../../../services/piece.service.js';
import {OfferService} from '../../../services/offer.service.js';
import { Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service.js';
import {IPiece} from '../../../models/piece.js';
import {IOffer, newOfferRequest} from '../../../models/offer.js';
import {IPost} from '../../../models/post.js';
import {Location} from '@angular/common';

@Component({
  selector: 'create-or-edit-offer-modal',
  standalone: true,
  imports: [ReactiveFormsModule, InputErrorMsgComponent],
  templateUrl: './create-or-edit-offer.component.html',
  styleUrl: './create-or-edit-offer.component.scss'
})
export class CreateOrEditOfferComponent implements OnInit {
  @Input() offer: IOffer | undefined;
  @Input() post: IPost | undefined;
  @Output() onModalClose = new EventEmitter<void>();
  offerForm: FormGroup;
  availablePieces: Omit<IPiece, 'user'>[] = [];
  selectedPieces: Omit<IPiece, 'user'>[] = [];

  constructor (private fb: FormBuilder,
    private pieceService: PieceService,
    private offerService: OfferService,
    private router: Router,
    private location: Location,
    private authService: AuthService) {
    this.offerForm = this.fb.group({
      message: ['', [Validators.required, Validators.min(8), Validators.max(255)]],
    });
  }

  ngOnInit(): void {
    this._loadAvailablePieces();
    if (this.offer) {
      this._preloadForm(this.offer);
    }
  }

  private _preloadForm(offer: IOffer): void {
    this.offerForm.patchValue({
      message: offer.message
    });
    this.selectedPieces = offer.pieces;
    this.availablePieces = this.availablePieces.filter(piece => this.selectedPieces.find(selectedPiece => selectedPiece.id === piece.id));
  }

  private _loadAvailablePieces(): void {
    const userID = this.authService.currentUser.id;
    if (userID) {
      this.pieceService.getByFilter(userID, {}).subscribe(response => {
        this.availablePieces = response;
      });
    } else {
      console.log('you cannot make any offer because you dont have any piece of forniture available to exchange');
      this.location.back();
    }

  }

  addPiece(event: any): void {
    const pieceId = event.target.value;
    const selectedPiece = this.availablePieces.find(piece => piece.id === pieceId);
    if (selectedPiece) {
      this.selectedPieces.push(selectedPiece);
      this.availablePieces = this.availablePieces.filter(piece => piece.id !== pieceId);
    }
  }

  removePiece(piece: any): void {
    this.selectedPieces = this.selectedPieces.filter(p => p.id !== piece.id);
    this.availablePieces.push(piece);
  }

  onSubmit(): void {
    if (!this.offerForm.valid) {
      this.offerForm.markAllAsTouched();
      return;
    }

    const payload: newOfferRequest = {
      message: this.offerForm.controls['message'].value,
      pieces: this.selectedPieces.map(piece => piece.id),
      post_id: this.post!.id,
    };

    if (this.offer) {
      this.offerService.update(this.offer.id, payload).subscribe(response => {
        console.log('offer updated');
        this.onCancel();
      });
    } else {
      this.offerService.create(payload).subscribe(response => {
        console.log('offer created');
        this.onCancel();
      });
    }
  }

  onCancel(): void {
    this.onModalClose.emit();
  }
}
