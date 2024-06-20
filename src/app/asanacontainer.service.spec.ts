import { TestBed } from '@angular/core/testing';

import { AsanacontainerService } from './asanacontainer.service';

describe('AsanacontainerService', () => {
  let service: AsanacontainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsanacontainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
