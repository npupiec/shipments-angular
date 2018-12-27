import { TestBed, inject } from '@angular/core/testing';

import { PackageResolverService } from './package-resolver.service';

describe('PackageResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageResolverService]
    });
  });

  it('should be created', inject([PackageResolverService], (service: PackageResolverService) => {
    expect(service).toBeTruthy();
  }));
});
