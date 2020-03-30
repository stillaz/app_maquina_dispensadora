import { TestBed } from '@angular/core/testing';

import { LogueoService } from './logueo.service';

describe('LogueoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogueoService = TestBed.get(LogueoService);
    expect(service).toBeTruthy();
  });
});
