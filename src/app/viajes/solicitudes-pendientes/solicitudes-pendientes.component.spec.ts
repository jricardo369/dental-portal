import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesPendientesComponent } from './solicitudes-pendientes.component';

describe('SolicitudesPendientesComponent', () => {
  let component: SolicitudesPendientesComponent;
  let fixture: ComponentFixture<SolicitudesPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
