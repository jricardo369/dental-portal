import { TestBed } from '@angular/core/testing';

import { CustomI18nService } from './custom-i18n.service';

describe('CustomI18nService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomI18nService = TestBed.get(CustomI18nService);
    expect(service).toBeTruthy();
  });
});
