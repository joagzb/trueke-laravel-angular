import {CommonModule} from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {PostRequestFilters} from '../../../../models/request_filters.js';
import {Subscription} from 'rxjs';
import {Room} from '../../../../models/piece.js';

@Component({
  selector: 'listing-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './listing-filter.component.html',
  styleUrl: './listing-filter.component.scss'
})
export class ListingFilterComponent implements OnInit, OnDestroy{
  @Output() filterFormChange= new EventEmitter<PostRequestFilters>();
  filterForm: FormGroup;
  private formSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder){
    this.filterForm = this.fb.group({
      sortBy: ['date'],
      location: [''],
      date: [''],
      room: ['']
    });
  }

  ngOnInit() {
    this.onFilterFormChange();

    // Subscribe to form changes
    this.formSubscription = this.filterForm.valueChanges.subscribe(() => {
      this.onFilterFormChange();
    });
  }

  ngOnDestroy() {
    // Unsubscribe from form changes subscription to prevent memory leaks
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  onFilterFormChange(): void {
    const filters: PostRequestFilters = {
      region: this.filterForm.get('location')?.value,
      sortBy: this.filterForm.get('sortBy')?.value,
      date: this.filterForm.get('date')?.value,
      room: this.filterForm.get('room')?.value,
    };

    this.filterFormChange.emit(filters);
  }

  getRooms(): string[]{
    return Object.values(Room);
  }

  getTodayDate(){
    return new Date();
  }

}
