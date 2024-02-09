import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatModalComponent } from './edit-cat-modal.component';

describe('EditCatModalComponent', () => {
  let component: EditCatModalComponent;
  let fixture: ComponentFixture<EditCatModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCatModalComponent]
    });
    fixture = TestBed.createComponent(EditCatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
