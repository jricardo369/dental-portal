import { CajaChicaModule } from './caja-chica.module';

describe('CajaChicaModule', () => {
  let cajaChicaModule: CajaChicaModule;

  beforeEach(() => {
    cajaChicaModule = new CajaChicaModule();
  });

  it('should create an instance', () => {
    expect(cajaChicaModule).toBeTruthy();
  });
});
