import {Component, EventEmitter, Output} from '@angular/core';
import {ReactiveFormsModule, FormGroup, Validators, FormControl} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service.js';
import {SigninPostRequest} from '../../../../models/auth.js';
import {Router} from '@angular/router';
import {routesSchema} from '../../../../config/routes.schema.js';
import {getUserResponse} from '../../../../models/user.js';

@Component({
  selector: 'signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  @Output() isRegisterCardShown= new EventEmitter<boolean>();
  signinForm: FormGroup;

  constructor (private authService: AuthService,private router: Router) {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  showRegisterCardEvent() {
    this.isRegisterCardShown.emit(true);
  }

  onSubmit() {
    if (!this.signinForm.valid) {
      return;
    }

    const payload: SigninPostRequest = {
      email: this.signinForm.get('email')?.value,
      password: this.signinForm.get('password')?.value,
    };

    this.authService.signin(payload).subscribe(
      _ => {
        this.router.navigate([routesSchema.home],{replaceUrl:true,skipLocationChange:true});
      }
    );
  }
}
