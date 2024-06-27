import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileCardComponent } from './edit-profile-card.component';

describe('EditProfileCardComponent', () => {
  let component: EditProfileCardComponent;
  let fixture: ComponentFixture<EditProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
