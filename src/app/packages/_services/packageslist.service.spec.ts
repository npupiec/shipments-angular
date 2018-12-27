import { TestBed, inject } from '@angular/core/testing';

import { PackageslistService } from './packageslist.service';

describe('PackageslistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageslistService]
    });
  });

  it('should be created', inject([PackageslistService], (service: PackageslistService) => {
    expect(service).toBeTruthy();
  }));
});
