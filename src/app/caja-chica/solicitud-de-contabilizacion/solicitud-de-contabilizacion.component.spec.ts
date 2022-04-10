import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudDeContabilizacionComponent } from './solicitud-de-contabilizacion.component';

describe('SolicitudDeContabilizacionComponent', () => {
  let component: SolicitudDeContabilizacionComponent;
  let fixture: ComponentFixture<SolicitudDeContabilizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudDeContabilizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudDeContabilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
