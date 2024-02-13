import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDishModalComponent } from './add-dish-modal.component';

describe('AddDishModalComponent', () => {
  let component: AddDishModalComponent;
  let fixture: ComponentFixture<AddDishModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDishModalComponent]
    });
    fixture = TestBed.createComponent(AddDishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
