import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteViajesComponent } from './reporte-viajes.component';

describe('ReporteViajesComponent', () => {
  let component: ReporteViajesComponent;
  let fixture: ComponentFixture<ReporteViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteViajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
