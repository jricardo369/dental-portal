import { TestBed } from '@angular/core/testing';

import { CajasChicasService } from './cajas-chicas.service';

describe('CajasChicasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CajasChicasService = TestBed.get(CajasChicasService);
    expect(service).toBeTruthy();
  });
});
