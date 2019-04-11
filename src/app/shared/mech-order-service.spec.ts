import { TestBed } from '@angular/core/testing';

import { MechOrderService } from './mech-order-service';

describe('MechOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MechOrderService = TestBed.get(MechOrderService);
    expect(service).toBeTruthy();
  });
});
