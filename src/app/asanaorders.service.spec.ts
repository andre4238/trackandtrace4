import { TestBed } from '@angular/core/testing';

import { AsanaordersService } from './asanaorders.service';

describe('AsanaordersService', () => {
  let service: AsanaordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsanaordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
