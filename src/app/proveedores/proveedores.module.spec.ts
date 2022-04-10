import { ProveedoresModule } from './proveedores.module';

describe('ProveedoresModule', () => {
  let proveedoresModule: ProveedoresModule;

  beforeEach(() => {
    proveedoresModule = new ProveedoresModule();
  });

  it('should create an instance', () => {
    expect(proveedoresModule).toBeTruthy();
  });
});
