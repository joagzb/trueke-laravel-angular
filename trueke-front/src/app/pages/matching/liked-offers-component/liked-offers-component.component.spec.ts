import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedOffersComponentComponent } from './liked-offers-component.component';

describe('LikedOffersComponentComponent', () => {
  let component: LikedOffersComponentComponent;
  let fixture: ComponentFixture<LikedOffersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedOffersComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikedOffersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
