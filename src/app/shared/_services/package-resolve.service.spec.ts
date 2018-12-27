import { TestBed, inject } from '@angular/core/testing';

import { PackageResolveService } from './package-resolve.service';

describe('PackageResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageResolveService]
    });
  });

  it('should be created', inject([PackageResolveService], (service: PackageResolveService) => {
    expect(service).toBeTruthy();
  }));
});
