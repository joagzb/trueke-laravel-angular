import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornitureGridComponent } from './forniture-grid.component';

describe('FornitureGridComponent', () => {
  let component: FornitureGridComponent;
  let fixture: ComponentFixture<FornitureGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornitureGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FornitureGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
