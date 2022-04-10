import { AdministracionViajesModule } from './administracion-viajes.module';

describe('AdministracionViajesModule', () => {
  let administracionViajesModule: AdministracionViajesModule;

  beforeEach(() => {
    administracionViajesModule = new AdministracionViajesModule();
  });

  it('should create an instance', () => {
    expect(administracionViajesModule).toBeTruthy();
  });
});
