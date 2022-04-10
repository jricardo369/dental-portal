import { TestBed } from '@angular/core/testing';

import { ClasesGastoService } from './clases-gasto.service';

describe('ClasesGastoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClasesGastoService = TestBed.get(ClasesGastoService);
    expect(service).toBeTruthy();
  });
});
