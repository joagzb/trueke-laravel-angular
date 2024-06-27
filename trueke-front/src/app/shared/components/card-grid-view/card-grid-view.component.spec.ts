import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGridViewComponent } from './card-grid-view.component';

describe('CardGridViewComponent', () => {
  let component: CardGridViewComponent;
  let fixture: ComponentFixture<CardGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGridViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
