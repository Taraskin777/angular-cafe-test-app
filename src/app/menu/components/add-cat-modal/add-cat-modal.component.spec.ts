import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatModalComponent } from './add-cat-modal.component';

describe('AddCatModalComponent', () => {
  let component: AddCatModalComponent;
  let fixture: ComponentFixture<AddCatModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCatModalComponent]
    });
    fixture = TestBed.createComponent(AddCatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
