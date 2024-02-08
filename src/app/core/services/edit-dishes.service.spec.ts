import { TestBed } from '@angular/core/testing';

import { EditDishesService } from './edit-dishes.service';

describe('EditDishesService', () => {
  let service: EditDishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditDishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
