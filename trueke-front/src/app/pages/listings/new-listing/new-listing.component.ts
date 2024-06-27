import {Component} from '@angular/core';
import {PostService} from '../../../services/post.service.js';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service.js';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {routesSchema} from '../../../config/routes.schema.js';
import {UserService} from '../../../services/user.service.js';
import {IPost, NewPostRequest} from '../../../models/post.js';
import {PieceService} from '../../../services/piece.service.js';
import {IPiece} from '../../../models/piece.js';
import {InputErrorMsgComponent} from '../../../shared/components/input-error-msg/input-error-msg.component.js';

@Component({
  selector: 'new-listing',
  standalone: true,
  imports: [ReactiveFormsModule, InputErrorMsgComponent],
  templateUrl: './new-listing.component.html',
  styleUrl: './new-listing.component.scss'
})
export class NewListingComponent {
  listingForm: FormGroup;
  post?: IPost;
  availablePieces: Omit<IPiece, 'user'>[] = [];
  selectedPieces: Omit<IPiece, 'user'>[] = [];

  constructor (
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private pieceService: PieceService
  ) {
    this.listingForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.max(255)]),
      description: new FormControl('', [Validators.minLength(5), Validators.max(255)]),
    });
  }

  ngOnInit(): void {
    this._loadPost();
    this._loadAvailablePieces();
  }

  private _loadAvailablePieces(): void {
    const userID = this.authService.currentUser.id; // Replace with actual user ID
    this.pieceService.getByFilter(userID).subscribe(response => {
      this.availablePieces = response;
    });
  }

  private _loadPost(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get('postID');
    if (postId) {
      this.postService.getByID(postId).subscribe(responsePost => {
        this.post = responsePost;
      });
      this.selectedPieces = this.post!.pieces;
    }
  }

  private _fillForm(): void {
    this.listingForm.patchValue({
      title: this.post?.title,
      description: this.post?.description,
    });
  }

  get formControls() {
    return this.listingForm.controls;
  }

  addPiece(event: any): void {
    const pieceId = event.target.value;
    const piece = this.availablePieces.find(p => p.id === pieceId);
    if (piece) {
      this.selectedPieces.push(piece);
      this.availablePieces = this.availablePieces.filter(p => p.id !== pieceId);
      event.target.value = ''; // Reset the select element value after selection
    }
  }

  removePiece(piece: Omit<IPiece, 'user'>): void {
    this.selectedPieces = this.selectedPieces.filter(p => p.id !== piece.id);
    this.availablePieces.push(piece);
  }

  onSubmit(): void {
    if (!this.listingForm.valid || this.selectedPieces.length < 1) {
      this.listingForm.markAllAsTouched();
      return;
    }

    const payload: NewPostRequest = {
      title: this.formControls['title'].value,
      description: this.formControls['description'].value,
      isActive: true,
      pieces: this.selectedPieces.map(piece => piece.id),
    };

    if (this.post) {
      // Edit existing post
      this.postService.update(this.post.id, payload).subscribe(() => {
        this.router.navigate([routesSchema.listings.detail.replace(':postID', this.post!.id)]);
      });
    } else {
      // Create new post
      this.postService.create(payload).subscribe(() => {
        this.router.navigate([routesSchema.listings.byUser.replace(':userID', this.authService.currentUser?.id.toString())]);
      });
    }

  }

  onCancel(): void {
    this.router.navigate([routesSchema.listings.byUser.replace(':userID', this.authService.currentUser?.id.toString())]);
  }
}
