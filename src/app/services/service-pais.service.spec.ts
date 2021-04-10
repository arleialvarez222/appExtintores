import { TestBed } from '@angular/core/testing';

import { ServicePaisService } from './service-pais.service';

describe('ServicePaisService', () => {
  let service: ServicePaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
