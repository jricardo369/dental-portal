import { TestBed } from '@angular/core/testing';

import { TiposDeViajeService } from './tipos-de-viaje.service';

describe('TiposDeViajeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiposDeViajeService = TestBed.get(TiposDeViajeService);
    expect(service).toBeTruthy();
  });
});
