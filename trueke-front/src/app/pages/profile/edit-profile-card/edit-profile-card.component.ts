import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../services/user.service.js';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputErrorMsgComponent} from '../../../shared/components/input-error-msg/input-error-msg.component.js';
import {getUserResponse, patchUserRequest} from '../../../models/user.js';
import {Router} from '@angular/router';
import {routesSchema} from '../../../config/routes.schema.js';
import {AuthService} from '../../../services/auth.service.js';

@Component({
  selector: 'edit-profile-card',
  standalone: true,
  imports: [ReactiveFormsModule, InputErrorMsgComponent],
  templateUrl: './edit-profile-card.component.html',
  styleUrl: './edit-profile-card.component.scss'
})
export class EditProfileCardComponent implements OnInit {
  @Input() user!: getUserResponse;
  @Output() showEditProfileTrigger = new EventEmitter<void>();
  updateForm: FormGroup;

  constructor (private userService: UserService, private authService: AuthService) {
    this.updateForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.max(255)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.max(255)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', [Validators.required, Validators.max(255)]),
      state: new FormControl('', [Validators.max(255)]),
      city: new FormControl('', [Validators.max(255)]),
      phone: new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.max(14)]),
      image: new FormControl('', [Validators.max(255)]),
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.updateForm.patchValue({
        name: this.user.name,
        lastname: this.user.surname,
        email: this.user.email,
        country: this.user.country,
        city: this.user.city,
        phone: this.user.phone,
        image: this.user.image,
      });
    }
  }

  get formControls() {
    return this.updateForm.controls;
  }

  onUpdateProfile() {
    if (!this.updateForm.valid) {
      console.log('error on update. form inputs are not valid');
      this.updateForm.markAllAsTouched();
      return;
    }

    const payload: patchUserRequest = {
      name: this.formControls['name'].value,
      surname: this.formControls['lastname'].value,
      country: this.formControls['country'].value,
      city: this.formControls['city'].value,
      email: this.formControls['email'].value,
      phone: this.formControls['phone'].value,
      image: this.formControls['image'].value,
    };

    this.userService.update(this.user.id, payload).subscribe(result => {
      this.authService.currentUser = result;
      console.log('Successfully updated!');
      console.log(result);
    });
  }

  onCancel() {
    this.showEditProfileTrigger.emit();
  }
}
