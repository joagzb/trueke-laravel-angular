import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfileCardComponent } from './show-profile-card.component';

describe('ShowProfileCardComponent', () => {
  let component: ShowProfileCardComponent;
  let fixture: ComponentFixture<ShowProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProfileCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
