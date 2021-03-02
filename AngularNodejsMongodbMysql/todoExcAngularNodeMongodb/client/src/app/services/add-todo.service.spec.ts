import { TestBed } from '@angular/core/testing';

import { AddTodoService } from './add-todo.service';

describe('AddTodoService', () => {
  let service: AddTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
