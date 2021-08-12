import { TestBed } from '@angular/core/testing';

import { GuardsComponentGuard } from './guards-component.guard';

describe('GuardsComponentGuard', () => {
  let guard: GuardsComponentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardsComponentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
