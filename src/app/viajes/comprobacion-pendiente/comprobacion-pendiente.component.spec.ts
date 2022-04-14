import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobacionPendienteComponent } from './comprobacion-pendiente.component';

describe('ComprobacionPendienteComponent', () => {
  let component: ComprobacionPendienteComponent;
  let fixture: ComponentFixture<ComprobacionPendienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprobacionPendienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobacionPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
