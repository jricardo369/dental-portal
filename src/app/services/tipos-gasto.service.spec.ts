import { TestBed } from '@angular/core/testing';

import { TiposGastoService } from './tipos-gasto.service';

describe('TiposGastoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiposGastoService = TestBed.get(TiposGastoService);
    expect(service).toBeTruthy();
  });
});
