import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikingRejectingOfferCardsComponent } from './liking-rejecting-offer-cards.component';

describe('LikingRejectingOfferCardsComponent', () => {
  let component: LikingRejectingOfferCardsComponent;
  let fixture: ComponentFixture<LikingRejectingOfferCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikingRejectingOfferCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikingRejectingOfferCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
