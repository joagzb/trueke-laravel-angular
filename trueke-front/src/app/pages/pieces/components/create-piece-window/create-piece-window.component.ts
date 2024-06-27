import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PieceService} from '../../../../services/piece.service.js';
import {Router} from '@angular/router';
import {IPiece, NewPieceRequest, Room, patchPieceRequest} from '../../../../models/piece.js';
import {InputErrorMsgComponent} from '../../../../shared/components/input-error-msg/input-error-msg.component.js';

@Component({
  selector: 'create-piece-window',
  standalone: true,
  imports: [ReactiveFormsModule, InputErrorMsgComponent],
  templateUrl: './create-piece-window.component.html',
  styleUrl: './create-piece-window.component.scss'
})
export class CreatePieceWindowComponent implements OnInit {
  @Input() piece: IPiece | null = null;
  @Output() close = new EventEmitter<void>();
  pieceForm: FormGroup;
  rooms: Room[] = Object.values(Room);

  constructor (
    private fb: FormBuilder,
    private pieceService: PieceService,
    private router: Router
  ) {
    this.pieceForm = this.fb.group({
      title: ['', [Validators.min(3), Validators.required, Validators.max(255)]],
      description: ['', [Validators.min(6), Validators.required, Validators.max(255)]],
      material: ['', [Validators.min(3), Validators.max(255)]],
      brand: ['', [Validators.min(3), Validators.max(255)]],
      price: [null],
      room: ['', Validators.max(255)],
      imageURL: ['', [Validators.required, Validators.max(255)]],
    });
  }

  ngOnInit(): void {
    if (this.piece) {
      this.pieceForm.patchValue({
        title: this.piece.title,
        description: this.piece.description,
        material: this.piece.material,
        brand: this.piece.brand,
        price: this.piece.price,
        room: this.piece.room,
        imageURL: this.piece.imageURL,
      });
    }
  }

  get formControls() {
    return this.pieceForm.controls;
  }

  onSubmit() {
    if (!this.pieceForm.valid) {
      this.pieceForm.markAllAsTouched();
      return;
    }

    if (this.piece) {
      // Edit existing piece
      const payload: patchPieceRequest = this.pieceForm.value;
      this.pieceService.update(this.piece.id, payload).subscribe(() => {
        console.log('Sucessfully updated');
      });
    } else {
      // Create new piece
      const payload: NewPieceRequest = this.pieceForm.value;
      this.pieceService.create(payload).subscribe((newPiece) => {
        console.log('Sucessfully created', newPiece);
        this.onCancel();
      });
    }

  }

  onCancel() {
    this.close.emit();
  }
}
