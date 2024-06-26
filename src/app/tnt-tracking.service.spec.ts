import { TestBed } from '@angular/core/testing';

import { TntTrackingService } from './tnt-tracking.service';

describe('TntTrackingService', () => {
  let service: TntTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TntTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
