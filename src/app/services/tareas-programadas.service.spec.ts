import { TestBed } from '@angular/core/testing';

import { TareasProgramadasService } from './tareas-programadas.service';

describe('TareasProgramadasService', () => {
  let service: TareasProgramadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasProgramadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
