import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesDeContabilizacionComponent } from './solicitudes-de-contabilizacion.component';

describe('SolicitudesDeContabilizacionComponent', () => {
  let component: SolicitudesDeContabilizacionComponent;
  let fixture: ComponentFixture<SolicitudesDeContabilizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesDeContabilizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesDeContabilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
