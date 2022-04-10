import { TestBed } from '@angular/core/testing';

import { GastosCajasService } from './gastos-cajas.service';

describe('GastosCajasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GastosCajasService = TestBed.get(GastosCajasService);
    expect(service).toBeTruthy();
  });
});
