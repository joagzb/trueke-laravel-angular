import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditOfferComponent } from './create-or-edit-offer.component';

describe('CreateOrEditOfferComponent', () => {
  let component: CreateOrEditOfferComponent;
  let fixture: ComponentFixture<CreateOrEditOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOrEditOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
