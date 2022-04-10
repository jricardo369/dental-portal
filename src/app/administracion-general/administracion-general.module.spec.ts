import { AdministracionGeneralModule } from './administracion-general.module';

describe('AdministracionGeneralModule', () => {
  let administracionGeneralModule: AdministracionGeneralModule;

  beforeEach(() => {
    administracionGeneralModule = new AdministracionGeneralModule();
  });

  it('should create an instance', () => {
    expect(administracionGeneralModule).toBeTruthy();
  });
});
