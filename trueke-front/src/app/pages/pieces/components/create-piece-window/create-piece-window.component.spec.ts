import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePieceWindowComponent } from './create-piece-window.component';

describe('CreatePieceWindowComponent', () => {
  let component: CreatePieceWindowComponent;
  let fixture: ComponentFixture<CreatePieceWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePieceWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePieceWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
