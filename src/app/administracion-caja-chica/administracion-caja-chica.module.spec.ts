import { AdministracionCajaChicaModule } from './administracion-caja-chica.module';

describe('AdministracionCajaChicaModule', () => {
  let administracionCajaChicaModule: AdministracionCajaChicaModule;

  beforeEach(() => {
    administracionCajaChicaModule = new AdministracionCajaChicaModule();
  });

  it('should create an instance', () => {
    expect(administracionCajaChicaModule).toBeTruthy();
  });
});
