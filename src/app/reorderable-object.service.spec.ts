import { TestBed, inject } from '@angular/core/testing';

import { ReorderableObjectService } from './reorderable-object.service';

describe('ReorderableObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReorderableObjectService]
    });
  });

  it('should ...', inject([ReorderableObjectService], (service: ReorderableObjectService) => {
    expect(service).toBeTruthy();
  }));
});
