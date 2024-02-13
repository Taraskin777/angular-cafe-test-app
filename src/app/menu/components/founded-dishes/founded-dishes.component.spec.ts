import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundedDishesComponent } from './founded-dishes.component';

describe('FoundedDishesComponent', () => {
  let component: FoundedDishesComponent;
  let fixture: ComponentFixture<FoundedDishesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoundedDishesComponent]
    });
    fixture = TestBed.createComponent(FoundedDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
