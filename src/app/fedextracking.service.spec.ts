import { TestBed } from '@angular/core/testing';

import { FedextrackingService } from './fedextracking.service';

describe('FedextrackingService', () => {
  let service: FedextrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FedextrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
