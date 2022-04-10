import { ViajesModule } from './viajes.module';

describe('ViajesModule', () => {
  let viajesModule: ViajesModule;

  beforeEach(() => {
    viajesModule = new ViajesModule();
  });

  it('should create an instance', () => {
    expect(viajesModule).toBeTruthy();
  });
});
