import { TestBed } from '@angular/core/testing';

import { SecuriteGuard } from './securite.guard';

describe('SecuriteGuard', () => {
  let guard: SecuriteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecuriteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
