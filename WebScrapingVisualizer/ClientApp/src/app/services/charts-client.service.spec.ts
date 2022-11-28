import { TestBed } from '@angular/core/testing';

import { ChartsClientService } from './charts-client.service';

describe('ChartsClientService', () => {
  let service: ChartsClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
