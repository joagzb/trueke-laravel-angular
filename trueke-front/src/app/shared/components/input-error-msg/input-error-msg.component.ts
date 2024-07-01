import {CommonModule} from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'input-error-msg',
  standalone: true,
  imports:[CommonModule],
  template: `
    <div *ngIf="control.invalid && (control.dirty || control.touched)" class="text-red-500 text-sm mt-2">
      <div *ngIf="control.errors?.['required']">{{ controlName }} is required</div>
      <div *ngIf="control.errors?.['minlength']">{{ controlName }} must be at least {{ control.errors?.['minlength'].requiredLength }} characters</div>
      <div *ngIf="control.errors?.['maxlength']">{{ controlName }} must have a maximun of {{ control.errors?.['maxlength'].requiredLength }} characters</div>
      <div *ngIf="control.errors?.['email']">Invalid email format</div>
      <div *ngIf="control.errors?.['pattern']">Invalid phone number</div>
    </div>
  `
})
export class InputErrorMsgComponent {
  @Input() control!: AbstractControl;
  @Input() controlName!: string;
}
