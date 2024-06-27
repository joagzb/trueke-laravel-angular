import {Component, EventEmitter, Output} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service.js';
import {NewUserPostRequest} from '../../../../models/auth.js';

@Component({
  selector: 'register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Output() isRegisterCardShown = new EventEmitter<boolean>();
  registerForm: FormGroup;

  constructor (private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  showSigninCardEvent(){
    this.isRegisterCardShown.emit(false);
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    const payload: NewUserPostRequest = {
      name: this.registerForm.get('name')?.value,
      surname: this.registerForm.get('surname')?.value,
      country: this.registerForm.get('country')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      password_confirmation: this.registerForm.get('password_confirmation')?.value,
     };

    this.authService.register(payload).subscribe(
      response => {
        console.log('User created successfully. You can now signin with new credentials', response);
        this.showSigninCardEvent();
      }
    );
  }

}
