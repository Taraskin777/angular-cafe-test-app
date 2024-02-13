import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDishModalComponent } from './edit-dish-modal.component';

describe('EditDishModalComponent', () => {
  let component: EditDishModalComponent;
  let fixture: ComponentFixture<EditDishModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDishModalComponent]
    });
    fixture = TestBed.createComponent(EditDishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
