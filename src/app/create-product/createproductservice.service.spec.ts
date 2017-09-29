import { TestBed, inject } from '@angular/core/testing';

import { CreateproductserviceService } from './createproductservice.service';

describe('CreateproductserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateproductserviceService]
    });
  });

  it('should be created', inject([CreateproductserviceService], (service: CreateproductserviceService) => {
    expect(service).toBeTruthy();
  }));
});
