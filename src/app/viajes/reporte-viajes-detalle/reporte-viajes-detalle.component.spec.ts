import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteViajesDetalleComponent } from './reporte-viajes-detalle.component';

describe('ReporteViajesDetalleComponent', () => {
  let component: ReporteViajesDetalleComponent;
  let fixture: ComponentFixture<ReporteViajesDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteViajesDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteViajesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
